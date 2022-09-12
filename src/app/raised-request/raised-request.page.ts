import { Component, OnInit } from '@angular/core';
import { NavController,AlertController, LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-raised-request',
  templateUrl: './raised-request.page.html',
  styleUrls: ['./raised-request.page.scss'],
})
export class RaisedRequestPage implements OnInit {
  raised_requests:any;
  constructor(  public navCtrl: NavController,
    public storage: Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController) {

      this.storage.get('emp_id').then((val1) => {
        this.fetchRequestDetails(val1);
      });
  }

    async fetchRequestDetails(emp_id){

        console.log(emp_id);
        let data = JSON.stringify({
          emp_id: emp_id
        });

        const loader = this.loadingCtrl.create({
          message: "Please wait..."
        });
        (await loader).present();

        this.authService.postData(data, "get_raised_request").then(async result => {
            let data = result;
            console.log(data);

            if (data["status"] == "success") {

              if(data["msg"]!="[]"){
                this.raised_requests=data["msg"];
                console.log(this.raised_requests);
              }

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

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);


      this.storage.get('emp_id').then((val1) => {
        this.fetchRequestDetails(val1);
        refresher.complete();
        // setTimeout(() => {
        //   console.log('Async operation has ended');

        // }, 2000);
      });
  }

  ngOnInit() {
  }

}