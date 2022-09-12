import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthserviceProvider } from '../../providers/authservice/authservice';

@Component({
  selector: 'page-all-answers',
  templateUrl: 'all-answers.html',
})
export class AllAnswersPage {
  emp_answer='';
  question='';
  all_answers=[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllAnswersPage');
  }

  ionViewWillEnter()
  {
    console.log('ionViewWillEnter AllAnswersPage');
    this.emp_answer=this.navParams.get('emp_answer');
    this.all_answers=this.navParams.get('all_answers');
    this.question=this.navParams.get('question');
  }

}
