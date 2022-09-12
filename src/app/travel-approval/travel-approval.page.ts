import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-travel-approval',
  templateUrl: './travel-approval.page.html',
  styleUrls: ['./travel-approval.page.scss'],
})
export class TravelApprovalPage implements OnInit {
  responseData:any;
  role:any;
  travel_approval:any;
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
      
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
  async fetchTravelRequest(emp_id, email, role, branch_location_id) {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    let data = JSON.stringify({
      emp_id: emp_id,
      useremail: email,
      role: role,
      branch_location_id: branch_location_id
    });
    console.log(data);
    this.authService.postData(data, "travel_request").then(async result => {
        let data = result;
        console.log(data);
        
        if (data["status"] == "success") {
          this.travel_approval = data["approve_request"];
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
  async approve_request_confirm(id){
    let alert = this.alertCtrl.create({
     header: "Confirm",
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
    (await alert).present();
  }
  async reject_request_confirm(id){
    let alert = this.alertCtrl.create({
     header: "Confirm",
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
    (await alert).present();
  }

  async reject_request(id){

    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    let data = JSON.stringify({
      id: id,
      status:"rejected"
    });

    this.authService.postData(data, "update_travel_request").then(
      async result => {
        let data = result;
        console.log(data);

        if (data["status"] == "success") {
          let toast = this.toastCtrl.create({
            message: 'Travel details rejected successfully',
            duration: 3000,
            position: 'bottom'
          });
          (await toast).present();
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
  async approve_request(id){

    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    let data = JSON.stringify({
      id: id,
      status:"approved"
    });

    this.authService.postData(data, "update_travel_request").then(
      async result => {
        let data = result;
        console.log(data);

        if (data["status"] == "success") {
          (await loader).dismiss();
          let toast = this.toastCtrl.create({
            message: 'Travel details approved successfully',
            duration: 3000,
            position: 'bottom'
          });
          (await toast).present();
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

  ngOnInit() {
  }

}