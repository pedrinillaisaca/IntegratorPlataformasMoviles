import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-localizaciones',
  templateUrl: './localizaciones.page.html',
  styleUrls: ['./localizaciones.page.scss'],
})
export class LocalizacionesPage implements OnInit {
  title = 'My first AGM project';
  lat = -2.9076828270256057;
  lng = -79.002031484;

  current={
    latitude:'',
    longitude:'',
    address:''
  }

  newLocation={
    latitude:'',
    longitude:'',
    address:''
  }
  constructor(
    private locationService:LocationService    
  ) { }

  async ngOnInit() {

    this.current = await this.locationService.getCurrentLocation();

  }


  setNewLocation(event){
    if(event){
      this.newLocation.latitude = event.lat;
      this.newLocation.longitude = event.lng;
      this.locationService.getAddressOfLocation(this.newLocation);
    }
  }


}
