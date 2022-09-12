import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, LoadingController, ModalOptions } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { EventDetailPage } from '../event-detail/event-detail.page';
import { AddEventPage } from '../add-event/add-event.page'; 
import { CreateEventPage } from '../create-event/create-event.page';
import { GlobalVarsService } from '../services/global-vars/global-vars.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  home:String='upcoming';
  upcoming_event: any;
  closed_event: any;
  base_path = GlobalVarsService.base_path;
  role: any;
  constructor(
    public navCtrl: NavController,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    private modal: ModalController
  ) {
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
  async fetchEvents()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    this.authService.getData("get_events").then(async result => {
        let data = result;
        console.log(data);

        if (data["status"] == "success") {
          this.upcoming_event=data['upcoming_events'];
          this.closed_event=data['closed_events'];
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

  async openModal(title,description,photo) {
    const myModal = await this.modal.create({component:EventDetailPage,backdropDismiss: true, componentProps:{ description: description, title: title, photo: photo, page_type:'events' }});

    (await myModal).present();

    myModal.onDidDismiss().then((data) => {
      console.log("I have dismissed.");
      this.ionViewWillEnter();
    });

    myModal.onWillDismiss().then((data) => {
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
    this.navCtrl.navigateForward([CreateEventPage,{ event_id: event_id, page_type:'add_pics' }])

  }

  async openAddPage() {
    console.log('inside openAddPage')
    const myModal = await this.modal.create({component:AddEventPage,backdropDismiss: true, componentProps:{ page_type: 'event' }});
  
    (await myModal).present();
  
    myModal.onDidDismiss().then((data) => {
      console.log("I have dismissed.");
      this.fetchEvents();
    });
  
    myModal.onWillDismiss().then((data) => {
      console.log("I'm about to dismiss");
    });
  
  }

  create_event() {
    this.navCtrl.navigateForward(['/create-event',{page_type:'create_event'}]);
  }
  ngOnInit() {
  }
}
