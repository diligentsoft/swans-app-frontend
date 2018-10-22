import {Component, ElementRef, Input, NgModule, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';

declare var $: any;
declare var require: any;

@Component({
  selector: 'app-location-picker',
  styleUrls: [
    './location-picker.css'
  ],
  template: `
    <div #locationPicker>
      <div class="location-picker-loading">Loading map...</div>
    </div>
  `
})
export class LocationPickerComponent implements OnInit {

  @Input() locationPickerCssClass = 'location-picker';

  @ViewChild('locationPicker') locationPicker: ElementRef;

  $picker: any;

  constructor(private rd: Renderer2) {
  }

  ngOnInit() {
    require.ensure(['./location-picker.jquery.js'], require => {
      require('./location-picker.jquery.js');
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const settings = {
            radius: 0,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          };
          this.$picker = $(this.locationPicker.nativeElement).locationpicker(settings);
          this.rd.addClass(this.locationPicker.nativeElement, this.locationPickerCssClass);
        });
       }
    });
  }

  getLocation() {
    return this.$picker.locationpicker('location');
  }

  setPosition(position: { radius?: number, latitude: number, longitude: number }) {
    this.$picker.locationpicker('location', position);
  }

  subscribeEvent(event: string, callback: () => void) {
    this.$picker.locationpicker('subscribe', {event, callback})
  }

  getMap() {
    return this.$picker.locationpicker('map');
  }

  autosize() {
    this.$picker.locationpicker('autosize');
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [LocationPickerComponent],
  exports: [LocationPickerComponent]
})
export class LocationPickerModule {
}
