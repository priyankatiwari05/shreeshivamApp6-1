import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController, ModalOptions} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AskHrQueriesPage } from '../ask-hr-queries/ask-hr-queries.page'; 
import { AskHrFormPage } from '../ask-hr-form/ask-hr-form.page';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-ask-hr',
  templateUrl: './ask-hr.page.html',
  styleUrls: ['./ask-hr.page.scss'],
})
export class AskHRPage implements OnInit {
  public hr_request:any;
  public useremail:any;
  home:string;
   
  constructor(public navCtrl: NavController, public storage:Storage, public loadingCtrl:LoadingController, 
    public authService: AuthService, public alertCtrl: AlertController, private modalCtrl: ModalController) {
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
 
   async fetchAskHrRequest(email){
     
     let data = JSON.stringify({
       useremail: email
     });
 
     const loader = this.loadingCtrl.create({
       message: "Please wait..."
     });
     (await loader).present();
 
     this.authService.postData(data, "ask_hr_request").then(async data => {
          console.log(data);
       
         if (data["status"] == "success") {
 
           if(data["ask_hr_request_list"]!="[]"){
               this.hr_request=JSON.parse(data["ask_hr_request_list"]);
           }
           this.home = "suggestion";
         } else {
           const alert = this.alertCtrl.create({
             header: "Error",
             message: data["msg"],
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
           message: err,
           buttons: ["OK"]
         });
         (await alert).present();
         console.log(err);
         (await loader).dismiss();
       }
     );
 }
 
 fetch_queries(req_id,status,status_by_userid,query_type)
 {
   this.navCtrl.navigateForward([AskHrQueriesPage,{request_id:req_id,status:status,status_by_userid:status_by_userid,query_type:query_type}])
 }
 
 // add_new()
 // {
 //   this.openModal();
 // }
 
 async openModal() {

    const myModal = await this.modalCtrl.create({component:AskHrFormPage,backdropDismiss: true, componentProps:{ query_type: this.home, page_type:'' }});

   (await myModal).present();

   myModal.onDidDismiss().then((data) => {
    console.log("I have dismissed.");
    this.fetchAskHrRequest(this.useremail);
   });
 
   myModal.onWillDismiss().then((data) => {
     console.log("I'm about to dismiss");
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
  ngOnInit() {
  }
}
