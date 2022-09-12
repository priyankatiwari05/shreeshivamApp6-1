import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  Platform
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import { LoadingController } from "ionic-angular";
import { FileTransfer } from "@ionic-native/file-transfer";
import { GlobalVarsProvider } from "../../providers/global-vars/global-vars";
import {
  DocumentViewer,
  DocumentViewerOptions
} from "@ionic-native/document-viewer";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import {
  StreamingMedia,
  StreamingVideoOptions
} from "@ionic-native/streaming-media";
import { LDPage } from "../l-d/l-d";


@Component({
  selector: 'page-l-d-admin',
  templateUrl: 'l-d-admin.html',
})
export class LDAdminPage {
  l_n_d: any;
  emp_id: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private fileOpener: FileOpener,
    private file: File,
    public platform: Platform,
    public transfer: FileTransfer,
    public storage: Storage,
    public alertCtrl: AlertController,
    public authService: AuthserviceProvider,) {
      this.storage.get("emp_id").then(val2 => {
        this.emp_id = val2;
      });
      console.log('inside constructor l n d admin');
      this.storage.get("designation").then(desig => {
        this.storage.get("designation_id").then(desig_id => {
          this.get_l_n_d(desig,desig_id);
        });
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LDAdminPage');
  }

  ionViewWillEnter()
  {
    
    
  }

  get_l_n_d(desig,desig_id)
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({designation:desig,designation_id:desig_id});
    this.authService.postData(data,"get_l_n_d").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.l_n_d=data['all_designation_lnd'];
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

  openlndpage(l_n_d)
  {
    this.navCtrl.push(LDPage,{l_n_d:l_n_d});
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.storage.get("designation").then(desig => {
      this.storage.get("designation_id").then(desig_id => {
        this.get_l_n_d(desig,desig_id);
      });
    });
    refresher.complete();

    setTimeout(() => {
      console.log("Async operation has ended");
    }, 2000);
  }

}
