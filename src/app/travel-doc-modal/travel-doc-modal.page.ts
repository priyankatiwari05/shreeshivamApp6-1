import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, LoadingController, ModalController } from '@ionic/angular';
import { isNumeric } from 'rxjs/util/isNumeric';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-travel-doc-modal',
  templateUrl: './travel-doc-modal.page.html',
  styleUrls: ['./travel-doc-modal.page.scss'],
})
export class TravelDocModalPage implements OnInit {
  description:any;
  amount:any;
  filename:any;
  file:File;
  base64data:any;
  order_id:any;
  cgst:any;
  sgst:any;
  igst:any;
  gst_no:any;
  total_amount: any;

  constructor(public navCtrl: NavController,
    public alertCtrl : AlertController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public modalCtrl:ModalController,
    public authService: AuthService,
    public navParams: NavParams) {
      this.order_id=navParams.get('order_id');
  }

  changeListener($event) : void {

    this.file = $event.target.files;
    var reader = new FileReader();
    this.filename = this.file[0].name;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.file[0]);

    // this.file = $event.target.files[0];
    // if(this.file)
    // {
    //   this.filename = this.file.name;
    // }
    // else
    // {
    //   this.filename='';
    // }
    // this.base64.encodeFile($event.target.files[0]).then((base64File: string) => {
    //   this.base64data = base64File;
    //
    // }, (err) => {
    //   const alert = this.alertCtrl.create({
    //     header: 'Error',
    //     subHeader: err,
    //     buttons: ['OK'],
    //   });
    //   (await alert).present();
    //
    // });
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64data = btoa(binaryString);  // Converting binary string data.
    //
  }
  async submitdata() 
  {
    console.log('inside submitdata');
    if(this.description=='' || this.amount=='' || this.description==null || this.amount==null ||
    ((this.cgst==''  || this.cgst==null || this.sgst=='' || this.sgst==null) && (this.igst==null || this.igst=='')) ||
    this.amount=='' || this.filename=='' || this.amount==null || this.filename==null ||
    this.gst_no=='' || this.gst_no==null
    ) 
    {
      console.log('inside first if');
      const alert = this.alertCtrl.create({
        header: 'Error',
        subHeader: 'Amount, CGST, SCST, or IGST , File, GST No and Description fields are required',
        buttons: ['OK'],
      });
      (await alert).present();
    }
    else
    {
      console.log('inside else');
      let validate=true;
      let regex = /([0-9]*[.]*)?[0-9]*/;
      if(!isNumeric(this.cgst) || !isNumeric(this.sgst) || !isNumeric(this.igst) || !isNumeric(this.amount))
      {
        console.log('inside if of else');
        validate=false;
        const alert = this.alertCtrl.create({
          header: 'Error',
          subHeader: 'Amount, CGST, SCST, and IGST can only be in integer or decimal format',
          buttons: ['OK'],
        });
        (await alert).present();
      }

      if(validate)
        this.submittoserver();
    }
  }
  
  async submittoserver()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    let postdata = JSON.stringify(
    {
      amount:this.amount,
      description:this.description,
      file:this.base64data,
      filename:this.filename,
      tr_id:this.order_id,
      cgst:this.cgst,
      sgst:this.sgst,
      igst:this.igst,
      gst_no:this.gst_no,
      request_type:"api"
    });

    this.authService.postData(postdata,'upload_reimbursement_docs/submit').then(async (data) => {
      (await loader).dismiss();
      if(data['status']=='success')
      {
        const alert = this.alertCtrl.create({
          header: 'Successfull',
          subHeader: 'Your travel document is submitted successfully',
          buttons: ['OK'],
        });
        (await alert).present();
        console.log(data["msg"]);
        this.navCtrl.pop();
      }
      else
      {
        const alert = this.alertCtrl.create({
          header: 'Error',
          subHeader: data['msg'],
          buttons: ['OK'],
        });
        (await alert).present();
      }

    }, async (err) => {

      (await loader).dismiss();
      let alert = this.alertCtrl.create({
        header: 'Process Failed',
        subHeader: err,
        buttons: ['OK']
      });
      (await alert).present();
    });
  }

  dismiss(){
    this.navCtrl.pop();
  }

  // cal_tot()
  // {
  //   this.total_amount=0;
  //   // let cgst = this.cgst;
  //   // let sgst = this.sgst;
  //   // let igst = this.igst;
  //   // let amount = this.amount;
  //   if(this.igst!=null && this.igst!='')
  //   {
  //     if(this.amount!=null)
  //     {
  //       this.total_amount=parseInt(this.amount)+parseInt(this.igst);
  //     }
  //     else
  //     {
  //       if(this.amount!='' && this.amount!=null)
  //       {
  //         this.total_amount+=parseInt(this.amount);
  //       }
  //       if(this.igst!='' && this.igst!=null)
  //       {
  //         this.total_amount+=parseInt(this.igst);
  //       }
  //       if(this.sgst!='' && this.sgst!=null)
  //       {
  //         this.total_amount+=parseInt(this.sgst);
  //       }
  //     }
  //   }
  // }
  ngOnInit() {
  }

}