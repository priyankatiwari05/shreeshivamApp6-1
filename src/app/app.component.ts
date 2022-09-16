import { Component } from '@angular/core'; 
import { Platform, AlertController, NavController } from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { Storage } from '@ionic/storage-angular'; 
import { GlobalVarsService } from './services/global-vars/global-vars.service'; 
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { AuthService } from './services/auth/auth.service';
// import { MenuPage } from './menu/menu.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  rootPage:any;
  app_version: any;

  constructor(platform: Platform,
    public storage: Storage,
    public statusBar: StatusBar, 
    public  splashScreen: SplashScreen,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public appVersion : AppVersion,
    public navCtrl: NavController
   ) {
    platform.ready().then(() => {
        this.appVersion.getVersionNumber().then((version) => {
            this.app_version = version;
          });
          // this.rootPage = LoginPage;
          statusBar.backgroundColorByHexString('#940029');
          statusBar.styleDefault();
          splashScreen.hide();
    
        this.authService.getData('get_latest_version').then(async (result) =>  {
            // let responseData = result;
            // let data = JSON.parse(responseData['_body']);
            let data = result; 
            console.log('Get Data', data);
            console.log('app_version => ' , this.appVersion);
            console.log(this.appVersion.getVersionNumber());

            if(data['status']=='success')
            {
            var appversion = parseInt(this.app_version.replace('.','').replace('.',''));
            var latestversion = parseInt(data['latest_version'].replace('.','').replace('.',''));
            console.log(appversion%10);
            console.log(appversion%100);
            console.log(appversion%1000);
            if(appversion%1000<latestversion%1000)
            {
                this.storage.clear();
                // this.rootPage = LoginPage;
                const alert = this.alertCtrl.create({
                header: 'New version available',
                subHeader: 'You are using '+this.app_version+' version. <a href="'+GlobalVarsService.appurl+'" >please update with latest version '+data['latest_version']+'</a>',
                buttons: ['OK'],
                });
                (await alert).present();
            }
            }
        },(err)=>{
            console.log(err);
        });

        this.storage.get('emp_id').then((val) => {
            if (val != null)
              this.navCtrl.navigateRoot('/home');
          else
              this.navCtrl.navigateRoot('/login');
        });
    });
  }

  async ngOnInit() {
    await this.storage.create();
  }
}
