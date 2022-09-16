import { Component, OnInit, Pipe } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AllAnswersPage } from '../all-answers/all-answers.page';
import { AuthService } from '../services/auth/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})

@Component({
  selector: 'app-polls',
  templateUrl: './polls.page.html',
  styleUrls: ['./polls.page.scss'],
})
export class PollsPage implements OnInit {
  home:String='running';
  running_poll: any;
  closed_poll: any;
  emp_id:any;
  myquestion:any;
  // all_answers=[];
  constructor(
    public navCtrl: NavController,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    private _sanitizer : DomSanitizer) {
  }

  transform(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }

  ionViewWillEnter()
  {
    // if(this.closed_poll==null || this.running_poll==null)
    // {
      if(this.emp_id==null)
      {
        this.storage.get('emp_id').then((val)=>{
          this.emp_id=val;
            this.fetchPolls();
        });
      }
      else
      this.fetchPolls();
    // }
  }

  async fetchPolls()
  {
    console.log('Inside fetchPolls Function');
    let data = JSON.stringify({
      emp_id: this.emp_id
    });

    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    this.authService.postData(data, "fetch_polls").then(async data => {
        console.log(data);

        if (data["status"] == "success") {
          this.running_poll=data['running_poll'];
          this.closed_poll=data['closed_poll'];

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
          subHeader: err,
          buttons: ["OK"]
        });
        (await alert).present();
        console.log(err);
        (await loader).dismiss();
      }
    );
  }

  save_poll(i)
  {
    console.log('Inside SavePolls Function');
    let data = {};
    if(this.running_poll[i]['poll_type']=='option')
      data = {
        type:this.running_poll[i]['poll_type'],
        question_id:this.running_poll[i]['question_id'],
        emp_id:this.emp_id,
        option:this.running_poll[i]['emp_answer']
      };
    else
      data = {
        type:this.running_poll[i]['poll_type'],
        question_id:this.running_poll[i]['question_id'],
        emp_id:this.emp_id,
        answer:this.running_poll[i]['emp_answer']
      };

    this.authService.postData(data, "save_poll").then(async data => {
      console.log(data);

        if (data["status"] == "success") {
          this.ionViewWillEnter();
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
          console.log(data["msg"]);
        }
      },
      async err => {
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: 'Something went wrong.',
          buttons: ["OK"]
        });
        (await alert).present();
        console.log('Something went wrong.');
      }
    );
  }

  show_all_answers(i,status)
  {
    console.log('Inside show_all_answers Function');
    var question_id=0; var emp_answer ='';var question='';
    if(status=='running')
    {
      question_id=this.running_poll[i]['question_id'];
      emp_answer=this.running_poll[i]['emp_answer'];
      question=this.running_poll[i]['question'];
    }
    else
    {
      question_id=this.closed_poll[i]['question_id'];
      emp_answer=this.closed_poll[i]['emp_answer'];
      question=this.closed_poll[i]['question'];
    }

    let data = {
      question_id:question_id,
      emp_id:this.emp_id
    };
    this.authService.postData(data, "fetch_all_answers").then(async data => {
        console.log(data);

        if (data["status"] == "success") {
          this.navCtrl.navigateForward(['/all-answers',{emp_answer:emp_answer,question:question,all_answers:data['all_answers']}])
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
          console.log(data["msg"]);
        }
      },
      async err => {
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: 'Something went wrong.',
          buttons: ["OK"]
        });
        (await alert).present();
        console.log('Something went wrong.');
      }
    );
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
        this.fetchPolls();
        refresher.complete();
        setTimeout(() => {
          console.log('Async operation has ended');

        }, 2000);
  }

  ngOnInit() {
  }
}
