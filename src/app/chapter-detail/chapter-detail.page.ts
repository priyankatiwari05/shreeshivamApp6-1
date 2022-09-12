import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalOptions, ModalController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import {DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.page.html',
  styleUrls: ['./chapter-detail.page.scss'],
})
export class ChapterDetailPage implements OnInit {
  emp_id: any;
  chapter_id: any;
  assessment_id: any;
  questionlist: any;
  course_id: any;
  assign_id: any;
  chapter_name: any;
  youtubevideolink: string;
  start_exam: boolean=false;
  exam_status: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public modal: ModalController,
    public mdlCtrl: ModalController,
    public authService: AuthService,
    public sanitizer: DomSanitizer ) {
      this.storage.get('emp_id').then(val=>{
        this.emp_id=val;
      });

    this.start_exam=false;
    this.assessment_id=this.navParams.get('assessment_id');
    this.chapter_id=this.navParams.get('chapter_id');
    this.course_id=this.navParams.get('course_id');
    this.assign_id=this.navParams.get('assign_id');
    this.chapter_name=this.navParams.get('chapter_name');
    this.youtubevideolink=this.navParams.get('youtubevideolink');
    console.log('this.youtubevideolink');
    console.log(this.youtubevideolink);
    this.fetchChapterQuestions();
  }

  fetchChapterQuestions()
  {
    // console.log('inside fetchChapterQuestions');
    // const loader = this.loadingCtrl.create({
    //   content: "Please wait..."
    // });
    // loader.present();
    let data = JSON.stringify({emp_id:2,course_id:this.course_id,assign_id:this.assign_id,chapter_id:this.chapter_id,assessment_id:this.assessment_id});
    console.log(data)
    this.authService.postData(data,"fetchChapterQuestions").then(
      async result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        console.log(data);
        if (data["status"] == "success") {
          this.questionlist=data['questions'];
          console.log(this.questionlist);
          
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            message: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
          console.log(data["msg"]);
        }
        // loader.dismissAll();
      },
      async err => {
        const alert = this.alertCtrl.create({
          header: "Error",
          message: err,
          buttons: ["OK"]
        });
        (await alert).present();
        console.log(err);
        // loader.dismissAll();
      }
    );
  }

  attend_exam()
  {
    this.start_exam=true;
  }

  unset(i)
  {
    this.questionlist[i].selected_answer=null;
  }

  unset_all()
  {
    for(let i=0; i<this.questionlist.length;i++)
    {
      this.questionlist[i].selected_answer=null;
      this.questionlist[i].selected_answer_status=null;
    }
  }

  async submit_exam()
  {
    console.log('inside submit_exam');
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let pass=true;
    for(let i=0; i<this.questionlist.length;i++)
    {
      console.log(this.questionlist[i].selected_answer)
      console.log(this.questionlist[i].anwser)
      if(this.questionlist[i].selected_answer==this.questionlist[i].anwser)
      {
        this.questionlist[i].selected_answer_status='right';
      }
      else
      {
        this.questionlist[i].selected_answer_status='wrong';
        pass=false;
      }
    }

    if(pass==false)
      this.exam_status='fail';
    else
      this.exam_status='pass';
    
    // this.submitExamResult()
    (await loader).dismiss();
  }

  attend_again()
  {
    this.unset_all();
    this.exam_status=null;
  }

  watch_again()
  {
    this.unset_all();
    this.exam_status=null;
    this.start_exam=false;
  }

  submitExamResult()
  {
    console.log('inside submitExamResult function')
    let data = JSON.stringify({emp_id:this.emp_id,course_id:this.course_id,assign_id:this.assign_id,chapter_id:this.chapter_id,assessment_id:this.assessment_id,questionlist:this.questionlist,exam_status:this.exam_status});
    console.log(data)
    this.authService.postData(data,"submitExamResult").then(
      async result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        console.log(data);
        if (data["status"] == "success") {
          this.questionlist=data['questions'];
          console.log(this.questionlist);
          
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            message: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
          console.log(data["msg"]);
        }
      },
      async err => {
        const alert = this.alertCtrl.create({
          header: "Error",
          message: err,
          buttons: ["OK"]
        });
        (await alert).present();
        console.log(err);
      }
    );
  }
  ngOnInit() {
  }
}
