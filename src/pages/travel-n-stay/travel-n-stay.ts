import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { ExpressBookingPage } from '../express-booking/express-booking';
import { TravelRequestPage } from '../travel-request/travel-request';
// import { HotelPlanningPage } from '../hotel-planning/hotel-planning';
import { AdvancedRequestPage } from '../advanced-request/advanced-request';
import { GuestHousePage } from '../guest-house/guest-house';
import { VehicleRequestPage } from '../vehicle-request/vehicle-request';
import { TravelRequestShowPage } from '../travel-request-show/travel-request-show';

/**
 * Generated class for the TravelNStayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-travel-n-stay',
  templateUrl: 'travel-n-stay.html',
})
export class TravelNStayPage {
  // express_booking=ExpressBookingPage;
  travel_request=TravelRequestPage;
  // hotel_planning=HotelPlanningPage;
  advanced_request=AdvancedRequestPage;
  guest_house=GuestHousePage;
  vehicle_request=VehicleRequestPage;
  show_travel_request=TravelRequestShowPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelNStayPage');
  }
  open_root(page) {
    console.log(page);
    // if(page==InfoPage)
    // this.navCtrl.push(page);
    // else
    this.navCtrl.push(page);
  }

}
