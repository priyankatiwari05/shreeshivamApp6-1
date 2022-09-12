import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController, ModalOptions, Modal } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { EventDetailPage } from '../event-detail/event-detail';
import { AddEventPage } from '../add-event/add-event';
import { CreateEventPage } from '../create-event/create-event';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  home:String='upcoming';
  upcoming_event: any;
  closed_event: any;
  base_path = GlobalVarsProvider.base_path;
  role: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    private modal: ModalController
  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }
  ionViewWillEnter()
  {
    this.fetchEvents();
    this.storage.get('role').then(val=>{
      this.role=val;
    })
  }
  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.fetchEvents();
        refresher.complete();
        setTimeout(() => {
          console.log('Async operation has ended');

        }, 2000);
  }
  fetchEvents()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.authService.getData("get_events").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.upcoming_event=data['upcoming_events'];
          this.closed_event=data['closed_events'];
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

  openModal(title,description,photo) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
    console.log(title)
    console.log(description)
    console.log(photo)
    const myModal: Modal = this.modal.create(EventDetailPage, { description: description, title: title, photo: photo, page_type:'events' }, myModalOptions);
    myModal.present();

    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      this.ionViewWillEnter();
    });

    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
    });

  }

  upload_pic(event_id) {
    // const myModalOptions: ModalOptions = {
    //   enableBackdropDismiss: true
    // };

    // const myModal: Modal = this.modal.create(CreateEventPage, { event_id: event_id, page_type:'add_pics' }, myModalOptions);
    // myModal.present();

    // myModal.onDidDismiss((data) => {
    //   console.log("I have dismissed.");
    //   this.ionViewWillEnter();
    // });

    // myModal.onWillDismiss((data) => {
    //   console.log("I'm about to dismiss");
    // });
    console.log({ event_id: event_id, page_type:'add_pics' })
    this.navCtrl.push(CreateEventPage,{ event_id: event_id, page_type:'add_pics' })

  }

  openAddPage() {
    console.log('inside openAddPage')
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
    
    const myModal: Modal = this.modal.create(AddEventPage, { page_type: 'event' }, myModalOptions);
  
    myModal.present();
  
    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      this.fetchEvents();
      // console.log(data);
    });
  
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      // console.log(data);
    });
  
  }

  create_event() {
    this.navCtrl.push(CreateEventPage,{page_type:'create_event'});
  }

}
