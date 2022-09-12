import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { AllAnswersPage } from '../all-answers/all-answers';

/**
 * Generated class for the SalaryIncentivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-polls',
  templateUrl: 'polls.html',
})



export class PollsPage {

  home:String='running';
  running_poll: any;
  closed_poll: any;
  emp_id:any;
  myquestion:any;
  // all_answers=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    private modal: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollsPage');
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

  fetchPolls()
  {
    let data = JSON.stringify({
      emp_id: this.emp_id
    });

    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.authService.postData(data, "fetch_polls").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        console.log(data);
        if (data["status"] == "success") {
          this.running_poll=data['running_poll'];
          this.closed_poll=data['closed_poll'];

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
          subTitle: err,
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
        loader.dismissAll();
      }
    );
  }

  save_poll(i)
  {
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

    this.authService.postData(data, "save_poll").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        console.log(data);
        if (data["status"] == "success") {
          this.ionViewWillEnter();
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        }
      },
      err => {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: 'Something went wrong.',
          buttons: ["OK"]
        });
        alert.present();
        console.log('Something went wrong.');
      }
    );
  }

  show_all_answers(i,status)
  {
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
    this.authService.postData(data, "fetch_all_answers").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        console.log(data);
        if (data["status"] == "success") {
          this.navCtrl.push(AllAnswersPage,{emp_answer:emp_answer,question:question,all_answers:data['all_answers']})
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        }
      },
      err => {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: 'Something went wrong.',
          buttons: ["OK"]
        });
        alert.present();
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

}
