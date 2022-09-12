import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { Storage } from '@ionic/storage';
import { LeaveFormPage } from '../leave-form/leave-form';

@Component({
  selector: 'page-my-leaves',
  templateUrl: 'my-leaves.html',
})
export class MyLeavesPage {
  page_for="myleaves";
  emp_id: any;
  leaves=[];
  today=new Date().toISOString().slice(0, 10);

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public authService: AuthserviceProvider,
    public toastCtrl :ToastController,
    public viewCtrl :ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyLeavesPage');
  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter MyLeavesPage');
    
    await this.storage.get('emp_id').then(val=>{
      console.log(val);
      this.emp_id=val;
    });

    this.fetchLeaveDetails();
  }


  fetchLeaveDetails()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.authService.postData(JSON.stringify({emp_id:this.emp_id}),'fetch_leaverequest').then(
      result => {
        let data = JSON.parse(result["_body"]);
        if (data["status"] == "success") {
          console.log(data);
          this.leaves=data['leaves'];
          for(let i=0; i<this.leaves.length;i++)
          {
            this.leaves[i]['show_detail']=false;
          }
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        }
        loader.dismiss();
      },
      err => {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
        loader.dismiss();
      }
    );
  }

  confirmCancel(id)
  {
    let alert = this.alertCtrl.create({
      title: "Confirm Cancel",
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
    alert.present();
  }

  cancelLeaveRequest(id)
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.authService.postData(JSON.stringify({leave_id:id,emp_id:this.emp_id,status:'Cancelled'}),'update_leave_status').then(
      result => {
        loader.dismiss();
        let data = JSON.parse(result["_body"]);
        if (data["status"] == "success") {
          this.toastCtrl.create({
            message: "Your leave application has been cancelled successfully",
            duration: 2000
          }).present();
          this.fetchLeaveDetails();
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        }
      },
      err => {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
        loader.dismiss();
      }
    );
  }

  confirm_cancel_leave(leave_date)
  {
    let alert = this.alertCtrl.create({
      title: "Confirm Cancel",
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
    alert.present();
  }

  cancel_leave(leave_date)
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    console.log(leave_date);
    let data = JSON.stringify({
      leave_date: leave_date,
      emp_id:this.emp_id
    });
    this.authService.postData(data, "cancel_leave_date").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
       /// console.log(responseData);
        console.log(data);
        if (data["status"] == "success") {
          this.toastCtrl.create({
            message: "Your leave cancelled successfully",
            duration: 2000
          }).present();
          this.fetchLeaveDetails();
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        }
        loader.dismiss();
      },
      err => {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
        loader.dismiss();
      }

    );
  }

  openForm()
  {
    this.navCtrl.push(LeaveFormPage);
  }

}
