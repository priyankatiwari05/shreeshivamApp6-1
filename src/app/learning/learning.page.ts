import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, LoadingController} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ChaptersPage } from "../chapters/chapters.page";
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.page.html',
  styleUrls: ['./learning.page.scss'],
})
export class LearningPage implements OnInit {
  emp_id:any;
  courses:any;
  history: any;
  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public authService: AuthService) {

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

  async fetchcources()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({emp_id:this.emp_id});
    this.authService.postData(data,"get_emp_training").then(
      async result => {
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

  openChapters(index)
  {
    this.navCtrl.navigateForward([ChaptersPage,{course:this.courses[index]}])
  }

  ngOnInit() {
  }

}