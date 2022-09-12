import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,
  AlertController,
  LoadingController,
  Content} from 'ionic-angular';
  import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AskHrQueriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ask-hr-queries',
  templateUrl: 'ask-hr-queries.html',
})
export class AskHrQueriesPage {
public queries:any;
public status_by:any;
public useremail:any
public request_id:any;
public status:any;
public status_by_userid:any
public query:any;
public query_type:any;
@ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskHrQueriesPage');
    // this.content.scrollToBottom(0);
  }

  ionViewWillEnter()
  {
    
    this.status=this.navParams.get('status');
    this.request_id=this.navParams.get('request_id');
    this.status_by_userid=this.navParams.get('status_by_userid');
    this.query_type=this.navParams.get('query_type');
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

  fetchAskHrQuery(email){
    let data = JSON.stringify({
      request_id: this.request_id,
      status: this.status,
      status_by_userid: this.status_by_userid,
    });

    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.authService.postData(data, "ask_hr_queries").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
       // console.log(responseData);
        console.log(data);
        if (data["status"] == "success") {

          if(data["queries"]!="[]"){
              this.queries=data["queries"];
              this.status_by=data['status_by'];
            console.log(this.queries);
          }

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


add_new_query()
  {
    if(this.query==null || this.query=='')
    {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Please write your query.',
        buttons: ["OK"]
      });
      alert.present();
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
  submit_query(path,data)
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.authService.postData(data, path).then(
      result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          const alert = this.alertCtrl.create({
            title: "Saved",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          loader.dismissAll();
          this.query='';
          if(path=='close_askhr_request')
            this.status='closed';
          this.fetchAskHrQuery(this.useremail);
          console.log(data["msg"]);
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
          loader.dismissAll();
        }

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
}
