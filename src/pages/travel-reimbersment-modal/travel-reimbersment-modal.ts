import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { Storage } from '@ionic/storage';
import { TravelDocModalPage } from '../travel-doc-modal/travel-doc-modal';

/**
 * Generated class for the TravelReimbersmentModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-travel-reimbersment-modal',
  templateUrl: 'travel-reimbersment-modal.html',
})
export class TravelReimbersmentModalPage {
  order_id:any;
  travel_docs: any;
  responseData:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController
  ) {
    this.order_id=navParams.get('order_id');
  }
  upload_doc_modal(){
    let data={
      order_id:this.order_id
    };
    this.navCtrl.push(TravelDocModalPage,data);
  }
  ionViewDidLoad() {

      this.fetch_docs(this.order_id);

  }

  doRefresh(refresher) {

    this.fetch_docs(this.order_id);
    refresher.complete();


    setTimeout(() => {
      console.log('Async operation has ended');

    }, 2000);
  }
  delete(id,doc_link){
    let data=JSON.stringify({
      id: id,
      doc_link: doc_link,
      tr_id: this.order_id
    });
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.authService.postData(data, "delete_reimbursement_doc").then(
      result => {
        this.responseData = result;
        console.log(this.responseData);
        let data = JSON.parse(this.responseData["_body"]);


        console.log(data);
        if (data["status"] == "success") {
          const alert = this.alertCtrl.create({
            title: "Success",
            subTitle: "Document Deleted successfully",
            buttons: ["OK"]
          });
          loader.dismissAll();
          alert.present();
          console.log(data["msg"]);
          this.fetch_docs(this.order_id);
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: "Process failed, please try after sometime.",
            buttons: ["OK"]
          });
          loader.dismissAll();
          alert.present();
          console.log(data["msg"]);
        }
      },
      err => {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: "Process failed, please try after sometime.",
          buttons: ["OK"]
        });
        loader.dismissAll();
        alert.present();
        console.log(err);
      }
    );

  }
  fetch_docs(order_id){
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let data = JSON.stringify({
      tr_id: order_id,

    });
    console.log(data);

    this.authService.postData(data, "upload_reimbursement_docs").then(
      result => {
        let responseData = result;
        let data = JSON.parse(responseData["_body"]);
        /// console.log(responseData);
        console.log(data);
        if (data["status"] == "success") {
          this.travel_docs = data["msg"];
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        }
        loader.dismissAll();
      },
      err => {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
        loader.dismissAll();
      }
    );
  }

}
