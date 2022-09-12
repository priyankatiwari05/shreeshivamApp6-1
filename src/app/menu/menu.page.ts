import { Component, OnInit, ViewChild } from '@angular/core';
import { Push, PushObject, PushOptions } from '@awesome-cordova-plugins/push/ngx';
import { AlertController, MenuController, NavController, ToastController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { LoginPage } from '../login/login.page';
import { AuthService } from '../services/auth/auth.service';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Storage } from "@ionic/storage";
import { SalaryPage } from "../salary/salary.page";
import { InfoPage } from "../info/info.page";
import { AttendencePage } from "../attendence/attendence.page";
import { RaisedRequestPage } from "../raised-request/raised-request.page";
import { AppraisalPage } from "../appraisal/appraisal.page";
import { AppreciationPage } from "../appreciation/appreciation.page";
import { AskHRPage } from '../ask-hr/ask-hr.page'; 
import { BirthdayPage } from "../birthday/birthday.page";
import { AniversaryPage } from "../aniversary/aniversary.page";
import { LearningPage } from "../learning/learning.page";
import { CheckListPage } from "../check-list/check-list.page";
import { EmpPerformancePage } from "../emp-performance/emp-performance.page";
import { EventsPage } from "../events/events.page";
import { ClaimRequestsPage } from "../claim-requests/claim-requests.page";
import { GalleryPage } from "../gallery/gallery.page";
import { WarningPage } from "../warning/warning.page";
import { MyCalendarPage } from "../my-calendar/my-calendar.page";
import { MyLeavesPage } from "../my-leaves/my-leaves.page";
import { PollsPage } from "../polls/polls.page";
import { SalaryIncentivePage } from "../salary-incentive/salary-incentive.page";
import { TaskPage } from "../task/task.page";
import { TravelDeskPage } from "../travel-desk/travel-desk.page";
import { LDPage } from "../l-d/l-d.page";
import { TravelApprovalPage } from "../travel-approval/travel-approval.page";

export interface PageInterface {
  title: string;
  pageName: any;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @ViewChild('content') navCtrl: NavController;
  // Basic root for our content view
  public rootPage: any = HomePage;
  username: string;
  designation: string;
  public todaydate: any;
  // Reference to the app's root nav
  nav: any;
  pages: PageInterface[];
  responseData: any;
  email:any;
  constructor(
    public push: Push,
    public statusBar: StatusBar,
    public storage: Storage,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public authService: AuthService,
  ) {
    this.statusBar.backgroundColorByHexString("#0000006b");
    let date = new Date();
    this.todaydate = date.toISOString().substring(0, 10);
    
    this.storage.get("emp_id").then(val => {
      if (val == null) this.navCtrl.navigateForward([LoginPage]);
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

    this.menuCtrl.swipeGesture(true, 'main-menu');

  }
  ionViewWillEnter() {
    this.storage.get("emp_id").then(val => {
      if (val == null) this.navCtrl.navigateForward(['/login']);
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
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      console.log("here");
      if(page.index==0){
        this.navCtrl.navigateForward([HomePage]);

      }else{
         this.navCtrl.navigateForward(page.pageName, params);
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

  async logout(msg) {
    //let params = {username: this.username};

    const toast = this.toastController.create({
      message: msg,
      duration: 2000
    });
    (await toast).present();
    let email;
    this.storage.get("email").then(val => {
      email = val;
      this.storage.clear();

      this.navCtrl.navigateForward([LoginPage,{
        email:email
      }]);
      this.menuCtrl.close();
    });
  }

  async logout_confirm() {
    let alert = this.alertCtrl.create({
      header: "Confirm Logout",
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
    (await alert).present();
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
    this.navCtrl.pop();
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

    pushObject.on('notification').subscribe(async (notification: any) => {
      console.log('Received a notification', notification);
      if (notification.additionalData.coldstart)
      {
        this.opennotificationpage(notification.additionalData.click_action);
      }
      else if(notification.additionalData.foreground)
      {
        let confirmAlert = await this.alertCtrl.create({
          header: notification.title,
          message: notification.message,
          buttons: [{
            text: 'Cancel',
            role: 'cancel'
          }, {
            text: 'Open',
            handler: () => {
              this.opennotificationpage(notification.additionalData.click_action);
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
      }, async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          subHeader: 'Something went wrong. Try again later',
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
      this.navCtrl.navigateForward([AppraisalPage]);
    if(pagename=='AppreciationPage')
      this.navCtrl.navigateForward([AppreciationPage]);
    if(pagename=='AskHRPage')
      this.navCtrl.navigateForward([AskHRPage]);
    if(pagename=='AttendencePage')
      this.navCtrl.navigateForward([AttendencePage]);
    if(pagename=='BirthdayPage')
      this.navCtrl.navigateForward([BirthdayPage]);
    if(pagename=='AniversaryPage')
      this.navCtrl.navigateForward([AniversaryPage]);
    if(pagename=='LearningPage')
      this.navCtrl.navigateForward([LearningPage]);
    if(pagename=='LDPage')
      this.navCtrl.navigateForward([LDPage]);
    if(pagename=='CheckListPage')
      this.navCtrl.navigateForward([CheckListPage]);
    if(pagename=='EmpPerformancePage')
      this.navCtrl.navigateForward([EmpPerformancePage]);
    if(pagename=='EventsPage')
      this.navCtrl.navigateForward([EventsPage]);
    if(pagename=='ClaimRequestsPage')
      this.navCtrl.navigateForward([ClaimRequestsPage]);
    if(pagename=='GalleryPage')
      this.navCtrl.navigateForward([GalleryPage]);
    if(pagename=='HomePage')
      this.navCtrl.navigateRoot([HomePage]);
    if(pagename=='WarningPage')
      this.navCtrl.navigateForward([WarningPage]);
    if(pagename=='AppreciationPage')
      this.navCtrl.navigateForward([AppreciationPage]);
    if(pagename=='RaisedRequestPage')
      this.navCtrl.navigateForward([RaisedRequestPage]);
    if(pagename=='MyCalendarPage')
      this.navCtrl.navigateForward([MyCalendarPage]);
    if(pagename=='MyLeavesPage')
      this.navCtrl.navigateForward([MyLeavesPage]);
    if(pagename=='PollsPage')
      this.navCtrl.navigateForward([PollsPage]);
    if(pagename=='SalaryIncentivePage')
      this.navCtrl.navigateForward([SalaryIncentivePage]);
    if(pagename=='TaskPage')
      this.navCtrl.navigateForward([TaskPage]);
    if(pagename=='TravelDeskPage')
      this.navCtrl.navigateForward([TravelDeskPage]);
    if(pagename=='TravelApprovalPage')
      this.navCtrl.navigateForward([TravelApprovalPage]);
    if(pagename=='refreshappdata')
      this.getemplogindata(this.email);
  }
  ngOnInit() {
  }

}
