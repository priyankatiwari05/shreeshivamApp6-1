import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, LoadingController, ModalOptions } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { EventDetailPage } from '../event-detail/event-detail.page';
import { GlobalVarsService } from '../services/global-vars/global-vars.service';
import { AuthService } from '../services/auth/auth.service';
import { AskHrFormPage } from '../ask-hr-form/ask-hr-form.page';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  base_path = GlobalVarsService.base_path;
  gallery: any;
  constructor(public navCtrl: NavController,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    private modal: ModalController) {
      this.fetchGallery();
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.fetchGallery();
        refresher.complete();
        setTimeout(() => {
          console.log('Async operation has ended');

        }, 1000);
  }
  async fetchGallery()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    this.authService.getData("get_gallery").then(async data => {
        console.log(data);

        if (data["status"] == "success") {
          this.gallery=data['gallery'];
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

  async openModal() {
    const myModal = await this.modal.create({component:AskHrFormPage, backdropDismiss: true, componentProps:{ page_type: 'gallery' }});

    (await myModal).present();
  
    myModal.onDidDismiss().then((data) => {
      console.log("I have dismissed.");
      this.fetchGallery()
    });
  
    myModal.onWillDismiss().then((data) => {
      console.log("I'm about to dismiss");
    });
  
  }

  async showgallery(id,title,description,from_date,to_date) {

    console.log('inside showgallery function');

    const myModal = await this.modal.create({component:EventDetailPage, backdropDismiss: true, componentProps:{ page_type: 'show_gallery',gallery_id:id,title:title,description:description,from_date:from_date,to_date:to_date}});

    (await myModal).present();

    myModal.onDidDismiss().then((data) => {
      console.log("I have dismissed.");
      this.fetchGallery()
    });
  
    myModal.onWillDismiss().then((data) => {
      console.log("I'm about to dismiss");
    });
  }

  ngOnInit() {
  }
}
