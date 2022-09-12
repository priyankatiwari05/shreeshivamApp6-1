import { Component, OnInit } from '@angular/core';
import { NavController,AlertController,LoadingController,ToastController} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'
import { RaiseAttendencePage } from '../raise-attendence/raise-attendence.page'; 
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.page.html',
  styleUrls: ['./attendence.page.scss'],
})
export class AttendencePage implements OnInit {
  attendence_report: any;
  emp_id: any;
  approver_list: string;
  today=new Date().toISOString().slice(0,10);
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    ) {
      console.log(this.today);
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
    this.navCtrl.navigateRoot([RaiseAttendencePage,data]);
  }

   async fetchAttendenceDetails(emp_id){
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    console.log(emp_id);
    let data = JSON.stringify({
      emp_id: emp_id
    });
    this.authService.postData(data, "attendence_details").then(async result => {
        let data = result;
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
          this.fetchAttendenceDetails(this.emp_id);
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
