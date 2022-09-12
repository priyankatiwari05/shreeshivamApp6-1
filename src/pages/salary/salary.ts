import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SalaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-salary',
  templateUrl: 'salary.html',
})
export class SalaryPage {
  sal121:any;
  i2:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalaryPage');
    this.storage.get('salary').then((val) => {
     // this.sal121=val;
     
      for(var j=0;j<val.length;j++){
        console.log(val[j]['month'] + "   "+val[j]['net_payable']);
      // console.log();
        if(val[j]['month']=="1"){

          val[j]['month']="January";
        }else if(val[j]['month']=="2"){

          val[j]['month']="February";
        }else if(val[j]['month']=="3"){

          val[j]['month']="March";
        }else if(val[j]['month']=="4"){

          val[j]['month']="April";
        }else if(val[j]['month']=="5"){

          val[j]['month']="May";
        }else if(val[j]['month']=="6"){

          val[j]['month']="June";
        }else if(val[j]['month']=="7"){

          val[j]['month']="July";
        }else if(val[j]['month']=="8"){

          val[j]['month']="August";
        }else if(val[j]['month']=="9"){

          val[j]['month']="September";
        }else if(val[j]['month']=="10"){

          val[j]['month']="October";
        }else if(val[j]['month']=="11"){

          val[j]['month']="November";
        }else if(val[j]['month']=="12"){

          val[j]['month']="December";
        }
      }
      this.sal121=val;
      this.i2=1;
    });
  }

}
