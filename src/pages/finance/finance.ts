import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BlankPage } from '../blank/blank';
import { TravelEntitlementPage } from '../travel-entitlement/travel-entitlement';
import { ClaimRequestsPage } from '../claim-requests/claim-requests';
import { BusinessPage } from '../business/business';

@Component({
  selector: 'page-finance',
  templateUrl: 'finance.html',
})
export class FinancePage {
  blank=BlankPage;
  myclaims=ClaimRequestsPage;
  travel_entitlement=TravelEntitlementPage;
  business=BusinessPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinancePage');
  }

  open_root(page) {
    console.log('inside open_root function');
    console.log(page);
      this.navCtrl.push(page,{page_type:'emp'});
  }

}
