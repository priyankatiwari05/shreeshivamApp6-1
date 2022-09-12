import { Component } from '@angular/core';
import { NavController, NavParams,
  AlertController,
  LoadingController} from 'ionic-angular';
  import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the RaisedRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-raised-request',
  templateUrl: 'raised-request.html',
})
export class RaisedRequestPage {
  raised_requests:any;
  constructor(  public navCtrl: NavController,
    public storage: Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams) {

      this.storage.get('emp_id').then((val1) => {
        this.fetchRequestDetails(val1);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RaisedRequestPage');

  }

    fetchRequestDetails(emp_id){

        console.log(emp_id);
        let data = JSON.stringify({
          emp_id: emp_id
        });

        const loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();

        this.authService.postData(data, "get_raised_request").then(
          result => {
          let  responseData = result;
            let data = JSON.parse(responseData["_body"]);
           // console.log(responseData);
            console.log(data);
            if (data["status"] == "success") {

              if(data["msg"]!="[]"){
                  this.raised_requests=data["msg"];

                console.log(this.raised_requests);

              }

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


}
