import { AttendencePage } from "./../attendence/attendence";
import { BlankPage } from "./../blank/blank";
import { SalaryPage } from "./../salary/salary";
import { InfoPage } from "./../info/info";
import { Component } from "@angular/core";
import { NavController, AlertController, ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { LoginPage } from "../login/login";
import { FinancePage } from "../finance/finance";
import { HrAdminPage } from "../hr-admin/hr-admin";
import { LDPage } from "../l-d/l-d";
import { SalaryIncentivePage } from "../salary-incentive/salary-incentive";
import { TaskPage } from "../task/task";
import { ApprovalPage } from "../approval/approval";
import { CelebrationPage } from "../celebration/celebration";
import { NotificationPage } from "../notification/notification";
import { AskHrPage } from "../ask-hr/ask-hr";
import { PollsPage } from "../polls/polls";
import { OrgChartPage } from "../org-chart/org-chart";
import { EventsPage } from "../events/events";
import { TaskMasterPage } from "../task-master/task-master";
import { GalleryPage } from "../gallery/gallery";
import { TravelDeskPage } from "../travel-desk/travel-desk";
import { LDAdminPage } from "../l-d-admin/l-d-admin";
import { EmpPerformancePage } from "../emp-performance/emp-performance";
import { LearningPage } from "../learning/learning";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  username: string;
  designation: string;
  role: string;
  attendence = AttendencePage;
  salary = SalaryPage;
  info = InfoPage;
  finance = FinancePage;
  hr_admin = HrAdminPage;
  l_d = LDPage;
  l_d_admin = LDAdminPage;
  salary_incentive = SalaryIncentivePage;
  emp_performance = EmpPerformancePage;
  blank = BlankPage;
  task_master = TaskMasterPage;
  approval = ApprovalPage;
  celebration = CelebrationPage;
  notification = NotificationPage;
  polls = PollsPage;
  org_chart = OrgChartPage;
  events = EventsPage;
  gallery = GalleryPage;
  learning = LearningPage;
  travel_desk = TravelDeskPage;
  ask_hr=AskHrPage;
  event_count: any;
  notification_count: any;
  task_count: any;
  poll_count: any;
  show_this_item=false;
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    public toastController: ToastController,
  ) {}
  open_root(page) {
    this.navCtrl.push(page);
  }

  ionViewWillEnter() {
    this.getHomeData();
  }

  getHomeData()
  {
    this.storage.get('emp_id').then((val)=>{
      this.authService.postData(JSON.stringify({emp_id:val}),'getapphomedata').then((result)=>{
        console.log(result);
        let data = JSON.parse(result["_body"]);
        this.task_count=data['task_count'];
        this.event_count=data['event_count'];
        this.notification_count=data['notification_count'];
        this.poll_count=data['poll_count'];
      },err=>{
        console.log(err)
      });
    })
  }
  // getCashReceivablePayable(prefix)
  // {
  //   //let credential = JSON.stringify({prefix: prefix});

  // }
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
      if (val == null) {
        this.navCtrl.setRoot(LoginPage);
      }
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
            console.log('inside handler')
            this.logout("Logout Successfull");
          }
        }
      ]
    });
    alert.present();
  }
  logout(msg) {
    console.log('inside logout')
    const toast = this.toastController.create({
      message: msg,
      duration: 2000
    });
    
    let username=null; let password=null;
    this.storage.get("prefill_username").then(val => {
      username = val;
      console.log(username)
      this.storage.get("prefill_password").then(val1 => {
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
        toast.present();
        this.navCtrl.setRoot(LoginPage);
      });
    });
  }

}
