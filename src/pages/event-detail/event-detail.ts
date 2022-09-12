import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, ModalOptions, Modal, ModalController } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { Storage } from '@ionic/storage';
import { AskHrFormPage } from '../ask-hr-form/ask-hr-form';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  base_path = GlobalVarsProvider.base_path;
  title:any;
  description:any;
  photo:any;
  is_gallery:any;
  page_type: any;
  gallery_id: any;
  gallerypics: any;
  constructor(public navCtrl: NavController,  private photoViewer: PhotoViewer,
    public navParams: NavParams,public viewCtrl:ViewController,
     public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    private modal: ModalController) {
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad EventDetailPage');
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter EventDetailPage');
    this.title=this.navParams.get('title');
    this.description=this.navParams.get('description');
    this.photo=this.navParams.get('photo');
    this.page_type=this.navParams.get('page_type');
    if(this.page_type=='show_gallery')
    {
      this.gallery_id=this.navParams.get('gallery_id');
      this.fetchGalleryPics();
    }
    
    // if(this.photo.length==0){
    //   this.is_gallery=false;
    // }else{
    //   this.is_gallery=true;
    // };

  }
  open_img(url){
    this.photoViewer.show(url, 'Events Pic', {share: false});
  }

  open_img_1(url,path){
    this.photoViewer.show(url, path, {share: false});
  }
  
  fetchGalleryPics()
  {
    console.log('inside fetchGalleryPics function');
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({id:this.gallery_id});
    console.log(data);
    this.authService.postData(data,"get_gallery_pics").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.gallerypics=data['gallerypics'];
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
        loader.dismiss();
      },
      err => {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
        loader.dismiss();
      }
    );
  }

  addnew()
  {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
  
    const myModal: Modal = this.modal.create(AskHrFormPage, { page_type: 'add_gallery_pic',gallery_id:this.gallery_id }, myModalOptions);
  
    myModal.present();
  
    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      this.fetchGalleryPics();
    });
  
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      // console.log(data);
    });
  }
}
