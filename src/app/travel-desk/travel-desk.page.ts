import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ModalOptions } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth/auth.service';
import { TravelDeskModalPage } from '../travel-desk-modal/travel-desk-modal.page';

@Component({
  selector: 'app-travel-desk',
  templateUrl: './travel-desk.page.html',
  styleUrls: ['./travel-desk.page.scss'],
})
export class TravelDeskPage implements OnInit {
  emp_id: any;
  role_id: any;
  pending:any;
  booked:any;
  closed: any;
  dataload: boolean;
  home="pending";
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    private modal: ModalController) {

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

  async fetchTraveldesk() {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({
      emp_id: this.emp_id,
      role_id: this.role_id
    });

    this.authService.postData(data, "get_traveldesk_detail").then(async data => {
        this.dataload=true;
        console.log(data);
        if (data["status"] == "success") {
          this.pending=data['pending'];
          this.booked=data['booked'];
          this.closed=data['closed'];         
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
        this.dataload=false;
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

  async openModal(item,page)
  {
    console.log(item);
    const myModal = await this.modal.create({component:TravelDeskModalPage,backdropDismiss: true, componentProps:{ travel_detail: item , type: page }});
  
    (await myModal).present();
    myModal.onDidDismiss().then((data) => {
      console.log("I have dismissed.");
      this.fetchTraveldesk();
      console.log(data);
    });
  
    myModal.onWillDismiss().then((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
    });
  }
  ngOnInit() {
  }
}