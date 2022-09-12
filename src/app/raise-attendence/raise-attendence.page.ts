
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-raise-attendence',
  templateUrl: './raise-attendence.page.html',
  styleUrls: ['./raise-attendence.page.scss'],
})
export class RaiseAttendencePage implements OnInit {
  responseData: any;
  in_time: any;
  out_time: any;
  date: any;
  shift_id: any;
  shift_in_time: any;
  shift_out_time: any;
  next_day: any = false;
  approver_list:string;
  remarks:any="";
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public storage: Storage
  ) {
    this.in_time = navParams.get("in_time");
    this.out_time = navParams.get("out_time");
    this.date = navParams.get("date");
    this.shift_id = navParams.get("shift");
    this.approver_list = navParams.get("approver_list");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RaiseAttendencePage");
    this.fetchShiftDetails();
    console.log(this.next_day);
  }

  async raise_attendence_confirm() {
    if (this.in_time == "00:00:00" || this.out_time == "00:00:00") {
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: "Please enter IN TIME and OUT TIME both",
        buttons: ["OK"]
      });
      (await alert).present();
    }else if(this.remarks==""){
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: "Please enter remark",
        buttons: ["OK"]
      });
      (await alert).present();
    }
    else if (this.next_day == false) {
      if (this.in_time >= this.out_time) {
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: "Please enter IN TIME less than OUT TIME",
          buttons: ["OK"]
        });
        (await alert).present();
      } else {
        let alert = this.alertCtrl.create({
          header: "Confirm",
          message: "Are you sure to raise request?",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              }
            },
            {
              text: "Ok",
              handler: () => {
                this.raise_attendence();
              }
            }
          ]
        });
        (await alert).present();
      }
    } else {
      let alert = this.alertCtrl.create({
        header: "Confirm",
        message: "Are you sure to raise request?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          },
          {
            text: "Ok",
            handler: () => {
              this.raise_attendence();
            }
          }
        ]
      });
      (await alert).present();
    }
  }

  async raise_attendence() {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let out_date;
    if(this.next_day==true){
      out_date="yes";
    }else{
      out_date="no";
    }

    this.storage.get("emp_id").then(val1 => {
      let data = JSON.stringify({
        emp_id: val1,
        in_time: this.in_time,
        out_time: this.out_time,
        date: this.date,
        out_date: out_date,
        remark:this.remarks,
        shift_id:this.shift_id
      });
      console.log(data);
      this.authService.postData(data, "raise_attendence").then(
        async result => {
          this.responseData = result;
          console.log(this.responseData);
          let data = JSON.parse(this.responseData["_body"]);
          console.log(data);
          if (data["status"] == "success") {
            const alert = this.alertCtrl.create({
              header: "Success",
              subHeader: "Attendence request raised successfully",
              buttons: ["OK"]
            });
            (await loader).dismiss();
            (await alert).present();
            console.log(data["msg"]);
            this.navCtrl.pop();
          } else {
            const alert = this.alertCtrl.create({
              header: "Error",
              subHeader: data['msg'],
              buttons: ["OK"]
            });
            (await loader).dismiss();
            (await alert).present();
            console.log(data["msg"]);
          }
        },
        async err => {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: "Process failed, please try after sometime.",
            buttons: ["OK"]
          });
          (await loader).dismiss();
          (await alert).present();
          console.log(err);
        }
      );
    });
  }

  async fetchShiftDetails() {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({
      shift_id: this.shift_id
    });
    this.authService.postData(data, "get_shift_details").then(
      async result => {
        this.responseData = result;
        console.log(this.responseData);
        let data = JSON.parse(this.responseData["_body"]);

        console.log(data);
        if (data["status"] == "success") {
          // let my_data=JSON.parse(data["msg"]);
          this.shift_in_time = data["msg"]["time_in"];
          this.shift_out_time = data["msg"]["time_out"];

          (await loader).dismiss();

          console.log();
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          (await loader).dismiss();
          (await alert).present();
          console.log(data["msg"]);
        }
      },
      async err => {
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: "Process failed, please try after sometime.",
          buttons: ["OK"]
        });
        (await loader).dismiss();
        (await alert).present();
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

}