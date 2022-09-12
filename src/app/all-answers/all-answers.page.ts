import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; 
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-all-answers',
  templateUrl: './all-answers.page.html',
  styleUrls: ['./all-answers.page.scss'],
})
export class AllAnswersPage implements OnInit {
  emp_answer='';
  question='';
  all_answers=[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController) {

      this.emp_answer=this.navParams.get('emp_answer');
      this.all_answers=this.navParams.get('all_answers');
      this.question=this.navParams.get('question');
  }

  ngOnInit() {
  }

}
