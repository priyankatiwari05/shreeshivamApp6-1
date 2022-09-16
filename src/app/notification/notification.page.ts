import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications: any;
  emp_id: any;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
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
    this.authService.postData(JSON.stringify({emp_id:this.emp_id}), "clear_notifications").then(data => {
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
      this.navCtrl.navigateForward(['/appraisal']);
    if(page=='AppreciationPage')
      this.navCtrl.navigateForward(['/appreciation']);
    if(page=='AskHrPage')
      this.navCtrl.navigateForward(['/ask-hr']);
    if(page=='AttendencePage')
      this.navCtrl.navigateForward(['/attendence']);
    if(page=='BirthdayPage')
      this.navCtrl.navigateForward(['/birthday']);
    if(page=='AniversaryPage')
      this.navCtrl.navigateForward(['/aniversary']);
    if(page=='LearningPage')
      this.navCtrl.navigateForward(['/learning']);
    if(page=='LDPage')
      this.navCtrl.navigateForward(['/l-d']);
    if(page=='CheckListPage')
      this.navCtrl.navigateForward(['/check-list']);
    if(page=='EmpPerformancePage')
      this.navCtrl.navigateForward(['/emp-performance']);
    if(page=='EventsPage')
      this.navCtrl.navigateForward(['/events']);
    if(page=='ClaimRequestsPage')
      this.navCtrl.navigateForward(['/claim-requests']);
    if(page=='GalleryPage')
      this.navCtrl.navigateForward(['/gallery']);
    if(page=='HomePage')
      this.navCtrl.navigateRoot(['/home']);
    if(page=='WarningPage')
      this.navCtrl.navigateForward(['/warning']);
    if(page=='AppreciationPage')
      this.navCtrl.navigateForward(['/appreciation']);
    if(page=='RaisedRequestPage')
      this.navCtrl.navigateForward(['/raised-request']);
    if(page=='MyCalendarPage')
      this.navCtrl.navigateForward(['/my-calendar']);
    if(page=='MyLeavesPage')
      this.navCtrl.navigateForward(['/my-leaves']);
    if(page=='PollsPage')
      this.navCtrl.navigateForward(['/polls']);
    if(page=='SalaryIncentivePage')
      this.navCtrl.navigateForward(['/salary-incentive']);
    if(page=='TaskPage')
      this.navCtrl.navigateForward(['/task']);
    if(page=='TravelDeskPage')
      this.navCtrl.navigateForward(['/travel-desk']);
    if(page=='TravelApprovalPage')
      this.navCtrl.navigateForward(['/travel-approval']);
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
  async fetchNotificationDetails(emp_id){
    console.log('inside fetchNotificationDetails');
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    console.log(emp_id);
    let data = JSON.stringify({
      emp_id: emp_id
    });
    this.authService.postData(data, "get_mobile_notifications").then( async data => {
        console.log(data);
        if (data["status"] == "success") {

          this.notifications=data["msg"];
          console.log("data['msg']");
          console.log(data['msg']);
          this.storage.set('notifications',data["msg"]);
          // this.clear_notification();
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: "Something went wrong, please try again later",
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
          subHeader: "Something went wrong, please try again later",
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
