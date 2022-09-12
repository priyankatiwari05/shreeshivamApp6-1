import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, LoadingController} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { File } from "@awesome-cordova-plugins/file/ngx";
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { DocumentViewer, DocumentViewerOptions } from "@awesome-cordova-plugins/document-viewer/ngx";
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { LDPage } from "../l-d/l-d.page";
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-l-d-admin',
  templateUrl: './l-d-admin.page.html',
  styleUrls: ['./l-d-admin.page.scss'],
})
export class LDAdminPage implements OnInit {
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
    public authService: AuthService,) {
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

  async get_l_n_d(desig,desig_id)
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({designation:desig,designation_id:desig_id});
    this.authService.postData(data,"get_l_n_d").then(
      async result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.l_n_d=data['all_designation_lnd'];
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

  openlndpage(l_n_d)
  {
    this.navCtrl.navigateRoot([LDPage,{l_n_d:l_n_d}]);
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
  ngOnInit() {
  }
}
