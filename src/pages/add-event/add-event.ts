import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthserviceProvider } from '../../providers/authservice/authservice';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  emp_id: any;
  title: any;
  from_date:any;
  to_date:any;
  from_time:any;
  to_time:any;
  description: string;
  photo: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public viewCtrl:ViewController, 
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  ionViewWillEnter()
  {
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
  
  add_new_request()
  {
    if(this.title==null || this.title=='' ||
    this.from_date==null || this.from_date=='' ||
    this.to_date==null || this.to_date=='' ||
    this.from_time==null || this.from_time=='' ||
    this.to_time==null || this.to_time=='' ||
    ((this.photo==null || this.photo=='') && (this.description=='' || this.description==null))
     )
    {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Title, description, from date,to date, from time and to time are required. You can either write description or add photo.',
        buttons: ["OK"]
      });
      alert.present();
    }
    else
    {
      this.submit_event();
    }
  }

  submit_event()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({
      emp_id: this.emp_id,
      title:this.title,
      description:this.description
    });
    this.authService.postData(data, "add_events").then(
      result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          const alert = this.alertCtrl.create({
            title: "Query Saved",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
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
        this.viewCtrl.dismiss();
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
