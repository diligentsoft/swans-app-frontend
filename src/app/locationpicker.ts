import {Component, ElementRef, Input, NgModule, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';

declare var $: any;
declare var require: any;

@Component({
  selector: 'l-locationpicker',
  styleUrls: [
    "./locationpicker.css"
  ],
  template: `
    <div #locationpickerEl>
      <div class="locationpicker-loading">Loading map...</div>
    </div>
  `
})
export class LocationpickerComponent implements OnInit {

  @Input() lClass: string = 'l-locationpicker-class';

  @ViewChild('locationpickerEl') locationpickerEl: ElementRef;

  $picker: any;

  constructor(private rd: Renderer2) {
  }

  ngOnInit() {
    require.ensure(['./locationpicker.jquery.js'], require => {
      require('./locationpicker.jquery.js');
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          var settings = {
            radius: 0,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }
          this.$picker = $(this.locationpickerEl.nativeElement).locationpicker(settings);
          this.rd.addClass(this.locationpickerEl.nativeElement, this.lClass)
          // settings.location.latitude = position.coords.latitude;
          // settings.location.longitude = position.coords.longitude;
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
  declarations: [LocationpickerComponent],
  exports: [LocationpickerComponent]
})
export class LocationpickerModule {
}
