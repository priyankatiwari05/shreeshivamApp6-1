import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Modal, ModalController, ModalOptions } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { TravelDeskModalPage } from '../travel-desk-modal/travel-desk-modal';

@Component({
  selector: 'page-travel-desk',
  templateUrl: 'travel-desk.html',
})
export class TravelDeskPage {
  emp_id: any;
  role_id: any;
  pending:any;
  booked:any;
  closed: any;
  dataload: boolean;
  home="pending";
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public viewCtrl:ViewController, 
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    private modal: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TraveDeskPage');
  }
  ionViewWillEnter() {
    this.dataload=false;
    if(this.role_id==null)
    {
      this.storage.get('emp_id').then((id)=>{
        this.emp_id=id;
        this.storage.get('role_id').then((role_id)=>{
          this.role_id=role_id;
          this.fetchTraveldesk();
        });
      });
    }
    else
      this.fetchTraveldesk();
    //if(this.todaytasks==null && this.emp_id!=null)
    
      
  }
  fetchTraveldesk() {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({
      emp_id: this.emp_id,
      role_id: this.role_id
    });

    this.authService.postData(data, "get_traveldesk_detail").then(
      result => {
        this.dataload=true;
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        console.log(data);
        if (data["status"] == "success") {
          this.pending=data['pending'];
          this.booked=data['booked'];
          this.closed=data['closed'];         
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
        this.dataload=false;
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

  openModal(item,page)
  {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
    console.log(item);
    const myModal: Modal = this.modal.create(TravelDeskModalPage, { travel_detail: item , type: page }, myModalOptions);
  
    myModal.present();
  
    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      this.fetchTraveldesk();
      console.log(data);
    });
  
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
    });
  }

}
