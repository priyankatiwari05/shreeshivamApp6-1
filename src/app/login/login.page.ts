import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Push, PushObject, PushOptions } from '@awesome-cordova-plugins/push/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {  MenuController, AlertController, LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AuthService } from '../services/auth/auth.service';
import { GlobalVarsService } from '../services/global-vars/global-vars.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public type = "password";
  public showPass = false;
  username: string;
  password: string;
  rememberme: Boolean=false;
  companies: any;
  company_code = '';
  err_msg:string="";
  calllogin: boolean;
  constructor(
    public push: Push,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public statusBar: StatusBar,
    public authService: AuthService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public router : Router
     ) {
      // this.username = navParams.get('email');
      this.statusBar.backgroundColorByHexString("#e1e1e1");
      this.storage.get("emp_id").then(val => {
        if (val != null) this.router.navigate(['/home']);
      });



      // this.authService.getData('get_latest_version').then((data) =>  {
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
      //       (await alert).present();
      //     }
      //   }
      // },(err)=>{
      //   console.log(err);
      // });
  }

  ionViewDidEnter() {
    this.menuCtrl.swipeGesture(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.swipeGesture(true);
  }
  async ionViewWillEnter() {
    await this.storage.get("emp_id").then(val => {
      if (val != null) this.router.navigate(['/home']);
    });
    await this.storage.get('prefill_username').then((val)=>{
      console.log(val+" prefill_username")
      if(val!=null && val!='')
      {
        this.rememberme=true;
        this.username=val;
      }
    });
    await this.storage.get('prefill_password').then((val1)=>{
      console.log(val1+" prefill_password")
      if(val1!=null && val1!='')
      {
        this.rememberme=true;
        this.password=val1;
      }
    })
  }

  isempty() {
    if (this.username == undefined || this.username == null || this.username == ''){
      this.err_msg="required fields are empty";
      return true;
    }
    if (this.password == undefined || this.password == null || this.password == ''){
      this.err_msg="required fields are empty";
      return true;
    }
    this.err_msg="";
    return false;
  }

  async login() {
    this.calllogin = true;
    if (
      this.username == null ||
      this.username == "" ||
      this.password == null ||
      this.password == ""
    ) {
      this.calllogin = false;
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: "Please enter username and password.",
        buttons: ["OK"]
      });

      (await alert).present();
    }
    else
    {
      const loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();
      var appversion = GlobalVarsService.appversion;
      let credential = JSON.stringify({
        email: this.username,
        password: this.password,
        app_version:appversion
      });
      if(this.rememberme==true)
      {
        console.log("inside true");
        console.log('username => ',this.username);
        console.log('password => ',this.password);
        this.storage.set('prefill_username',this.username);
        this.storage.set('prefill_password',this.password);
      }
      // else
      // {
      //   this.storage.set('prefill_username',null);
      //   this.storage.set('prefill_password',null);
      // }
      console.log(credential);
      this.authService.postData(credential, "login2").then(async data => {
          console.log('data : ',data);
          if (data["status"] == "success") {
            let date = new Date();
            // let formatedDate = date.toISOString().substring(0, 10);
            //this.storage.set("storage_date", formatedDate);

            let keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
              if (keys[i] != "status") {
                this.storage.set(keys[i], data[keys[i]]);
              }
              if (keys[i] == "branch") {
                this.storage.set('active_branch', [data[keys[i]][0]])
              }
            }
           // this.pushSetup();
           this.router.navigate(['/home']);
           (await loader).dismiss();

          } else {
            const alert = this.alertCtrl.create({
              header: "Error",
              subHeader: data["msg"],
              buttons: ["OK"]
            });
            (await loader).dismiss();
            (await alert).present();
            console.log("Login Failed");
          }
        },
        async err => {
          console.log(err);
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: err,
            buttons: ["OK"]
          });
          (await loader).dismiss();
          (await alert).present();
        }
      );
      (await loader).dismiss();
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
      this.authService.postData(credential, 'update_registration_id').then((data) => {
        console.log(data["msg"]);
      }, async (err) => {
        const alert = this.alertCtrl.create({
          header: 'Error',
          subHeader: 'Something went wrong. Try again later',
          buttons: ['OK'],
        });
        (await alert).present();
      });
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
  ngOnInit() {
  }

}
