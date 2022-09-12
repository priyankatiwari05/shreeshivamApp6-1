import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { GlobalVarsProvider } from '../providers/global-vars/global-vars';
import { AuthserviceProvider } from '../providers/authservice/authservice';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform,
    public storage: Storage,
     statusBar: StatusBar, 
     splashScreen: SplashScreen,
     public authService: AuthserviceProvider,
     public alertCtrl: AlertController,
     ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#940029');
      //statusBar.styleDefault();
      splashScreen.hide();

      this.authService.getData('get_latest_version').then((result) =>  {
        let responseData = result; 
        let data = JSON.parse(responseData['_body']);
        if(data['status']=='success')
        {
          var appversion = parseInt(GlobalVarsProvider.appversion.replace('.','').replace('.',''));
          var latestversion = parseInt(data['latest_version'].replace('.','').replace('.',''));
          console.log(appversion%10);
          console.log(appversion%100);
          console.log(appversion%1000);
          if(appversion%1000<latestversion%1000)
          {
            this.storage.clear();
            this.rootPage = LoginPage;
            const alert = this.alertCtrl.create({
              title: 'New version available',
              subTitle: 'You are using '+GlobalVarsProvider.appversion+' version. <a href="'+GlobalVarsProvider.appurl+'" >please update with latest version '+data['latest_version']+'</a>',
              buttons: ['OK'],
            });
            alert.present();
          }
        }
      },(err)=>{
        console.log(err);
      });

      this.storage.get('emp_id').then((val) => {
        if (val != null)
          this.rootPage = MenuPage;
        else
          this.rootPage = LoginPage;
      });
    });
  }
}

