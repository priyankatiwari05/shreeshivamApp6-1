import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController } from '@ionic/angular'; 
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { Storage } from '@ionic/storage';
import { AskHrFormPage } from '../ask-hr-form/ask-hr-form.page';
import { GlobalVarsService } from '../services/global-vars/global-vars.service';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  base_path = GlobalVarsService.base_path;
  title:any;
  description:any;
  photo:any;
  is_gallery:any;
  page_type: any;
  gallery_id: any;
  gallerypics: any;
  constructor(public navCtrl: NavController,  private photoViewer: PhotoViewer,
    public route: ActivatedRoute,public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    private modal: ModalController,
    public mdlCtrl: ModalController) {

      this.title=this.route.snapshot.paramMap.get('title');
      this.description=this.route.snapshot.paramMap.get('description');
      this.photo=this.route.snapshot.paramMap.get('photo');
      this.page_type = this.route.snapshot.paramMap.get('page_type');
      if(this.page_type=='show_gallery')
      {
        this.gallery_id=this.route.snapshot.paramMap.get('gallery_id');
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
  
  async fetchGalleryPics()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({id:this.gallery_id});
    console.log(data);
    this.authService.postData(data,"get_gallery_pics").then(async data => {
        console.log(data);

        if (data["status"] == "success") {
          this.gallerypics=data['gallerypics'];
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

  async addnew()
  {
    const myModal = await this.modal.create({component:AskHrFormPage,backdropDismiss: true, componentProps:{ page_type: 'add_gallery_pic',gallery_id:this.gallery_id }});
  
    (await myModal).present();
  
    myModal.onDidDismiss().then((data) => {
      console.log("I have dismissed.");
      this.fetchGalleryPics();
    });
  
    myModal.onWillDismiss().then((data) => {
      console.log("I'm about to dismiss");
    });
  }

  ngOnInit() {
  }
}
