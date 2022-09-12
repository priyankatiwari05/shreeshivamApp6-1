import { StatusBar } from "@ionic-native/status-bar";
import { Component } from "@angular/core";
import { NavController, MenuController, AlertController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { MenuPage } from "../menu/menu";
import { LoadingController } from "ionic-angular";
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { GlobalVarsProvider } from "../../providers/global-vars/global-vars";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public type = "password";
  public showPass = false;
  public appversion=GlobalVarsProvider.appversion;
  responseData: any;
  username: string;
  password: string;
  rememberme: Boolean=false;
  constructor(
    public push:Push,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public statusBar: StatusBar,
    public authService: AuthserviceProvider,
    public storage: Storage,
    public alertCtrl: AlertController,
    public navParams: NavParams
     ) {
      // this.username = navParams.get('email');
      this.statusBar.backgroundColorByHexString("#e1e1e1");
      this.storage.get("emp_id").then(val => {
        if (val != null) this.navCtrl.setRoot(MenuPage);
      });



      // this.authService.getData('get_latest_version').then((result) =>  {
      //   this.responseData = result;
      //   let data = JSON.parse(this.responseData['_body']);
      //   if(data['status']=='success')
      //   {
      //     var appversion = (GlobalVarsProvider.appversion.replace('.','').replace('.',''));

      //     console.log(appversion[1]);

      //     var latestversion = (data['latest_version'].replace('.','').replace('.',''));

      //     console.log(latestversion[1]);
      //     if(appversion[1]<latestversion[1])
      //     {
      //       const alert = this.alertCtrl.create({
      //         title: 'New version available',
      //         subTitle: 'You are using '+GlobalVarsProvider.appversion+' version. <a href="'+GlobalVarsProvider.appurl+'" >Please update with latest version '+data['latest_version']+'</a>',
      //         buttons: ['OK'],
      //       });
      //       alert.present();
      //     }
      //   }
      // },(err)=>{
      //   console.log(err);
      // });
  }

  ionViewDidEnter() {
    this.menuCtrl.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.swipeEnable(true);
  }
  ionViewWillEnter() {
    this.storage.get('prefill_username').then((val)=>{
      console.log(val+" prefill_username")
      if(val!=null && val!='')
      {
        this.rememberme=true;
        this.username=val;
      }
    });
    this.storage.get('prefill_password').then((val1)=>{
      console.log(val1+" prefill_password")
      if(val1!=null && val1!='')
      {
        this.rememberme=true;
        this.password=val1;
      }
    })
  }
  login() {
    if (
      this.username == null ||
      this.username == "" ||
      this.password == null ||
      this.password == ""
    ) {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Please enter username and password.",
        buttons: ["OK"]
      });

      alert.present();
    }
    else
    {
      const loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      var appversion = GlobalVarsProvider.appversion;
      let credential = JSON.stringify({
        email: this.username,
        password: this.password,
        app_version:appversion
      });
      if(this.rememberme==true)
      {
        console.log("inside true");
        this.storage.set('prefill_username',this.username);
        this.storage.set('prefill_password',this.password);
      }
      // else
      // {
      //   this.storage.set('prefill_username',null);
      //   this.storage.set('prefill_password',null);
      // }
      this.authService.postData(credential, "login2").then(
        result => {
          this.responseData = result;
          let data = JSON.parse(this.responseData["_body"]);
          console.log(this.responseData);
          //console.log(this.password);
          console.log(data);
          if (data["status"] == "success") {
            let date = new Date();
            // let formatedDate = date.toISOString().substring(0, 10);
            //this.storage.set("storage_date", formatedDate);

            let keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
              if (keys[i] != "status") {
                this.storage.set(keys[i], data[keys[i]]);
              }
            }

            loader.dismissAll();
           // this.pushSetup();
            this.navCtrl.setRoot(MenuPage);

          } else {
            const alert = this.alertCtrl.create({
              title: "Error",
              subTitle: data["msg"],
              buttons: ["OK"]
            });
            loader.dismissAll();
            alert.present();
            console.log("Login Failed");
          }
        },
        err => {
          console.log(err);
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: err,
            buttons: ["OK"]
          });
          loader.dismissAll();
          alert.present();
        }
      );
      loader.dismissAll();
    }
  }

  showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }
  pushSetup() {
    const options: PushOptions = {
      android: {
        senderID: '641043555818',
        forceShow: true,
        sound: true,
        vibrate: true
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => {
      let registration_id = registration.registrationId;
      let credential = JSON.stringify({
        registration_id: registration_id,
        email: this.username
      });
      this.authService.postData(credential, 'update_registration_id').then((result) => {
        this.responseData = result;
        let data = JSON.parse(this.responseData['_body']);
        console.log(data["msg"]);
      }, (err) => {
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Something went wrong. Try again later',
          buttons: ['OK'],
        });
        alert.present();
      });
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

}
