import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { FlytippingReport } from '../flytipping';
import {SwansAppService} from "../swans.app.service";
import {LocationpickerComponent} from "../locationpicker";
import {HttpClient} from "@angular/common/http";
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit {

  acceptedMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
  ];

  photoFileSizeMaxMegabytes = 1048576;

  @ViewChild(LocationpickerComponent)
  private locationPickerComponent: LocationpickerComponent;

  @ViewChild('fileInput') fileInput: ElementRef;
  imageFileDataUri = '';
  imageUploadErrorMsg = '';

  report: FlytippingReport;

  submissionSuccess: boolean = false;

  lat: number = 51.678418;
  lng: number = 7.809007;

  ngOnInit(): void {
    this.report = new FlytippingReport()
  }

  constructor(private service: SwansAppService, private http: HttpClient) {}

  previewFile() {
    const file = this.fileInput.nativeElement.files[0];
    if (file && this.validateFile(file)) {

      const reader = new FileReader();
      reader.readAsDataURL(this.fileInput.nativeElement.files[0]);
      reader.onload = () => {
        this.imageFileDataUri = reader.result;
      }
    } else {
      this.imageFileDataUri = '';
      var megabytes = (this.photoFileSizeMaxMegabytes / 1048576).toFixed(2);
      this.imageUploadErrorMsg = `File must be jpg, png, or gif 
        and cannot exceed ${megabytes} MB in size`;
    }
  }

  validateFile(file) {
    return this.acceptedMimeTypes.includes(file.type) && file.size < this.photoFileSizeMaxMegabytes;
  }

  submitFlytippingReport() {
    // get only the base64 file
    if (this.imageFileDataUri.length > 0) {
      const base64File = this.imageFileDataUri.split(',')[1];
      this.report.imageFilename = UUID.UUID() + '_' + this.fileInput.nativeElement.files[0].name
      const data = {'image': base64File, 'filename': `${this.report.imageFilename}`};
      // TODO: send to server
      console.log(base64File);
      var apiUrl = 'https://zia6r5shye.execute-api.eu-west-2.amazonaws.com/dev/'
      this.http.post(`${apiUrl}/files`, data)
        .subscribe(
          res => {
            // handle success
            // reset file input
            this.fileInput.nativeElement.value = '';
          },
          err => {
            this.imageUploadErrorMsg = 'Could not upload image.';
          }
        );
    }

    var location = this.locationPickerComponent.$picker.locationpicker('location');
    this.report.dateTime = new Date().toLocaleString();
    this.report.latitude = location.latitude;
    this.report.longitude = location.longitude;
    var userEmail = localStorage.getItem("userToken")
    this.report.user = JSON.parse(localStorage.getItem(userEmail))
    this.service.sendFlytippngReport(this.report).subscribe(
      x => this.submissionSuccess = true,
      err => this.submissionSuccess = false
   )
  }

}
