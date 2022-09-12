import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController, ModalOptions, Modal } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { EventDetailPage } from '../event-detail/event-detail';
import { AskHrFormPage } from '../ask-hr-form/ask-hr-form';


@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  base_path = GlobalVarsProvider.base_path;
  gallery: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    private modal: ModalController) {
  }

  ionViewWillEnter()
  {
    this.fetchGallery();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.fetchGallery();
        refresher.complete();
        setTimeout(() => {
          console.log('Async operation has ended');

        }, 2000);
  }
  fetchGallery()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.authService.getData("get_gallery").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.gallery=data['gallery'];
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

  openModal() {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
  
    // const myModalData = {
    //   query_type: this.home
    // };
  
    const myModal: Modal = this.modal.create(AskHrFormPage, { page_type: 'gallery' }, myModalOptions);
  
    myModal.present();
  
    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      this.fetchGallery()
    });
  
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      // console.log(data);
    });
  
  }

  showgallery(id,title,description,from_date,to_date) {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
  
    // const myModalData = {
    //   query_type: this.home
    // };
    console.log('inside showgallery function');
    
    const myModal: Modal = this.modal.create(EventDetailPage, { page_type: 'show_gallery',gallery_id:id,title:title,description:description,from_date:from_date,to_date:to_date }, myModalOptions);
  
    myModal.present();
  
    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      this.fetchGallery()
    });
  
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      // console.log(data);
    });
  
  }


}
