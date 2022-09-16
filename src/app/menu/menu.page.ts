import { Component, OnInit, ViewChild } from '@angular/core';
import { Push, PushObject, PushOptions } from '@awesome-cordova-plugins/push/ngx';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
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
import { Router } from '@angular/router';
import { OrgChartPage } from '../org-chart/org-chart.page';
import { CelebrationPage } from '../celebration/celebration.page';
import { CreateTaskPage } from '../create-task/create-task.page';
import { BlankPage } from '../blank/blank.page';
import { LDAdminPage } from '../l-d-admin/l-d-admin.page';
import { LeaveApprovalPage } from '../leave-approval/leave-approval.page';
import { LeaveFormPage } from '../leave-form/leave-form.page';
import { MissPunchApprovalPage } from '../miss-punch-approval/miss-punch-approval.page';
import { TravelEntitlementPage } from '../travel-entitlement/travel-entitlement.page';
import { TravelNStayPage } from '../travel-n-stay/travel-n-stay.page';
import { BusinessPage } from '../business/business.page';

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
  @ViewChild('content') router: Router;
  // Basic root for our content view
  public rootPage: any = HomePage;
  username: string;
  designation: string;
  public todaydate: any;
  // Reference to the app's root nav
  nav: any;
  pages: PageInterface[];
  email:any;
  my_task = TaskPage;
  create_task = CreateTaskPage;
  check_list = CheckListPage;
  blank = BlankPage;
  myclaims = ClaimRequestsPage;
  travel_entitlement = TravelEntitlementPage;
  business = BusinessPage;
  travel_approval = TravelApprovalPage;
  miss_punch_page = MissPunchApprovalPage;
  claim_approvals = ClaimRequestsPage;
  leave = MyLeavesPage;
  leave_approval = LeaveApprovalPage;
  leave_form = LeaveFormPage;
  my_leaves = MyLeavesPage;
  my_calendar = MyCalendarPage;
  appraisal_page = AppraisalPage;
  travel_n_stay = TravelNStayPage;
  attendence = AttendencePage;
  warning = WarningPage;
  appreciation = AppreciationPage;
  raised_request = RaisedRequestPage;
  l_d = LDPage;
  l_d_admin = LDAdminPage;
  ask_hr = AskHRPage;
  salary_incentive = SalaryIncentivePage;
  emp_performance = EmpPerformancePage;
  polls = PollsPage;
  org_chart = OrgChartPage;
  events = EventsPage;
  gallery = GalleryPage;
  celebration = CelebrationPage;
  birthday = BirthdayPage;
  anniversary = AniversaryPage;
  learning = LearningPage;
  travel_desk = TravelDeskPage

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
      if (val == null) this.router.navigate([LoginPage]);
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
      if (val == null) this.router.navigate(['/login']);
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
        this.router.navigate([HomePage]);

      }else{
         this.router.navigate(page.pageName, params);
      }

    }

  }

  getemplogindata(emp_id)
  {
    this.authService.postData(JSON.stringify({emp_id:emp_id}),'getemplogindata').then((data)=>{
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

      this.router.navigate([LoginPage,{
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
      this.authService.postData(credential, 'update_registration_id').then((data) => {
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
      this.router.navigate(['/appraisal']);
    if(pagename=='AppreciationPage')
      this.router.navigate(['/appreciation']);
    if(pagename=='AskHRPage')
      this.router.navigate(['/ask-hr']);
    if(pagename=='AttendencePage')
      this.router.navigate(['/attendence']);
    if(pagename=='BirthdayPage')
      this.router.navigate(['/birthday']);
    if(pagename=='AniversaryPage')
      this.router.navigate(['/aniversary']);
    if(pagename=='LearningPage')
      this.router.navigate(['/learning']);
    if(pagename=='LDPage')
      this.router.navigate(['/l-d']);
    if(pagename=='CheckListPage')
      this.router.navigate(['/check-list']);
    if(pagename=='EmpPerformancePage')
      this.router.navigate(['/emp-performance']);
    if(pagename=='EventsPage')
      this.router.navigate(['/events']);
    if(pagename=='ClaimRequestsPage')
      this.router.navigate(['/claim-requests']);
    if(pagename=='GalleryPage')
      this.router.navigate(['/gallery']);
    if(pagename=='HomePage')
      this.router.navigate(['/home']);
    if(pagename=='WarningPage')
      this.router.navigate(['/warning']);
    if(pagename=='AppreciationPage')
      this.router.navigate(['/appreciation']);
    if(pagename=='RaisedRequestPage')
      this.router.navigate(['/raised-request']);
    if(pagename=='MyCalendarPage')
      this.router.navigate(['/my-calendar']);
    if(pagename=='MyLeavesPage')
      this.router.navigate(['/my-leaves']);
    if(pagename=='PollsPage')
      this.router.navigate(['/polls']);
    if(pagename=='SalaryIncentivePage')
      this.router.navigate(['/salary-incentive']);
    if(pagename=='TaskPage')
      this.router.navigate(['/task']);
    if(pagename=='TravelDeskPage')
      this.router.navigate(['/travel-desk']);
    if(pagename=='TravelApprovalPage')
      this.router.navigate(['/travel-approval']);
    if(pagename=='refreshappdata')
      this.getemplogindata(this.email);
  }
  ngOnInit() {
  }

}
