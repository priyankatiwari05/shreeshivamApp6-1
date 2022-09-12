import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController} from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { Storage } from '@ionic/storage-angular';
import { AppraisalDetailsPage } from '../appraisal-details/appraisal-details.page'; 

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.page.html',
  styleUrls: ['./appraisal.page.scss'],
})
export class AppraisalPage implements OnInit {
  emp_id:any;
  appraisals=[];
  month_arr=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  constructor(public navCtrl: NavController,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController){
      
      this.storage.get('emp_id').then(val=>{
        this.emp_id=val;
      });
  
      this.fetchAppraisals();
  }

  async fetchAppraisals()
  {
    let data = JSON.stringify({
      emp_id: this.emp_id
    });

    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    this.authService.postData(data, "fetch_appraisals").then(async (result) => {
      let data = result;
      console.log(data);
      
        if (data["status"] == "success") {
          this.appraisals=data["appraisals"];
          console.log(this.appraisals); 
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            message: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
        }
        (await loader).dismiss();
      },
      async err => {
        const alert = this.alertCtrl.create({
          header: "Error",
          message: err,
          buttons: ["OK"]
        });
        (await alert).present();
        console.log(err);
        (await loader).dismiss();
      }
    );
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.fetchAppraisals();
    refresher.complete();
  }

  showdetail(index)
  {
    let appr = this.appraisals[index];

    this.navCtrl.navigateRoot([AppraisalDetailsPage,{appraisal:appr}]);
    
  }
  ngOnInit() {
  }
}
