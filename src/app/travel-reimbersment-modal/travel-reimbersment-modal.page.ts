import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth/auth.service';
import { TravelDocModalPage } from '../travel-doc-modal/travel-doc-modal.page';

@Component({
  selector: 'app-travel-reimbersment-modal',
  templateUrl: './travel-reimbersment-modal.page.html',
  styleUrls: ['./travel-reimbersment-modal.page.scss'],
})
export class TravelReimbersmentModalPage implements OnInit {
  order_id:any;
  travel_docs: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController
  ) {
    this.order_id=navParams.get('order_id');
    this.fetch_docs(this.order_id);
  }
  upload_doc_modal(){
    let data={
      order_id:this.order_id
    };
    this.navCtrl.navigateForward([TravelDocModalPage,data]);
  }
  
  doRefresh(refresher) {

    this.fetch_docs(this.order_id);
    refresher.complete();


    setTimeout(() => {
      console.log('Async operation has ended');

    }, 2000);
  }
  async delete(id,doc_link){
    let data=JSON.stringify({
      id: id,
      doc_link: doc_link,
      tr_id: this.order_id
    });
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    this.authService.postData(data, "delete_reimbursement_doc").then(
      async data => {
        console.log(data);
        if (data["status"] == "success") {
          const alert = this.alertCtrl.create({
            header: "Success",
            subHeader: "Document Deleted successfully",
            buttons: ["OK"]
          });
          (await loader).dismiss();
          (await alert).present();
          console.log(data["msg"]);
          this.fetch_docs(this.order_id);
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: "Process failed, please try after sometime.",
            buttons: ["OK"]
          });
          (await loader).dismiss();
          (await alert).present();
          console.log(data["msg"]);
        }
      },
      async err => {
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: "Process failed, please try after sometime.",
          buttons: ["OK"]
        });
        (await loader).dismiss();
        (await alert).present();
        console.log(err);
      }
    );

  }
  async fetch_docs(order_id){
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    let data = JSON.stringify({
      tr_id: order_id,

    });
    console.log(data);

    this.authService.postData(data, "upload_reimbursement_docs").then(
      async data => {
        console.log(data);
        if (data["status"] == "success") {
          this.travel_docs = data["msg"];
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
          console.log(data["msg"]);
        }
        (await loader).dismiss();
      },
      async err => {
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: err,
          buttons: ["OK"]
        });
        (await alert).present();
        console.log(err);
        (await loader).dismiss();
      }
    );
  }

  ngOnInit() {
  }

}