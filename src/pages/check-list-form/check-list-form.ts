import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CheckListFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-check-list-form',
  templateUrl: 'check-list-form.html',
})
export class CheckListFormPage {
  page_for:any;
  for_emp:any;
  checklist_id:any;
  emp_list: any;
  questions: any=[];
  answers:any=[]
  emp_id: any;
  designation: any;
  branch_location_id: any;
  myquestions: any=[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckListFormPage');
  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter CheckListFormPage');
    this.checklist_id=this.navParams.get('checklist_id');
    console.log(this.checklist_id)
    if(this.navParams.get('checklist_for')=='approver')
    {
      this.page_for='approver';
      this.for_emp=this.navParams.get('for_emp');
    }      
    else
    {
      this.page_for='emp';
    }
        
    await this.storage.get("emp_id").then(emp_id => {
      this.emp_id=emp_id;
    });
    await this.storage.get("designation").then(designation => {
      this.designation=designation;
    });
    await this.storage.get("branch_location_id").then(branch_location_id => {
      this.branch_location_id=branch_location_id;
    });

    this.fetchCheckListQuestion()
  }

  fetchCheckListQuestion()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    
    let data = JSON.stringify({
      checklist_id:this.checklist_id,
      response_for:this.page_for
    });
    console.log(data);

    this.authService.postData(data, "fetchCheckListQuestion").then(
      result => {
        let responseData = result;
        let data = JSON.parse(responseData["_body"]);
        console.log(data);
        if (data["status"] == "success") {
          console.log(typeof data["question_details"]);

          if(this.page_for=='approver')
          {
            this.questions = JSON.parse(data["question_details"]);
            for(let i=0;i<this.questions.length;i++)
            {
              this.myquestions.push({question:this.questions[i]['question'],answer:this.questions[i]['answer'],approver_answer:false});
              console.log(i);
            }
          }
          else
          {
            this.questions = JSON.parse(JSON.parse(data["question_details"])['question']);
            let i=0;
            for(let key in this.questions)
            {
              this.myquestions.push({question:this.questions[key],answer:false});
              console.log(i);
              i++;
            }
          }
          console.log(this.myquestions)
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
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
          subTitle: 'Process Failed! Please try later.',
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
        loader.dismissAll();
      }
    );
  }

  submitchecklist()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    
    let data = JSON.stringify({
      checklist_id:this.checklist_id,
      answer:this.myquestions,
      answer_by:this.page_for
    });
    console.log(data);

    this.authService.postData(data, "submitCheckListAnswer").then(
      result => {
        let responseData = result;
        let data = JSON.parse(responseData["_body"]);
        console.log(data);
        if (data["status"] == "success") {

          const toast = this.toastCtrl.create({
            message: "Your answer submitted successfully",
            duration: 2000
          });
          toast.present();

          this.viewCtrl.dismiss();
          // console.log(typeof data["question_details"]);
          // this.questions = JSON.parse(JSON.parse(data["question_details"])['question']);
          // console.log(this.questions[1]);
          // console.log(this.questions.length);
          // let i=0;
          // for(let key in this.questions)
          // {
          //   this.myquestions.push({question:this.questions[key],answer:false});
          //   // this.myquestions[i]['question']=this.questions[key];
          //   // this.myquestions[i]['answer']='';
          //   console.log(i);
          //   i++;
          // }

          // console.log(this.myquestions)
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
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
          subTitle: 'Process Failed! Please try later.',
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
        loader.dismissAll();
      }
    );
  }

  dismiss()
  {
    this.viewCtrl.dismiss();
  }

}
