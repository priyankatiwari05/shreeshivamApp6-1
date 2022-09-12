import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalOptions, ModalController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ChapterDetailPage } from '../chapter-detail/chapter-detail.page';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.page.html',
  styleUrls: ['./chapters.page.scss'],
})
export class ChaptersPage implements OnInit {
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
    public authService: AuthService) {

      this.storage.get('emp_id').then(val=>{
        this.emp_id=val;
      });
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

  async fetchEmpCourseChapterDetail()
  {
    console.log('inside fetchEmpCourseChapterDetail');
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({emp_id:this.emp_id,course_id:this.course.course_id,assign_id:this.course.id,chapters:this.course.chapters});
    console.log(data)
    this.authService.postData(data,"fetchEmpCourseChapterDetail").then(
      async result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.chapterlist=data['chapters'];
          console.log(this.chapterlist);
          
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

  showchapter(i)
  {
    let chapter_name=this.chapterlist[i].chapter_title;
    let chapter_id=this.chapterlist[i].id
    let youtubevideo=this.chapterlist[i].youtube_link;
    let assessment_id = this.chapterlist[i].post_assesment_id;
    this.openModal(chapter_name,chapter_id,youtubevideo,assessment_id);
  }

  async openModal(chapter_name,chapter_id,youtubevideo,assessment_id) {  
    const myModal = await this.modal.create({component:ChapterDetailPage,backdropDismiss: true, componentProps:{ chapter_id:chapter_id,chapter_name:chapter_name,assessment_id:assessment_id,youtubevideolink:youtubevideo}});

   (await myModal).present();
  
   myModal.onDidDismiss().then((data) => {
      console.log("I have dismissed.");
      this.ionViewWillEnter();
      // console.log(data);
    });
  
    myModal.onWillDismiss().then((data) => {
      console.log("I'm about to dismiss");
    });
  
  }
  ngOnInit() {
  }
}
