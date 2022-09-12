import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Modal, ModalController, ModalOptions } from 'ionic-angular';
import { TravelReimbersmentModalPage } from '../travel-reimbersment-modal/travel-reimbersment-modal';

/**
 * Generated class for the TravelEntitlementModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-travel-entitlement-modal',
  templateUrl: 'travel-entitlement-modal.html',
})
export class TravelEntitlementModalPage {
  variablename:any;
  date:any=new Date().toISOString().slice(0, 10);page_type: any;
  mainvalue: any=[];
;
  inv_serial_no:any;
  vendor_name:any;
  vendor_gst:any;
  basic_amount:any=0;
  jsonvalue:any=[];
  file_input:any;
  data_list:any=[];
  cgst_amount:any=0;
  sgst_amount:any=0;
  igst_amount:any=0;
  igst_applicable:boolean=false;
  total_amount:any=0;
  filename: String;
  base64data: any;
  file: File;

  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
    public viewCtrl:ViewController, public modal:ModalController) {
  }

  ionViewWillEnter()
  {
    this.variablename=this.navParams.get('variablename');
    this.page_type=this.navParams.get('page_type');
     
    if(this.page_type=='main')
    {
      if(this.navParams.get('mainvalue')!=null && this.navParams.get('mainvalue')!='')
        this.mainvalue=JSON.parse(this.navParams.get('mainvalue'));
    }
    else
    {
      if(this.navParams.get('jsonvalue')!='' && this.navParams.get('jsonvalue')!=null)
      {
        this.jsonvalue=JSON.parse(this.navParams.get('jsonvalue'));
      
        console.log('inside if condition')
        this.date=this.jsonvalue.date;
        this.inv_serial_no=this.jsonvalue.inv_serial_no;
        this.vendor_name=this.jsonvalue.vendor_name;
        this.vendor_gst=this.jsonvalue.vendor_gst;
        this.data_list=this.jsonvalue.file_list;
        this.file=this.jsonvalue.file;
        this.filename=this.jsonvalue.filename;
        this.basic_amount=this.jsonvalue.basic_amount;
        this.cgst_amount=this.jsonvalue.cgst_amount;
        this.sgst_amount=this.jsonvalue.sgst_amount;
        this.igst_amount=this.jsonvalue.igst_amount;
        this.igst_applicable=this.jsonvalue.igst_applicable;
        this.total_amount=this.jsonvalue.total_amount;
      }
    }
  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad TravelEntitlementModalPage');
  }

  changeListener($event): void {
    this.file = $event.target.files;
    var reader = new FileReader();
    this.filename = this.file[0].name;
    reader.onload = this._handleReaderLoaded.bind(this);

    reader.readAsBinaryString(this.file[0]);


  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64data = btoa(binaryString); // Converting binary string data.

  }
  add_to_list() {

    this.data_list.push({
      filename: this.filename,
      file: this.base64data,
      //remark: this.remark
    });
    console.log(this.data_list);
    this.filename=null;
    this.base64data=null;
    //this.remark=null;
    this.file_input="";
  }
  delete_id_list(id) {

    let updated_list=[] ;

    for(let i=0;i<this.data_list.length;i++){
      if(i!=id){
        updated_list.push({
          filename: this.data_list[i]['filename'],
          file: this.data_list[i]['file'],
          remark: this.data_list[i]['remark']
        });
      }
    }
    this.data_list=updated_list;
  }

  add_to_json()
  {
    var myjsonobject = JSON.stringify({
      date:this.date,
      inv_serial_no:this.inv_serial_no,
      vendor_name:this.vendor_name,
      vendor_gst:this.vendor_gst,
      basic_amount:this.basic_amount,
      filename:this.filename,
      file:this.base64data,
      cgst_amount:this.cgst_amount,
      sgst_amount:this.sgst_amount,
      igst_applicable:this.igst_applicable,
      igst_amount:this.igst_amount,
      total_amount:this.total_amount
    });
    console.log(myjsonobject);
    this.viewCtrl.dismiss(myjsonobject,'submit');
  }

  
  findsum()
  {
    let cgst =0,igst=0,sgst=0,basic=0;
    if(this.cgst_amount!=null && this.cgst_amount!='')
    cgst=parseInt(this.cgst_amount)
    if(this.sgst_amount!=null && this.sgst_amount!='')
    sgst=parseInt(this.sgst_amount)
    if(this.igst_amount!=null && this.igst_amount!='')
    igst=parseInt(this.igst_amount)
    if(this.basic_amount!=null && this.basic_amount!='')
    basic=parseInt(this.basic_amount)
    this.total_amount=cgst+sgst+igst+basic;
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.ionViewWillEnter();
    refresher.complete();

    setTimeout(() => {
      console.log("Async operation has ended");
    }, 2000);
  }

  delete_from_main(i)
  {
    console.log(i);
    let tempjson=[];
    let m=0;
    for(m=0;m<this.mainvalue.length;m++)
    {
      if(m!=i)
      tempjson.push(this.mainvalue[m]);
    }
    if(m==this.mainvalue.length)
      this.mainvalue=tempjson;
  }

  editjson(i)
  {
    var myjsonobject = JSON.stringify({
      date:this.date,
      inv_serial_no:this.mainvalue[i]['inv_serial_no'],
      vendor_name:this.mainvalue[i]['vendor_name'],
      vendor_gst:this.mainvalue[i]['vendor_gst'],
      basic_amount:this.mainvalue[i]['basic_amount'],
      // file_list:this.mainvalue[i]['file_list'],
      filename:this.mainvalue[i]['filename'],
      file:this.mainvalue[i]['file'],
      cgst_amount:this.mainvalue[i]['cgst_amount'],
      sgst_amount:this.mainvalue[i]['sgst_amount'],
      igst_applicable:this.mainvalue[i]['igst_applicable'],
      igst_amount:this.mainvalue[i]['igst_amount'],
      total_amount:this.mainvalue[i]['total_amount']
    });

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
    const myModal: Modal = this.modal.create(TravelEntitlementModalPage, {page_type:'form', jsonvalue:myjsonobject, variablename:this.variablename }, myModalOptions);
  
    myModal.present();

    myModal.onDidDismiss((data,type) => {
      console.log(data);
      if(data!=null && data!='' && type=='submit')
        this.mainvalue[i] = JSON.parse(data);
        console.log(this.mainvalue)
      console.log('inside onDidDismiss')
    });

  }

  addnew()
  {
    // this.navCtrl.push(TravelReimbersmentModalPage,{page_type:'form',jsonvalue:null})
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
    const myModal: Modal = this.modal.create(TravelEntitlementModalPage, {page_type:'form',variablename:this.variablename }, myModalOptions);
  
    myModal.present();

    myModal.onDidDismiss((data,type) => {
      console.log(data);
      if(data!=null && data!='' && type=='submit')
        this.mainvalue.push(JSON.parse(data));
        console.log(this.mainvalue)
      console.log('inside onDidDismiss')
    });
  }

  submitjson()
  {
    this.viewCtrl.dismiss(JSON.stringify(this.mainvalue),'submit');
  }

}
