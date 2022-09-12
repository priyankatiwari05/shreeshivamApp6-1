import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  Platform,
  LoadingController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { ChaptersPage } from "../chapters/chapters";

@Component({
  selector: 'page-learning',
  templateUrl: 'learning.html',
})
export class LearningPage {
  emp_id:any;
  courses:any;
  history: any;
  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public authService: AuthserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LearningPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter LearningPage');
    if(this.emp_id)
      this.fetchcources();
    else
    {
      this.storage.get('emp_id').then(val=>{
        this.emp_id=val;
        this.fetchcources();
      });
    }
  }

  fetchcources()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({emp_id:this.emp_id});
    this.authService.postData(data,"get_emp_training").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.courses=data['assessment'];
          this.history=data['history'];
          console.log(this.courses);
          for(let i=0;i<this.courses.length;i++)
          {
            this.courses[i].chapters=[];
            if(this.courses[i].chapter_json!=null && this.courses[i].chapter_json!='')
              this.courses[i].chapters=JSON.parse(this.courses[i].chapter_json);
            console.log(this.courses[i].chapters);
          }
          console.log(data);
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

  openChapters(index)
  {
    this.navCtrl.push(ChaptersPage,{course:this.courses[index]})
  }
}
