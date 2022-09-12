import { StatusBar } from "@ionic-native/status-bar";
import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  Nav,
  MenuController,
  AlertController,
  ToastController
} from "ionic-angular";
import { LoginPage } from "./../login/login";
import { Storage } from "@ionic/storage";
import { HomePage } from "../home/home";
import { SalaryPage } from "../salary/salary";
import { InfoPage } from "../info/info";
import { AttendencePage } from "../attendence/attendence";
import { RaisedRequestPage } from "../raised-request/raised-request";

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { AppraisalPage } from "../appraisal/appraisal";
import { AppreciationPage } from "../appreciation/appreciation";
import { AskHrPage } from "../ask-hr/ask-hr";
import { BirthdayPage } from "../birthday/birthday";
import { AniversaryPage } from "../aniversary/aniversary";
import { LearningPage } from "../learning/learning";
import { CheckListPage } from "../check-list/check-list";
import { EmpPerformancePage } from "../emp-performance/emp-performance";
import { EventsPage } from "../events/events";
import { ClaimRequestsPage } from "../claim-requests/claim-requests";
import { GalleryPage } from "../gallery/gallery";
import { WarningPage } from "../warning/warning";
import { MyCalendarPage } from "../my-calendar/my-calendar";
import { MyLeavesPage } from "../my-leaves/my-leaves";
import { PollsPage } from "../polls/polls";
import { SalaryIncentivePage } from "../salary-incentive/salary-incentive";
import { TaskPage } from "../task/task";
import { TravelDeskPage } from "../travel-desk/travel-desk";
import { LDPage } from "../l-d/l-d";
import { TravelApprovalPage } from "../travel-approval/travel-approval";
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface PageInterface {
  title: string;
  pageName: any;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@Component({
  selector: "page-menu",
  templateUrl: "menu.html"
})
export class MenuPage {
  @ViewChild('content') navCtrl: NavController;
  // Basic root for our content view
  public rootPage: any = HomePage;
  username: string;
  designation: string;
  public todaydate: any;
  // Reference to the app's root nav
  nav: Nav;
  pages: PageInterface[];
  responseData: any;
  email:any;
  constructor(
    public push:Push,
    public statusBar: StatusBar,
    public storage: Storage,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public authService: AuthserviceProvider,
  ) {
    this.statusBar.backgroundColorByHexString("#0000006b");
    let date = new Date();
    this.todaydate = date.toISOString().substring(0, 10);
    
    this.storage.get("emp_id").then(val => {
      if (val == null) this.navCtrl.setRoot(LoginPage);
      else{
        this.storage.get("storage_date").then(storagedate => {
          console.log('storagedate'+storagedate);
          if (storagedate !== this.todaydate) {
            console.log('inside calling getemplogindata');
            this.storage.set("storage_date", this.todaydate);
            this.getemplogindata(val);
          }
        });
      }
      this.storage.get("username").then(val1 => {
        this.username = val1;
        this.storage.get("designation").then(val2 => {
          this.designation = val2;
        });
      });
    });

    this.storage.get("email").then(email => {
      this.email=email;
      this.pushSetup();
    });

    this.initializePages();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MenuPage");

    this.menuCtrl.swipeEnable(true, 'main-menu');

  }
  ionViewWillEnter() {
    this.storage.get("emp_id").then(val => {
      if (val == null) this.navCtrl.setRoot(LoginPage);
      this.storage.get("username").then(val1 => {
        this.username = val1;
        this.storage.get("designation").then(val2 => {
          this.designation = val2;
        });
      });
    });

    this.initializePages();
  }
  openPage(page: PageInterface) {
    let params = {};
    if (page.index) {
      params = { tabIndex: page.index };
    }
    if (this.navCtrl.getActiveChildNav() && page.index != undefined) {
      this.navCtrl.getActiveChildNav().select(page.index);
    } else {
      console.log("here");
      if(page.index==0){
        this.navCtrl.setRoot(HomePage);

      }else{
         this.navCtrl.push(page.pageName, params);
      }

    }

  }

  getemplogindata(emp_id)
  {
    this.authService.postData(JSON.stringify({emp_id:emp_id}),'getemplogindata').then((result)=>{
      console.log(result);
      let data = JSON.parse(result["_body"]);
        //console.log(this.result);
        console.log(data);
        if (data["status"] == "success") {
          let date = new Date();
          let formatedDate = date.toISOString().substring(0, 10);
          this.storage.set("storage_date", formatedDate);
          let keys = Object.keys(data);
          for (let i = 0; i < keys.length; i++) {
            if (keys[i] != "status") {
              this.storage.set(keys[i], data[keys[i]]);
            }
          }
        }
     
      },err=>{
        console.log(err)
      });
  }
  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    if (childNav) {
      if (
        childNav.getSelected() &&
        childNav.getSelected().push === page.tabComponent
      ) {
        return "primary";
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return "primary";
    }
    return;
  }

  logout(msg) {
    //let params = {username: this.username};

    const toast = this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
    let email;
    this.storage.get("email").then(val => {
      email = val;
      this.storage.clear();

      this.navCtrl.setRoot(LoginPage,{
        email:email
      });
      this.menuCtrl.close();
    });
  }

  logout_confirm() {
    let alert = this.alertCtrl.create({
      title: "Confirm Logout",
      message: "Are you sure to logout?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Logout",
          handler: () => {
            this.logout("Logout Successfull");
          }
        }
      ]
    });
    alert.present();
  }
  public initializePages() {
    console.log("inside initializePages");

    this.pages = [
      { title: 'Home', pageName: HomePage, index: 0, icon: 'home' },
      { title: 'Salary Details', pageName: SalaryPage, index: 1, icon: 'cash' },
      { title: 'Informations', pageName: InfoPage, index: 2, icon: 'information-circle' },
      { title: 'Daily Attendence', pageName: AttendencePage, index: 3, icon: 'book' },
      { title: 'Raised Requests', pageName: RaisedRequestPage, index: 4, icon: 'paper' }
    ];
  }
  dismiss() {
    this.nav.pop();
  }
  pushSetup() {
    const options: PushOptions = {
      android: {
        senderID: '541191064265',
        forceShow: true,
        sound: true,
        vibrate: true
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification);
      if (notification.additionalData.coldstart)
      {
        this.opennotificationpage(notification.additionalData.click_action);
      }
      else if(notification.additionalData.foreground)
      {
        let confirmAlert = this.alertCtrl.create({
          title: notification.title,
          message: notification.message,
          buttons: [{
            text: 'Cancel',
            role: 'cancel'
          }, {
            text: 'Open',
            handler: () => {
              this.opennotificationpage(notification.additionalData.click_action)
            }
          }]
        });
        confirmAlert.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      let registration_id = registration.registrationId;
      let credential = JSON.stringify({
        registration_id: registration_id,
        email: this.email
      });
      this.authService.postData(credential, 'update_registration_id').then((result) => {
        this.responseData = result;
        let data = JSON.parse(this.responseData['_body']);
        console.log(data["msg"]);
      }, (err) => {
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Something went wrong. Try again later',
          buttons: ['OK'],
        });
        alert.present();
      });
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  opennotificationpage(pagename)
  {
    if(pagename=='AppraisalPage')
      this.navCtrl.push(AppraisalPage);
    if(pagename=='AppreciationPage')
      this.navCtrl.push(AppreciationPage);
    if(pagename=='AskHrPage')
      this.navCtrl.push(AskHrPage);
    if(pagename=='AttendencePage')
      this.navCtrl.push(AttendencePage);
    if(pagename=='BirthdayPage')
      this.navCtrl.push(BirthdayPage);
    if(pagename=='AniversaryPage')
      this.navCtrl.push(AniversaryPage);
    if(pagename=='LearningPage')
      this.navCtrl.push(LearningPage);
    if(pagename=='LDPage')
      this.navCtrl.push(LDPage);
    if(pagename=='CheckListPage')
      this.navCtrl.push(CheckListPage);
    if(pagename=='EmpPerformancePage')
      this.navCtrl.push(EmpPerformancePage);
    if(pagename=='EventsPage')
      this.navCtrl.push(EventsPage);
    if(pagename=='ClaimRequestsPage')
      this.navCtrl.push(ClaimRequestsPage);
    if(pagename=='GalleryPage')
      this.navCtrl.push(GalleryPage);
    if(pagename=='HomePage')
      this.navCtrl.setRoot(HomePage);
    if(pagename=='WarningPage')
      this.navCtrl.push(WarningPage);
    if(pagename=='AppreciationPage')
      this.navCtrl.push(AppreciationPage);
    if(pagename=='RaisedRequestPage')
      this.navCtrl.push(RaisedRequestPage);
    if(pagename=='MyCalendarPage')
      this.navCtrl.push(MyCalendarPage);
    if(pagename=='MyLeavesPage')
      this.navCtrl.push(MyLeavesPage);
    if(pagename=='PollsPage')
      this.navCtrl.push(PollsPage);
    if(pagename=='SalaryIncentivePage')
      this.navCtrl.push(SalaryIncentivePage);
    if(pagename=='TaskPage')
      this.navCtrl.push(TaskPage);
    if(pagename=='TravelDeskPage')
      this.navCtrl.push(TravelDeskPage);
      if(pagename=='TravelApprovalPage')
      this.navCtrl.push(TravelApprovalPage);
  }
}
