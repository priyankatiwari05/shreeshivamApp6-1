import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController} from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service'; 
import { Storage } from '@ionic/storage-angular'; 

@Component({
  selector: 'app-appraisal-details',
  templateUrl: './appraisal-details.page.html',
  styleUrls: ['./appraisal-details.page.scss'],
})
export class AppraisalDetailsPage implements OnInit {
  emp_id:any;
  month_arr=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  wrt_1:any;
  wrt_2:any;
  wrt_3:any;
  wrt_4:any;
  wrt_5:any;
  wrt_6:any;
  fsop:any;
  ch:any;
  fa:any;
  eng:any;
  apd:any;
  gro:any;
  vm:any;
  lnd:any;
  ir:any;
  wrt_1_remark:any;
  wrt_2_remark:any;
  wrt_3_remark:any;
  wrt_4_remark:any;
  wrt_5_remark:any;
  wrt_6_remark:any;
  fsop_remark:any;
  ch_remark:any;
  fa_remark:any;
  eng_remark:any;
  apd_remark:any;
  gro_remark:any;
  vm_remark:any;
  lnd_remark:any;
  ir_remark:any;
  appraisal: any;
  month:any;
  year:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController) {

      this.storage.get('emp_id').then(val=>{
        this.emp_id=val;
      });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AppraisalDetailsPage');
    this.appraisal = this.navParams.get('appraisal');
    this.wrt_1=this.appraisal['wrt_1'];
    this.wrt_2=this.appraisal['wrt_2'];
    this.wrt_3=this.appraisal['wrt_3'];
    this.wrt_4=this.appraisal['wrt_4'];
    this.wrt_5=this.appraisal['wrt_5'];
    this.wrt_6=this.appraisal['wrt_6'];
    this.fsop=this.appraisal['fsop'];
    this.ch=this.appraisal['ch'];
    this.fa=this.appraisal['fa'];
    this.eng=this.appraisal['eng'];
    this.apd=this.appraisal['apd'];
    this.gro=this.appraisal['gro'];
    this.vm=this.appraisal['vm'];
    this.lnd=this.appraisal['lnd'];
    this.ir=this.appraisal['ir'];

    let remark = JSON.parse(this.appraisal['remark']);

    this.wrt_1_remark=remark['wrt_1'];
    this.wrt_2_remark=remark['wrt_2'];
    this.wrt_3_remark=remark['wrt_3'];
    this.wrt_4_remark=remark['wrt_4'];
    this.wrt_5_remark=remark['wrt_5'];
    this.wrt_6_remark=remark['wrt_6'];
    this.fsop_remark=remark['fsop'];
    this.ch_remark=remark['ch'];
    this.fa_remark=remark['fa'];
    this.eng_remark=remark['eng'];
    this.apd_remark=remark['apd'];
    this.gro_remark=remark['gro'];
    this.vm_remark=remark['vm'];
    this.lnd_remark=remark['lnd'];
    this.ir_remark=remark['ir'];

    this.month=this.month_arr[this.appraisal['month']-1]
    this.year=this.appraisal['year'];
  }
  ngOnInit() {
  }

}
