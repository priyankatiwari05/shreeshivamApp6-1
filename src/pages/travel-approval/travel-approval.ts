import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TravelApprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-travel-approval',
  templateUrl: 'travel-approval.html',
})
export class TravelApprovalPage {
  responseData:any;
  role:any;
  travel_approval:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController

  ) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelApprovalPage');
    this.storage.get("emp_id").then(emp_id => {
      this.storage.get("email").then(email => {
        this.storage.get("role").then(role => {
          this.role=role;
          this.storage.get("branch_location_id").then(branch_location_id => {
            this.fetchTravelRequest(emp_id, email, role, branch_location_id);
          });
        });
      });
    });
  }
  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.storage.get("emp_id").then(emp_id => {
      this.storage.get("email").then(email => {
        this.storage.get("role").then(role => {
          this.storage.get("branch_location_id").then(branch_location_id => {
            this.fetchTravelRequest(emp_id, email, role, branch_location_id);
            refresher.complete();

            setTimeout(() => {
              console.log("Async operation has ended");
            }, 2000);
          });
        });
      });
    });
  }
  fetchTravelRequest(emp_id, email, role, branch_location_id) {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let data = JSON.stringify({
      emp_id: emp_id,
      useremail: email,
      role: role,
      branch_location_id: branch_location_id
    });
    console.log(data);
    this.authService.postData(data, "travel_request").then(
      result => {
        let responseData = result;
        let data = JSON.parse(responseData["_body"]);
        /// console.log(responseData);
        console.log(data);
        if (data["status"] == "success") {
          this.travel_approval = data["approve_request"];
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
  approve_request_confirm(id){
    let alert = this.alertCtrl.create({
      title: "Confirm",
      message: "Are you sure to approve?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Approve",
          handler: () => {

            this.approve_request(id);
          }
        }
      ]
    });
    alert.present();
  }
  reject_request_confirm(id){
    let alert = this.alertCtrl.create({
      title: "Confirm",
      message: "Are you sure to reject?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Reject",
          handler: () => {
            this.reject_request(id);
          }
        }
      ]
    });
    alert.present();
  }

  reject_request(id){

    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let data = JSON.stringify({
      id: id,
      status:"rejected"
    });

    this.authService.postData(data, "update_travel_request").then(
      result => {
        this.responseData = result;
        console.log(this.responseData);
        let data = JSON.parse(this.responseData["_body"]);

        console.log(data);
        if (data["status"] == "success") {
          let toast = this.toastCtrl.create({
            message: 'Travel details rejected successfully',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          console.log(data["msg"]);

          this.storage.get("emp_id").then(emp_id => {
            this.storage.get("email").then(email => {
              this.storage.get("role").then(role => {
                this.role=role;
                this.storage.get("branch_location_id").then(branch_location_id => {
                  this.fetchTravelRequest(emp_id, email, role, branch_location_id);
                });
              });
            });
          });
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
  approve_request(id){

    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let data = JSON.stringify({
      id: id,
      status:"approved"
    });

    this.authService.postData(data, "update_travel_request").then(
      result => {
        this.responseData = result;
        console.log(this.responseData);
        let data = JSON.parse(this.responseData["_body"]);

        console.log(data);
        if (data["status"] == "success") {
          loader.dismissAll();
          let toast = this.toastCtrl.create({
            message: 'Travel details approved successfully',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          console.log(data["msg"]);

          this.storage.get("emp_id").then(emp_id => {
            this.storage.get("email").then(email => {
              this.storage.get("role").then(role => {
                this.role=role;
                this.storage.get("branch_location_id").then(branch_location_id => {
                  this.fetchTravelRequest(emp_id, email, role, branch_location_id);
                });
              });
            });
          });
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
}
