import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController, AlertController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { LDPage } from "../l-d/l-d";
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { ThrowStmt } from "@angular/compiler";
import { HomePage } from "../home/home";
import { AppraisalPage } from "../appraisal/appraisal";
import { AppreciationPage } from "../appreciation/appreciation";
import { AskHrPage } from "../ask-hr/ask-hr";
import { AttendencePage } from "../attendence/attendence";
import { BirthdayPage } from "../birthday/birthday";
import { AniversaryPage } from "../aniversary/aniversary";
import { LearningPage } from "../learning/learning";
import { CheckListPage } from "../check-list/check-list";
import { EmpPerformancePage } from "../emp-performance/emp-performance";
import { EventsPage } from "../events/events";
import { ClaimRequestsPage } from "../claim-requests/claim-requests";
import { GalleryPage } from "../gallery/gallery";
import { WarningPage } from "../warning/warning";
import { RaisedRequestPage } from "../raised-request/raised-request";
import { MyCalendarPage } from "../my-calendar/my-calendar";
import { MyLeavesPage } from "../my-leaves/my-leaves";
import { PollsPage } from "../polls/polls";
import { SalaryIncentivePage } from "../salary-incentive/salary-incentive";
import { TaskPage } from "../task/task";
import { TravelDeskPage } from "../travel-desk/travel-desk";
import { TravelApprovalPage } from "../travel-approval/travel-approval";

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-notification",
  templateUrl: "notification.html"
})
export class NotificationPage {
  notifications: any;
  emp_id: any;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams
  ) {}

  async ionViewDidLoad() {
    console.log("ionViewDidLoad NotificationPage");

    // if (this.notifications=="[]"){
      this.storage.get("notifications").then(notifications => {
      this.notifications = notifications;
      });
      await this.storage.get('emp_id').then((emp_id) => {
        this.emp_id=emp_id;
        console.log('emp_id'+this.emp_id);
      });


    // }


  }
  ionViewWillEnter(){
      // if (this.notifications=="[]"){
        this.storage.get('emp_id').then((val1) => {
          this.emp_id=val1;
          this.fetchNotificationDetails(val1);
        });
      //  }

  }

  ionViewWillLeave()
  {
    this.authService.postData(JSON.stringify({emp_id:this.emp_id}), "clear_notifications").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
       /// console.log(responseData);
        console.log(data);
        if (data["status"] == "success") {

          console.log(data['msg']);

        } else {           
          console.log(data["msg"]);
        }
      },
      err => {         
        console.log(err);
      }

    );
  }

  open_root(page) {
    if(page=='AppraisalPage')
      this.navCtrl.push(AppraisalPage);
    if(page=='AppreciationPage')
      this.navCtrl.push(AppreciationPage);
    if(page=='AskHrPage')
      this.navCtrl.push(AskHrPage);
    if(page=='AttendencePage')
      this.navCtrl.push(AttendencePage);
    if(page=='BirthdayPage')
      this.navCtrl.push(BirthdayPage);
    if(page=='AniversaryPage')
      this.navCtrl.push(AniversaryPage);
    if(page=='LearningPage')
      this.navCtrl.push(LearningPage);
    if(page=='LDPage')
      this.navCtrl.push(LDPage);
    if(page=='CheckListPage')
      this.navCtrl.push(CheckListPage);
    if(page=='EmpPerformancePage')
      this.navCtrl.push(EmpPerformancePage);
    if(page=='EventsPage')
      this.navCtrl.push(EventsPage);
    if(page=='ClaimRequestsPage')
      this.navCtrl.push(ClaimRequestsPage);
    if(page=='GalleryPage')
      this.navCtrl.push(GalleryPage);
    if(page=='HomePage')
      this.navCtrl.setRoot(HomePage);
    if(page=='WarningPage')
      this.navCtrl.push(WarningPage);
    if(page=='AppreciationPage')
      this.navCtrl.push(AppreciationPage);
    if(page=='RaisedRequestPage')
      this.navCtrl.push(RaisedRequestPage);
    if(page=='MyCalendarPage')
      this.navCtrl.push(MyCalendarPage);
    if(page=='MyLeavesPage')
      this.navCtrl.push(MyLeavesPage);
    if(page=='PollsPage')
      this.navCtrl.push(PollsPage);
    if(page=='SalaryIncentivePage')
      this.navCtrl.push(SalaryIncentivePage);
    if(page=='TaskPage')
      this.navCtrl.push(TaskPage);
    if(page=='TravelDeskPage')
      this.navCtrl.push(TravelDeskPage);
    if(page=='TravelApprovalPage')
      this.navCtrl.push(TravelApprovalPage);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

      this.storage.get('emp_id').then((val1) => {
        this.fetchNotificationDetails(val1);
          refresher.complete();


        setTimeout(() => {
          console.log('Async operation has ended');

        }, 2000);
      });



  }
  fetchNotificationDetails(emp_id){
    console.log('inside fetchNotificationDetails');
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    console.log(emp_id);
    let data = JSON.stringify({
      emp_id: emp_id
    });
    this.authService.postData(data, "get_mobile_notifications").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
       /// console.log(responseData);
        console.log(data);
        if (data["status"] == "success") {

          this.notifications=data["msg"];
          console.log("data['msg']");
          console.log(data['msg']);
          this.storage.set('notifications',data["msg"]);
          // this.clear_notification();
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: "Something went wrong, please try again later",
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
          subTitle: "Something went wrong, please try again later",
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
        loader.dismissAll();
      }

    );
  }

  // clear_notification()
  // {
    
  // }


}
