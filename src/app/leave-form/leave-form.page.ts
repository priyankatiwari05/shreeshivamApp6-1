import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.page.html',
  styleUrls: ['./leave-form.page.scss'],
})
export class LeaveFormPage implements OnInit {
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
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public toastCtrl :ToastController) {
      var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var day = new Date().getDate();
    this.maxdate = new Date(year + 1, month, day).toISOString().slice(0, 10);
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

  async checkAndSubmitLeaveForm()
  {
    if(this.from_date!=null && this.to_date!=null && this.leave_type!=null && this.from_date!='' && this.to_date!='' && this.leave_type!='')
    {
      this.submitLeaveForm();
    }
    else
    {
      (await this.alertCtrl.create({
        header: 'Error',
        subHeader: 'All fields are required.',
        buttons: ["OK"]
      })).present();
    }
  }
  
  async submitLeaveForm()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({emp_id:this.emp_id,from:this.from_date,to:this.to_date,leave_type:this.leave_type});
    this.authService.postData(data,"submit_leave_form").then(async result => {
        let data = result;
        console.log(data);

        if (data["status"] == "success") {
          (await this.toastCtrl.create({
            message: "Your leave application submitted successfully",
            duration: 2000
          })).present();

          console.log(data);
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
  
  async getLeaveCount()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data=JSON.stringify({emp_id:this.emp_id,designation_id:this.designation_id});
    console.log(data);
    this.authService.postData(data,"fetch_leave_count").then(async result => {
        let data = result;
        console.log(data);

        if (data["status"] == "success") {
          this.myleaves=data['myleaves'];
          console.log(data);
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

  callto_getLeaveTypes()
  {
    if(this.from_date!=null && this.from_date!='' && this.to_date!=null && this.to_date!='')
    {
      this.getLeaveTypes();
    }
  }

  async getLeaveTypes()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data=JSON.stringify({emp_id:this.emp_id,designation_id:this.designation_id,from:this.from_date,to:this.to_date});
    console.log(data);
    this.authService.postData(data,"fetch_leave_types").then( async result => {
        let data = result;
        console.log(data);
        
        if (data["status"] == "success") {
          this.leave_type_master=data['leave_types'];
          this.leave_type=null;
          console.log(data);
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
