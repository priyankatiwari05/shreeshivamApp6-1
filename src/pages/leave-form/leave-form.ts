import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-leave-form',
  templateUrl: 'leave-form.html',
})
export class LeaveFormPage {
  from_date:any;
  to_date:any;
  leave_type:any;
  emp_id:any;
  leave_type_master: any;
  myleaves=[];
  designation_id: any;
  today=new Date().toISOString().slice(0, 10);
  maxdate:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public authService: AuthserviceProvider,
    public toastCtrl :ToastController,
    public viewCtrl :ViewController) {
      var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var day = new Date().getDate();
    this.maxdate = new Date(year + 1, month, day).toISOString().slice(0, 10);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveFormPage');
  }

  async ionViewWillEnter() {
    await this.storage.get('emp_id').then(val=>{
      this.emp_id=val;
    });

    await this.storage.get("designation_id").then(designation_id => {
      this.designation_id=designation_id;
    });

    this.getLeaveCount();
  }

  checkAndSubmitLeaveForm()
  {
    if(this.from_date!=null && this.to_date!=null && this.leave_type!=null && this.from_date!='' && this.to_date!='' && this.leave_type!='')
    {
      this.submitLeaveForm();
    }
    else
    {
      this.alertCtrl.create({
        title:'Error',
        subTitle:'All fields are required.',
        buttons: ["OK"]
      }).present();
    }
  }
  
  submitLeaveForm()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({emp_id:this.emp_id,from:this.from_date,to:this.to_date,leave_type:this.leave_type});
    this.authService.postData(data,"submit_leave_form").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.toastCtrl.create({
            message: "Your leave application submitted successfully",
            duration: 2000
          }).present();

          console.log(data);
          this.viewCtrl.dismiss();
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
  
  getLeaveCount()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data=JSON.stringify({emp_id:this.emp_id,designation_id:this.designation_id});
    console.log(data);
    this.authService.postData(data,"fetch_leave_count").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.myleaves=data['myleaves'];
          console.log(data);
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

  callto_getLeaveTypes()
  {
    if(this.from_date!=null && this.from_date!='' && this.to_date!=null && this.to_date!='')
    {
      this.getLeaveTypes();
    }
  }

  getLeaveTypes()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data=JSON.stringify({emp_id:this.emp_id,designation_id:this.designation_id,from:this.from_date,to:this.to_date});
    console.log(data);
    this.authService.postData(data,"fetch_leave_types").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.leave_type_master=data['leave_types'];
          this.leave_type=null;
          console.log(data);
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
