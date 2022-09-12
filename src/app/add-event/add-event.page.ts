import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth/auth.service'; 

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  emp_id: any;
  header: any;
  from_date:any;
  to_date:any;
  from_time:any;
  to_time:any;
  description: string;
  photo: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public mdlCtrl : ModalController) {
      if(this.emp_id==null)
      {
        this.storage.get('emp_id').then((val) => {
          this.emp_id=val;
        });
      }
      this.page_type=this.navParams.get('page_type');
      console.log(this.page_type);
    }

  page_type(page_type: any) {
    throw new Error("Method not implemented.");
  }
  
  async add_new_request()
  {
    if(this.header==null || this.header=='' ||
    this.from_date==null || this.from_date=='' ||
    this.to_date==null || this.to_date=='' ||
    this.from_time==null || this.from_time=='' ||
    this.to_time==null || this.to_time=='' ||
    ((this.photo==null || this.photo=='') && (this.description=='' || this.description==null))
     )
    {
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: 'header, description, from date,to date, from time and to time are required. You can either write description or add photo.',
        buttons: ["OK"]
      });
      (await alert).present();
    }
    else
    {
      this.submit_event();
    }
  }

  async submit_event()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({
      emp_id: this.emp_id,
      header:this.header,
      description:this.description
    });
    this.authService.postData(data, "add_events").then(async (result) => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          const alert = this.alertCtrl.create({
            header: "Query Saved",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
          console.log(data["msg"]);
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            message: data["msg"],
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
        message: err,
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
