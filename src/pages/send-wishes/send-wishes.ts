import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthserviceProvider } from '../../providers/authservice/authservice';

@Component({
  selector: 'page-send-wishes',
  templateUrl: 'send-wishes.html',
})
export class SendWishesPage {
  emp_id:any;
  designation:any;
  emp_name:any;
  wish_type:any;
  from_emp:any;
  to_emp:any;
  wish:any;
  page_type:any;
  mywishes:any;
  sentwishes:any;
  allwishes:any;
  home:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public viewCtrl:ViewController, 
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendWishesPage');
    
  }

  async ionViewWillEnter() {
    await this.storage.get('emp_id').then((val)=>{
      this.from_emp=val;
      this.emp_id=val;
    })
    await this.storage.get('designation').then((designation)=>{
      this.designation=designation;
      console.log(this.designation);
    })

    console.log('ionViewWillEnter SendWishesPage');
    this.wish_type=this.navParams.get('wish_type');
    this.page_type=this.navParams.get('page_type');
    
    if(this.page_type=='send_wish')
    {
      if(this.navParams.get('fname')!=null)
      this.emp_name=this.navParams.get('fname');
      if(this.navParams.get('mname')!=null)
      this.emp_name+=" "+this.navParams.get('mname');
      if(this.navParams.get('lname')!=null)
      this.emp_name+=" "+this.navParams.get('lname');

      this.to_emp=this.navParams.get('emp_id');
    }
    else
    {
      await this.fetchWishes();
      this.home='mywishes';
    }
    
  }

  submit_wish()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({
      from_emp: this.from_emp,
      to_emp: this.to_emp,
      wish:this.wish,
      wish_type:this.wish_type,
      to_name:this.emp_name,
    });
    this.authService.postData(data, "send_wish").then(
      result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          const toast = this.toastCtrl.create({
            message: "Greetings have been sent.",
            duration: 2000
          });
          toast.present();
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
        loader.dismiss();
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
        loader.dismiss();
      }
    );
  }

  fetchWishes()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({
      emp_id: this.emp_id,
      designation: this.designation
    });
    this.authService.postData(data, "fetch_wishes").then(
      result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        console.log(data);
        if (data["status"] == "success") {
          this.mywishes=data['mywishes'];
          this.sentwishes=data['sentwishes'];
          this.allwishes=data['allwishes'];
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

}
