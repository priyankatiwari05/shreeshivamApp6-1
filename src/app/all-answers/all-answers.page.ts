import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, ModalController, LoadingController } from '@ionic/angular';
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
  all_answers : any = [];
  constructor(public navCtrl: NavController,
    public route: ActivatedRoute,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController) {

      this.emp_answer=this.route.snapshot.paramMap.get('emp_answer');
      this.all_answers=this.route.snapshot.paramMap.get('all_answers');
      this.question=this.route.snapshot.paramMap.get('question');
  }

  ngOnInit() {
  }

}
