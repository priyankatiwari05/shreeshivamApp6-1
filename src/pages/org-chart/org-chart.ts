import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { GlobalVarsProvider } from "../../providers/global-vars/global-vars";

let base_path = GlobalVarsProvider.base_path;
/**
 * Generated class for the OrgChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-org-chart',
  templateUrl: 'org-chart.html',
})
export class OrgChartPage {

  constructor(public navCtrl: NavController,
    private photoViewer: PhotoViewer,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrgChartPage');
  }

  open_img(){
    this.photoViewer.show(base_path+'org_chart.jpg', 'Organizational Chart', {share: false});
  }

}
