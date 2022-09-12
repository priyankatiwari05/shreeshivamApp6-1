import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController} from 'ionic-angular';
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { Storage } from '@ionic/storage';
import { AppraisalDetailsPage } from '../appraisal-details/appraisal-details';

@Component({
  selector: 'page-appraisal',
  templateUrl: 'appraisal.html',
})
export class AppraisalPage {
  emp_id:any;
  appraisals=[];
  month_arr=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController)
  {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppraisalPage');
  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter AppraisalPage');
    await this.storage.get('emp_id').then(val=>{
      this.emp_id=val;
    });

    this.fetchAppraisals();
  }

  fetchAppraisals()
  {
    let data = JSON.stringify({
      emp_id: this.emp_id
    });

    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.authService.postData(data, "fetch_appraisals").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
      
        if (data["status"] == "success") {
          this.appraisals=data["appraisals"];
          console.log(this.appraisals); 
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
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

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.fetchAppraisals();
    refresher.complete();
  }

  showdetail(index)
  {
    let appr = this.appraisals[index];

    this.navCtrl.push(AppraisalDetailsPage,{appraisal:appr});
    
  }

}
