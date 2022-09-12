import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, LoadingController, ModalController, ViewController } from 'ionic-angular';
import { isNumeric } from 'rxjs/util/isNumeric';
import { Base64 } from '@ionic-native/base64';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
/**
 * Generated class for the TravelDocModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-travel-doc-modal',
  templateUrl: 'travel-doc-modal.html',
})
export class TravelDocModalPage {
  description:any;
  amount:any;
  filename:any;
  file:File;
  base64data:any;
  order_id:any;
  responseData:any;
  cgst:any;
  sgst:any;
  igst:any;
  gst_no:any;
  total_amount: any;

  constructor(public navCtrl: NavController,
    public alertCtrl : AlertController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public base64: Base64,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController,
    public authService: AuthserviceProvider,
    public navParams: NavParams) {
      this.order_id=navParams.get('order_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelDocModalPage');
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
    //     title: 'Error',
    //     subTitle: err,
    //     buttons: ['OK'],
    //   });
    //   alert.present();
    //
    // });
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64data = btoa(binaryString);  // Converting binary string data.
    //
  }
  submitdata() 
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
        title: 'Error',
        subTitle: 'Amount, CGST, SCST, or IGST , File, GST No and Description fields are required',
        buttons: ['OK'],
      });
      alert.present();
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
          title: 'Error',
          subTitle: 'Amount, CGST, SCST, and IGST can only be in integer or decimal format',
          buttons: ['OK'],
        });
        alert.present();
      }

      if(validate)
        this.submittoserver();
    }
  }
  
  submittoserver()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

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

    this.authService.postData(postdata,'upload_reimbursement_docs/submit').then((result) => {

      this.responseData = result;
      let data = JSON.parse(this.responseData['_body']);
      loader.dismiss();
      if(data['status']=='success')
      {
        const alert = this.alertCtrl.create({
          title: 'Successfull',
          subTitle: 'Your travel document is submitted successfully',
          buttons: ['OK'],
        });
        alert.present();
        console.log(data["msg"]);
        this.navCtrl.pop();
      }
      else
      {
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: data['msg'],
          buttons: ['OK'],
        });
        alert.present();
      }

    }, (err) => {

      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Process Failed',
        subTitle: err,
        buttons: ['OK']
      });
      alert.present();
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
}
