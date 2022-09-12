import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LeaveFormPage } from '../leave-form/leave-form.page';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-my-leaves',
  templateUrl: './my-leaves.page.html',
  styleUrls: ['./my-leaves.page.scss'],
})
export class MyLeavesPage implements OnInit {
  page_for="myleaves";
  emp_id: any;
  leaves=[];
  today=new Date().toISOString().slice(0, 10);

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public toastCtrl :ToastController) {

      this.storage.get('emp_id').then(val=>{
        console.log(val);
        this.emp_id=val;
      });
  
      this.fetchLeaveDetails();
  }

  async fetchLeaveDetails()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    this.authService.postData(JSON.stringify({emp_id:this.emp_id}),'fetch_leaverequest').then(async result => {
        let data = result;
        console.log(data);

        if (data["status"] == "success") {
          console.log(data);
          this.leaves=data['leaves'];
          for(let i=0; i<this.leaves.length;i++)
          {
            this.leaves[i]['show_detail']=false;
          }
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

  async confirmCancel(id)
  {
    let alert = this.alertCtrl.create({
      header: "Confirm Cancel",
      message: "Are you sure to want to cancel this leave request?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
            }
        },
        {
          text: "Yes",
          handler: () => {
            this.cancelLeaveRequest(id);
          }
        }
      ]
    });
    (await alert).present();
  }

  async cancelLeaveRequest(id)
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    this.authService.postData(JSON.stringify({leave_id:id,emp_id:this.emp_id,status:'Cancelled'}),'update_leave_status').then(async result => {
        (await loader).dismiss();
        let data = result;
        console.log(data);

        if (data["status"] == "success") {
          (await this.toastCtrl.create({
            message: "Your leave application has been cancelled successfully",
            duration: 2000
          })).present();
          this.fetchLeaveDetails();
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
          console.log(data["msg"]);
        }
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

  async confirm_cancel_leave(leave_date)
  {
    let alert = this.alertCtrl.create({
      header: "Confirm Cancel",
      message: "Are you sure to want to cancel leave for date "+leave_date,
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
            }
        },
        {
          text: "Yes",
          handler: () => {
            this.cancel_leave(leave_date);
          }
        }
      ]
    });
    (await alert).present();
  }

  async cancel_leave(leave_date)
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    console.log(leave_date);
    let data = JSON.stringify({
      leave_date: leave_date,
      emp_id:this.emp_id
    });
    this.authService.postData(data, "cancel_leave_date").then(async result => {
        let data = result;
        console.log(data);
       
        if (data["status"] == "success") {
          (await this.toastCtrl.create({
            message: "Your leave cancelled successfully",
            duration: 2000
          })).present();
          this.fetchLeaveDetails();
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

  openForm()
  {
    this.navCtrl.navigateForward(['/leave-form']);
  }
  ngOnInit() {
  }

}
