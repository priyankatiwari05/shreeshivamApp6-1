import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Modal, ModalController, ModalOptions} from 'ionic-angular';
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { Storage } from '@ionic/storage';
import { AskHrQueriesPage } from '../ask-hr-queries/ask-hr-queries';
import { AskHrFormPage } from '../ask-hr-form/ask-hr-form';

/**
 * Generated class for the AskHrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ask-hr',
  templateUrl: 'ask-hr.html',
})
export class AskHrPage {
 public hr_request:any;
 public useremail:any;
 home:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController, private modal: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskHrPage');
  }

  ionViewWillEnter()
  {
    if(this.useremail==null)
    {
      this.storage.get('email').then((val1) => {
        this.useremail=val1;
        this.fetchAskHrRequest(this.useremail);
      });
    }
    else
    {
      this.fetchAskHrRequest(this.useremail);
    }      
  }

  fetchAskHrRequest(email){
    
    let data = JSON.stringify({
      useremail: email
    });

    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.authService.postData(data, "ask_hr_request").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
      
        if (data["status"] == "success") {

          if(data["ask_hr_request_list"]!="[]"){
              this.hr_request=JSON.parse(data["ask_hr_request_list"]);
          }
          this.home = "suggestion";
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

fetch_queries(req_id,status,status_by_userid,query_type)
{
  this.navCtrl.push(AskHrQueriesPage,{request_id:req_id,status:status,status_by_userid:status_by_userid,query_type:query_type})
}

// add_new()
// {
//   this.openModal();
// }

openModal() {

  const myModalOptions: ModalOptions = {
    enableBackdropDismiss: true
  };

  // const myModalData = {
  //   query_type: this.home
  // };

  const myModal: Modal = this.modal.create(AskHrFormPage, { query_type: this.home, page_type:'' }, myModalOptions);

  myModal.present();

  myModal.onDidDismiss((data) => {
    console.log("I have dismissed.");
    this.fetchAskHrRequest(this.useremail);
    // console.log(data);
  });

  myModal.onWillDismiss((data) => {
    console.log("I'm about to dismiss");
    // console.log(data);
  });

}

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
      this.storage.get('email').then((val1) => {
        this.fetchAskHrRequest(val1);
        refresher.complete();
        // setTimeout(() => {
        //   console.log('Async operation has ended');

        // }, 2000);
      });
  }
}
