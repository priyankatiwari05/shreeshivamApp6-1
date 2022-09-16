import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController,ToastController} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import {  } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-miss-punch-approval',
  templateUrl: './miss-punch-approval.page.html',
  styleUrls: ['./miss-punch-approval.page.scss'],
})
export class MissPunchApprovalPage implements OnInit {
  data_recieved: any;
  raised_data: any;
  newly_raised_ids: any;
  role_id:any;
  emp_id:any;
  branch:any;
  designation_id:any;
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {

      this.storage.get("emp_id").then(emp_id => {
        this.emp_id=emp_id;
      });
      this.storage.get("branch_location_id").then(branch_location_id => {
          this.branch=branch_location_id
      });
      this.storage.get("designation_id").then(designation_id => {
        this.designation_id=designation_id;
      });
      this.storage.get("role_id").then(role_id => {
        this.role_id=role_id;
      });

      this.fetchData();
  }

  doRefresh(refresher) {
    // this.storage.get("role_id").then(role_id => {
    //   this.storage.get("branch_location_id").then(branch_location_id => {
        this.fetchData();
        refresher.complete();

        setTimeout(() => {
          console.log("Async operation has ended");
        }, 2000);
    //   });
    // });
  }

  async fetchData() {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    let data = JSON.stringify({
      role_id: this.role_id,
      branch_id: this.branch,
      emp_id: this.emp_id,
      designation_id: this.designation_id,
    });
    console.log(data);

    this.authService.postData(data, "get_raised_request_data").then(async data => {
        console.log(data);

        if (data["status"] == "success") {
          this.data_recieved = data;
          console.log(this.data_recieved);
          this.raised_data = this.data_recieved["raised_data"];

          for (let i = 0; i < this.raised_data.length; i++) {
            console.log(i);
            this.raised_data[i]["request_details"] = JSON.parse(
              this.raised_data[i]["request_details"]
            );
          }
          this.newly_raised_ids = this.data_recieved["newly_raised_ids"];
          for (let i = 0; i < this.newly_raised_ids.length; i++) {
            this.newly_raised_ids[i]["request_details"] = JSON.parse(
              this.newly_raised_ids[i]["request_details"]
            );
          }
          console.log(this.data_recieved);
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

  async request_confirm(id,status,date) {
    let mystatus='Approve';
    if(status=='reject')
    mystatus='Reject';
    let alert = this.alertCtrl.create({
      header: mystatus,
      // message: "Are you sure to "+status+" request?",
      inputs:[
        {
          name:'remark',
          placeholder:'Write remark here',
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Ok",
          handler: async (data) => {
            if(status=='approve')
            this.change_status(id,'Approved',date,data.remark);
            else
            {
              if(data.remark!='' && data.remark!=null)
              {
                console.log('remark is filled')
                this.change_status(id,'Rejected',date,data.remark);
              }
              else
              {
                console.log('remark is empty');
                const alert = this.alertCtrl.create({
                  header: "Error",
                  subHeader: 'Remark is required in case of rejection',
                  buttons: ["OK"]
                });
                (await alert).present();
              }
              
            }
            
          }
        }
      ]
    });
    (await alert).present();
  }
  async change_status(id, status, date,remark){
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();


    this.storage.get("emp_id").then(val1 => {
      let data = JSON.stringify({
        emp_ids: [val1],
        ids: [id],
        status: status,
        dates: [date],
        remark: remark,
      });
      console.log(data);
      this.authService.postData(data, "update_raised_request").then( async data => {
          console.log(data);

          if (data["status"] == "success") {
            let toast = this.toastCtrl.create({
              message: 'Punch details updated successfully',
              duration: 3000,
              position: 'bottom'
            });
            (await loader).dismiss();
            (await toast).present();
            console.log(data["msg"]);
            // this.storage.get("role_id").then(role_id => {
            //   this.storage.get("branch_location_id").then(branch_location_id => {
                this.fetchData();
            //   });
            // });
          } else {
            const alert = this.alertCtrl.create({
              header: "Error",
              subHeader: data["msg"],
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

    });
  }

  ngOnInit() {
  }

}
