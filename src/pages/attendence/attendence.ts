import { Component } from '@angular/core';
import { NavController, NavParams,
  AlertController,
  LoadingController,
  ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RaiseAttendencePage } from '../raise-attendence/raise-attendence';
import { AuthserviceProvider } from "../../providers/authservice/authservice";

/**
 * Generated class for the AttendencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-attendence',
  templateUrl: 'attendence.html',
})
export class AttendencePage {
  attendence_report: any;
  emp_id: any;
  approver_list: string;
  today=new Date().toISOString().slice(0,10);
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    ) {
      console.log(this.today)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendencePage');


  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter AttendencePage');
    this.storage.get('emp_id').then((val1) => {
      this.emp_id=val1;
      this.fetchAttendenceDetails(this.emp_id);
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

      // this.storage.get('emp_id').then((val1) => {
        this.fetchAttendenceDetails(this.emp_id);
          refresher.complete();


        setTimeout(() => {
          console.log('Async operation has ended');

        }, 2000);
      // });
  }

  raise_attendence(in_time,out_time,date,shift){
    let data={
      in_time:in_time,
      out_time:out_time,
      date:date,
      shift:shift,
      approver_list:this.approver_list
    };
    this.navCtrl.push(RaiseAttendencePage,data);
  }

   fetchAttendenceDetails(emp_id){
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    console.log(emp_id);
    let data = JSON.stringify({
      emp_id: emp_id
    });
    this.authService.postData(data, "attendence_details").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
       /// console.log(responseData);
        console.log(data);
        if (data["status"] == "success") {

          this.attendence_report=JSON.parse(data["msg"]);
          this.approver_list=data['approver_list'];
          console.log(this.attendence_report);
          //this.storage.set('attendance_report',JSON.parse(data["msg"]));
          // for(let i=0;i<this.attendence_report.length;i++){
          //   let working_hour=this.attendence_report[i]['total_working_hour'][0];
          //   working_hour+=this.attendence_report[i]['total_working_hour'][1];
          //   this.attendence_report[i]['total_working_hour']=working_hour*1;

          //   console.log(typeof this.attendence_report[i]['total_working_hour']);
          //   console.log(this.attendence_report[i]['total_working_hour']);
          // }



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
          this.fetchAttendenceDetails(this.emp_id);
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
