import { Component , OnInit , ViewChild, ElementRef } from '@angular/core';
import { AlertController, NavController, ToastController, LoadingController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from '../services/auth/auth.service';
import { Storage } from "@ionic/storage";
import { AttendencePage } from '../attendence/attendence.page';
import { BlankPage } from '../blank/blank.page';
import { SalaryPage } from '../salary/salary.page'; 
import { InfoPage } from '../info/info.page'; 
import { FinancePage } from '../finance/finance.page'; 
import { HrAdminPage } from '../hr-admin/hr-admin.page'; 
import { LDPage } from '../l-d/l-d.page'; 
import { SalaryIncentivePage } from '../salary-incentive/salary-incentive.page'; 
import { TaskPage } from '../task/task.page'; 
import { ApprovalPage } from '../approval/approval.page'; 
import { CelebrationPage } from '../celebration/celebration.page'; 
import { NotificationPage } from '../notification/notification.page'; 
import { AskHRPage } from '../ask-hr/ask-hr.page';
import { PollsPage } from '../polls/polls.page'; 
import { OrgChartPage } from '../org-chart/org-chart.page'; 
import { EventsPage } from '../events/events.page'; 
import { TaskMasterPage } from '../task-master/task-master.page'; 
import { GalleryPage } from '../gallery/gallery.page'; 
import { TravelDeskPage } from '../travel-desk/travel-desk.page'; 
import { LDAdminPage } from '../l-d-admin/l-d-admin.page';
import { EmpPerformancePage } from '../emp-performance/emp-performance.page'; 
import { LearningPage } from '../learning/learning.page';
import { Push, PushObject, PushOptions } from '@awesome-cordova-plugins/push/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  username: string;
  designation: string;
  role: string;
  event_count: any;
  notification_count: any;
  task_count: any;
  poll_count: any;
  show_this_item=false;
  attendence = AttendencePage;
  salary = SalaryPage;
  info = InfoPage;
  finance = FinancePage;
  learning = LearningPage;
  hr_admin = HrAdminPage;
  l_d = LDPage;
  l_d_admin = LDAdminPage;
  salary_incentive = SalaryIncentivePage;
  emp_performance = EmpPerformancePage;
  blank = BlankPage;
  task_master = TaskMasterPage;
  task = TaskPage;
  ask_hr = AskHRPage;
  approval = ApprovalPage;
  celebration = CelebrationPage;
  notification = NotificationPage;
  polls = PollsPage;
  org_chart = OrgChartPage;
  events = EventsPage;
  gallery = GalleryPage;
  travel_desk = TravelDeskPage;
  emp_id: any;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastController: ToastController,
    public loadingCtrl:LoadingController,
    public push: Push,
  ) {
    console.log('Home Page executed!!');
    this.storage.get("emp_id").then(val => {
      if (val == null) {
        this.navCtrl.navigateRoot(['/login']);
      }
      else{
        this.emp_id= val;
        this.pushSetup();
      }
    });

    this.getHomeData();
  }

  open_root(page: any) {
    console.log('page => ',page);
    this.navCtrl.navigateForward(page);
  }

  ionViewDidLoad() {
    console.log('inside ionViewDidLoad');
    this.storage.get("username").then(val => {
      this.username = val;
      console.log("Your username is : " + val);
      this.storage.get("designation").then(val1 => {
        this.designation = val1;
        console.log(this.designation);
        if(this.designation.toUpperCase().includes('GM') ||
         this.designation.toUpperCase().includes('DIRECTOR') ||
          this.designation.toUpperCase().includes('PCH') ||
          this.designation.toUpperCase().includes('HR ')
          )
        {
          this.show_this_item=true;
        }
        else
        {
          this.show_this_item=false;
        }
        this.storage.get("role").then(val2 => {
          this.role = val2;
        });
      });
      // if (val == null) {
      //   this.navCtrl.navigateRoot(['/login']);
      // }
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
            console.log('inside handler')
            this.logout("Logout Successfull");
          }
        }
      ]
    });
    (await alert).present();
  }

  async logout(msg) {
    console.log('inside logout')
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    
    let username=null; let password=null;
    this.storage.get("prefill_username").then(val => {
      username = val;
      console.log(username)
      this.storage.get("prefill_password").then(async val1 => {
        password=val1;
        console.log(password)
        console.log(val+" "+val1)
        this.storage.clear();
        this.storage.set('prefill_username',username);
        this.storage.set('prefill_password',password);
        this.storage.get('prefill_username').then(val=>console.log(val+" saved"));
        const toast = this.toastController.create({
          message: msg,
          duration: 2000
        });
        (await toast).present();
        this.navCtrl.navigateRoot(['/login']);
      });
    });
  }

  getHomeData()
  {
    this.storage.get('emp_id').then((val)=>{
      val = 2; //temporary emp_id  in case storage id is null
      this.authService.postData(JSON.stringify({emp_id:val}),'getapphomedata').then((data)=>{
        console.log('Post Data', data);
        this.task_count=data['task_count'];
        this.event_count=data['event_count'];
        this.notification_count=data['notification_count'];
        this.poll_count=data['poll_count'];
      },err=>{
        console.log(err)
      });
    })
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.getHomeData();
      refresher.complete();
      setTimeout(() => {
        console.log('Async operation has ended');
      }, 2000);
  }

  pushSetup() {
    const options: PushOptions = {
      android: {
        senderID: '707140899880',
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
        let confirmAlert =await  this.alertCtrl.create({
          header: notification.title,
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
       await  confirmAlert.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      let registration_id = registration.registrationId;
      let credential = JSON.stringify({
        registration_id: registration_id,
        emp_id: this.emp_id
      });
      this.authService.postData(credential, 'update_registration_id').then((data) => {
        console.log(data["msg"]);
      }, async (err) => {
        const alert =await this.alertCtrl.create({
          header: 'Error',
          subHeader: 'Something went wrong. Try again later',
          buttons: ['OK'],
        });
        await alert.present();
      });
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  opennotificationpage(pagename)
  {
    if(pagename=='AppraisalPage')
      this.navCtrl.navigateForward(['/appraisal']);
    if(pagename=='AppreciationPage')
    this.navCtrl.navigateForward(['/appreciation']);
    if(pagename=='AskHRPage')
    this.navCtrl.navigateForward(['/ask-hr']);
    if(pagename=='AttendencePage')
    this.navCtrl.navigateForward(['/attendence']);
    if(pagename=='BirthdayPage')
    this.navCtrl.navigateForward(['/birthday']);
    if(pagename=='AniversaryPage')
    this.navCtrl.navigateForward(['/aniversary']);
    if(pagename=='LearningPage')
     this.navCtrl.navigateForward(['/learning']);
    if(pagename=='LDPage')
    this.navCtrl.navigateForward(['/l-d']);
    if(pagename=='CheckListPage')
    this.navCtrl.navigateForward(['/check-list']);
    if(pagename=='EmpPerformancePage')
    this.navCtrl.navigateForward(['/emp-performance']);
    if(pagename=='EventsPage')
    this.navCtrl.navigateForward(['/events']);
    if(pagename=='ClaimRequestsPage')
    this.navCtrl.navigateForward(['/claim-requests']);
    if(pagename=='GalleryPage')
    this.navCtrl.navigateForward(['/gallery']);
    if(pagename=='HomePage')
    this.navCtrl.navigateForward(['/home']);
    if(pagename=='WarningPage')
    this.navCtrl.navigateForward(['/warning']);
    if(pagename=='AppreciationPage')
    this.navCtrl.navigateForward(['/appreciation']);
    if(pagename=='RaisedRequestPage')
     this.navCtrl.navigateForward(['/raised-request']);
    if(pagename=='MyCalendarPage')
     this.navCtrl.navigateForward(['/my-calendar']);
    if(pagename=='MyLeavesPage')
     this.navCtrl.navigateForward(['/my-leaves']);
    if(pagename=='PollsPage')
     this.navCtrl.navigateForward(['/polls']);
    if(pagename=='SalaryIncentivePage')
     this.navCtrl.navigateForward(['/salary-incentive']);
    if(pagename=='TaskPage')
     this.navCtrl.navigateForward(['/task']);
    if(pagename=='TravelDeskPage')
     this.navCtrl.navigateForward(['/travel-desk']);
    if(pagename=='TravelApprovalPage')
     this.navCtrl.navigateForward(['/travel-approval']);
    if(pagename=='refreshappdata')
      this.getHomeData();
  }

  ngOnInit() {
  }

}
