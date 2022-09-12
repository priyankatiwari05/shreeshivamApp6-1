import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalOptions, Modal, ModalController } from 'ionic-angular';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { Storage } from "@ionic/storage";
import { ChapterDetailPage } from '../chapter-detail/chapter-detail';

@Component({
  selector: 'page-chapters',
  templateUrl: 'chapters.html',
})
export class ChaptersPage {
  course:any;
  emp_id: any;
  chapterlist:any;
  course_name:any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public modal: ModalController,
    public authService: AuthserviceProvider) {

      this.storage.get('emp_id').then(val=>{
        this.emp_id=val;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChaptersPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ChaptersPage');
    this.course=this.navParams.get('course');
    console.log(this.course)
    this.course_name=this.course.course_name;
    if(this.emp_id)
      this.fetchEmpCourseChapterDetail();
    else
    {
      this.storage.get('emp_id').then(val=>{
        this.emp_id=val;
        this.fetchEmpCourseChapterDetail();
      });
    }
  }

  fetchEmpCourseChapterDetail()
  {
    console.log('inside fetchEmpCourseChapterDetail');
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({emp_id:this.emp_id,course_id:this.course.course_id,assign_id:this.course.id,chapters:this.course.chapters});
    console.log(data)
    this.authService.postData(data,"fetchEmpCourseChapterDetail").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.chapterlist=data['chapters'];
          console.log(this.chapterlist);
          
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

  showchapter(i)
  {
    let chapter_name=this.chapterlist[i].chapter_title;
    let chapter_id=this.chapterlist[i].id
    let youtubevideo=this.chapterlist[i].youtube_link;
    let assessment_id = this.chapterlist[i].post_assesment_id;
    this.openModal(chapter_name,chapter_id,youtubevideo,assessment_id);
  }

  openModal(chapter_name,chapter_id,youtubevideo,assessment_id) {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
  
    // const myModalData = {
    //   query_type: this.home
    // };
  
    const myModal: Modal = this.modal.create(ChapterDetailPage, {chapter_id:chapter_id,chapter_name:chapter_name,assessment_id:assessment_id,youtubevideolink:youtubevideo }, myModalOptions);
  
    myModal.present();
  
    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      this.ionViewWillEnter();
      // console.log(data);
    });
  
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      // console.log(data);
    });
  
  }

  

}
