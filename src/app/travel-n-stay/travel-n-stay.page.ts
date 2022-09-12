import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
// import { ExpressBookingPage } from '../express-booking/express-booking';
import { TravelRequestPage } from '../travel-request/travel-request.page';
// import { HotelPlanningPage } from '../hotel-planning/hotel-planning';
import { AdvancedRequestPage } from '../advanced-request/advanced-request.page';
import { GuestHousePage } from '../guest-house/guest-house.page';
import { VehicleRequestPage } from '../vehicle-request/vehicle-request.page';
import { TravelRequestShowPage } from '../travel-request-show/travel-request-show.page';

@Component({
  selector: 'app-travel-n-stay',
  templateUrl: './travel-n-stay.page.html',
  styleUrls: ['./travel-n-stay.page.scss'],
})
export class TravelNStayPage implements OnInit {
  
constructor(public navCtrl: NavController) {
}

open_root(page) {
  console.log(page);
  // if(page==InfoPage)
  // this.navCtrl.push(page);
  // else
  this.navCtrl.navigateForward(page);
}

  ngOnInit() {
  }

}