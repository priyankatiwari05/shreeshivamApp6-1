import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController, IonContent} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-ask-hr-queries',
  templateUrl: './ask-hr-queries.page.html',
  styleUrls: ['./ask-hr-queries.page.scss'],
})
export class AskHrQueriesPage implements OnInit {
  [x: string]: any;
  public queries:any;
  public status_by:any;
  public useremail:any
  public request_id:any;
  public status:any;
  public status_by_userid:any
  public query:any;
  @ViewChild('Content') content: IonContent;
  
    constructor(public navCtrl: NavController, public route: ActivatedRoute, public storage:Storage,public loadingCtrl:LoadingController,
      public authService: AuthService,
      public alertCtrl: AlertController) {

        this.status=this.route.snapshot.paramMap.get('status');
        this.request_id=this.route.snapshot.paramMap.get('request_id');
        this.status_by_userid=this.route.snapshot.paramMap.get('status_by_userid');
        this.query_type=this.route.snapshot.paramMap.get('query_type');
        if(this.useremail==null)
        {
          this.storage.get('email').then((val1) => {
            this.useremail=val1;
            this.fetchAskHrQuery(this.useremail);
          });
        }
        else
        {
          this.fetchAskHrQuery(this.useremail);
        }
    }
  
    async fetchAskHrQuery(email){
      let data = JSON.stringify({
        request_id: this.request_id,
        status: this.status,
        status_by_userid: this.status_by_userid,
      });
  
      const loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();
  
      this.authService.postData(data, "ask_hr_queries").then(
        async data => {
          console.log(data);
          if (data["status"] == "success") {
  
            if(data["queries"]!="[]"){
                this.queries=data["queries"];
                this.status_by=data['status_by'];
              console.log(this.queries);
            }
  
          } else {
            const alert = this.alertCtrl.create({
              header: "Error",
              message: data["msg"],
              buttons: ["OK"]
            });
            (await alert ).present();
            console.log(data["msg"]);
          }
          (await loader ).dismiss();
        },
        async err => {
          const alert = this.alertCtrl.create({
            header: "Error",
            message: err,
            buttons: ["OK"]
          });
          (await alert ).present();
          console.log(err);
          (await loader ).dismiss();
        }
      );
  }
  
  
  async add_new_query()
    {
      if(this.query==null || this.query=='')
      {
        const alert = this.alertCtrl.create({
          header: "Error",
          message: 'Please write your query.',
          buttons: ["OK"]
        });
        (await alert ).present();
      }
      else
      {
        let data = JSON.stringify({
          request_id: this.request_id,
          myquery:this.query
        });
        this.submit_query("add_new_query",data);
      }
    }
  
    close_askhr_request()
    {
      let data = JSON.stringify({
        request_id: this.request_id,
        useremail:this.useremail
      });
      this.submit_query('close_askhr_request',data);
    }
    async submit_query(path,data)
    {
      const loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();
  
      this.authService.postData(data, path).then(
        async data => {
          if (data["status"] == "success") {
            const alert = this.alertCtrl.create({
              header: "Saved",
              message: data["msg"],
              buttons: ["OK"]
            });
            (await alert ).present();
            (await loader ).dismiss();
            this.query='';
            if(path=='close_askhr_request')
              this.status='closed';
            this.fetchAskHrQuery(this.useremail);
            console.log(data["msg"]);
          } else {
            const alert = this.alertCtrl.create({
              header: "Error",
              message: data["msg"],
              buttons: ["OK"]
            });
            (await alert ).present();
            console.log(data["msg"]);
            (await loader ).dismiss();
          }
  
      },
      async err => {
        const alert = this.alertCtrl.create({
          header: "Error",
          message: err,
          buttons: ["OK"]
        });
        (await alert ).present();
        console.log(err);
        (await loader ).dismiss();
      }
    );
  
   }
  
    callFunction(){
      this.content.scrollToBottom(0);
    }
  
    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
  
  
        this.storage.get('email').then((val1) => {
          this.fetchAskHrQuery(val1);
          refresher.complete();
          // setTimeout(() => {
          //   console.log('Async operation has ended');
  
          // }, 2000);
        });
    }
  ngOnInit() {
  }
}
