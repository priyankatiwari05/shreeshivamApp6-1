import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-check-list-form',
  templateUrl: './check-list-form.page.html',
  styleUrls: ['./check-list-form.page.scss'],
})
export class CheckListFormPage implements OnInit {
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
    public route: ActivatedRoute,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
      
  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter CheckListFormPage');
    this.checklist_id=this.route.snapshot.paramMap.get('checklist_id');
    console.log(this.checklist_id)
    if(this.route.snapshot.paramMap.get('checklist_for')=='approver')
    {
      this.page_for='approver';
      this.for_emp=this.route.snapshot.paramMap.get('for_emp');
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

  async fetchCheckListQuestion()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    
    let data = JSON.stringify({
      checklist_id:this.checklist_id,
      response_for:this.page_for
    });
    console.log(data);

    this.authService.postData(data, "fetchCheckListQuestion").then(
      async data => {
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
            header: "Error",
            subHeader: data["msg"],
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
          subHeader: 'Process Failed! Please try later.',
          buttons: ["OK"]
        });
        (await alert).present();
        console.log(err);
        (await loader).dismiss();
      }
    );
  }

  async submitchecklist()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    
    let data = JSON.stringify({
      checklist_id:this.checklist_id,
      answer:this.myquestions,
      answer_by:this.page_for
    });
    console.log(data);

    this.authService.postData(data, "submitCheckListAnswer").then(
      async data => {
        console.log(data);
        if (data["status"] == "success") {

          const toast = this.toastCtrl.create({
            message: "Your answer submitted successfully",
            duration: 2000
          });
          (await toast).present();

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
            header: "Error",
            subHeader: data["msg"],
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
          subHeader: 'Process Failed! Please try later.',
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
