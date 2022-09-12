import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, ToastController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { File } from "@ionic-native/file";
import { TravelReimbersmentModalPage } from '../travel-reimbersment-modal/travel-reimbersment-modal';
import { TravelDocModalPage } from '../travel-doc-modal/travel-doc-modal';

let base_path = GlobalVarsProvider.base_path;

@Component({
  selector: 'page-travel-desk-modal',
  templateUrl: 'travel-desk-modal.html',
})
export class TravelDeskModalPage {
  emp_id: any;
  branch_location_id: any;
  travel_detail: any;
  type: any;
  first_name: any;
  middle_name: any;
  last_name: any;
  status:any;
  approval_status:any;
  reimbursement_status:any;
  travel_reason:any;
  prefer_time:any;
  trip_type:any;
  travel_type:any;
  tr_id:any;
  start_date:any;
  end_date:any;
  origin:any;origin_city:any;
  destination:any;destination_city:any
  remark:any;
  empremark:any;
  mode:any;
  occupancy:any;
  hotel_planning:any;
  hotel_preferred:any;
  express_booking:any;
  travel_booking_id: any;
  booking_for: any;
  role_id: any;
  data_list= [];
  file_remark: any;
  file_input:any;
  filename: string;
  base64data: any;
  org_data_list: any =[];
  travel_docs: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public viewCtrl:ViewController, 
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private file: File,
    private fileOpener: FileOpener,
    public platform: Platform,
    public transfer: FileTransfer,
    public document: DocumentViewer,
    public photoViewer: PhotoViewer,
    public streamingMedia: StreamingMedia) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelDeskModalPage');
  }

  ionViewWillEnter()
  {
    console.log(this.type);console.log(this.status);

    if(this.emp_id==null)
    {
      this.storage.get('emp_id').then((val) => {
        this.emp_id=val;
      });
    }
    if(this.role_id==null)
    {
      this.storage.get('role_id').then((val) => {
        this.role_id=val;
      });
    }
    if(this.branch_location_id==null)
    {
      this.storage.get('branch_location_id').then((val) => {
        this.branch_location_id=val;
      });
    }

    this.travel_detail=this.navParams.get('travel_detail');
    this.type=this.navParams.get('type');
    console.log(this.type);
    this.first_name=this.travel_detail.first_name;
    this.middle_name=this.travel_detail.middle_name;
    this.last_name=this.travel_detail.last_name;
    this.status=this.travel_detail.status;
    if(this.type=='emp_page')
      this.travel_booking_id=this.travel_detail.booking_id;
    else
      this.travel_booking_id=this.travel_detail.id;
    this.remark=this.travel_detail.remark;
    if(this.type=='emp_page')
      this.status=this.travel_detail.travel_booking_status;
    else
      this.status=this.travel_detail.status;
    console.log(this.type);console.log(this.status);
    this.express_booking=this.travel_detail.express_booking;
    this.hotel_planning=this.travel_detail.hotel_planning;
    this.hotel_preferred=this.travel_detail.hotel_preferred;
    this.occupancy=this.travel_detail.occupancy;
    if(this.travel_detail.first_name!=null)
      this.booking_for=this.travel_detail.first_name;
    if(this.travel_detail.middle_name!=null)
      this.booking_for+=" "+this.travel_detail.middle_name;
    if(this.travel_detail.last_name!=null)
      this.booking_for+=" "+this.travel_detail.last_name;
    this.mode=this.travel_detail.mode;
    this.tr_id = this.travel_detail.tr_id;
    this.origin = this.travel_detail.origin_city+" "+this.travel_detail.origin_state;
    this.destination = this.travel_detail.destination_city+" "+this.travel_detail.destination_state;
    this.origin_city=this.travel_detail.origin_city;
    this.destination_city=this.travel_detail.destination_city;
    this.start_date=this.travel_detail.start_date;
    this.end_date=this.travel_detail.end_date;
    this.prefer_time=this.travel_detail.prefer_time;
    this.approval_status=this.travel_detail.approval_status;
    this.reimbursement_status=this.travel_detail.reimbursement_status;
    this.travel_reason=this.travel_detail.reason;
    this.trip_type=this.travel_detail.trip_type;
    this.travel_type=this.travel_detail.travel_type;
    console.log(this.origin_city)
    console.log(this.destination_city)
    // if(this.type=='emp_page')
    //   this.org_data_list=JSON.parse(this.travel_detail.travel_booking_docs);
    // else
      this.get_travel_doc();

      if(this.type=='emp_page')
        this.fetch_docs(this.tr_id);
  }

  get_travel_doc()
  {
    let data = JSON.stringify({tr_id:this.tr_id});
    this.authService.postData(data,'get_travel_doc').then(result=>{
      let data = JSON.parse(result['_body']);
      console.log(data['status']);
      if(data['status']=='success')
      {
        this.org_data_list=data['docs'];
      }
      else{
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: data['msg'],
          buttons: ["OK"]
        });
        alert.present();
      }
    },err => {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Process Failed. Try again later',
        buttons: ["OK"]
      });
      alert.present();
    });
  }

  update(status)
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    console.log(this.data_list);
    let data = JSON.stringify({data_list:this.data_list,status:status,tr_id:this.tr_id,emp_id:this.emp_id});
    this.authService.postData(data,'submit_travel_booking').then(result=>{
      let data = JSON.parse(result['_body']);
      console.log(data['status']);
      if(data['status']=='success')
      {
        const toast = this.toastCtrl.create({
          message: "Booking detail submitted successfully",
          duration: 2000
        });
        toast.present();
        this.viewCtrl.dismiss();
      }
      else{
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: data['msg'],
          buttons: ["OK"]
        });
        alert.present();
      }
      loader.dismissAll();
    },err => {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Process Failed. Try again later',
        buttons: ["OK"]
      });
      alert.present();
      loader.dismissAll();
    });
  }

  updatestatus(status)
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    console.log(this.data_list);
    let data = JSON.stringify({remark:this.empremark,status:status,tr_id:this.tr_id,travel_booking_id:this.travel_booking_id});
    this.authService.postData(data,'updatestatus_travel_booking').then(result=>{
      let data = JSON.parse(result['_body']);
      console.log(data['status']);
      if(data['status']=='success')
      {
        const toast = this.toastCtrl.create({
          message: "Booking status updated successfully",
          duration: 2000
        });
        toast.present();
        this.viewCtrl.dismiss();
      }
      else{
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: data['msg'],
          buttons: ["OK"]
        });
        alert.present();
      }
      loader.dismissAll();
    },err => {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Process Failed. Try again later',
        buttons: ["OK"]
      });
      alert.present();
      loader.dismissAll();
    });
  }

  submit_request(status)
  {
    if(this.data_list.length>0)
    {
      this.update(status);
    }
    else
    {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Please select document before submit.',
        buttons: ["OK"]
      });
      alert.present();
    }
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
      remark: this.file_remark
    });
    console.log(this.data_list);
    this.filename=null;
    this.base64data=null;
    this.file_remark=null;
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

  upload_doc_list(order_id) {
    let data = {
      order_id: order_id
    };
    this.navCtrl.push(TravelReimbersmentModalPage, data);
  }

  upload_doc_modal(){
    let data={
      order_id:this.tr_id
    };
    this.navCtrl.push(TravelDocModalPage,data);
  }

  fetch_docs(order_id){
    // const loader = this.loadingCtrl.create({
    //   content: "Please wait..."
    // });
    // loader.present();

    let data = JSON.stringify({
      tr_id: order_id,

    });
    console.log(data);

    this.authService.postData(data, "upload_reimbursement_docs").then(
      result => {
        let responseData = result;
        let data = JSON.parse(responseData["_body"]);
        /// console.log(responseData);
        console.log(data);
        if (data["status"] == "success") {
          this.travel_docs = data["msg"];
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        }
        // loader.dismissAll();
      },
      err => {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
        // loader.dismissAll();
      }
    );
  }
  
  delete(id,doc_link){
    let data=JSON.stringify({
      id: id,
      doc_link: doc_link,
      tr_id: this.tr_id
    });
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.authService.postData(data, "delete_reimbursement_doc").then(
      result => {
        let responseData = result;
        console.log(responseData);
        let data = JSON.parse(responseData["_body"]);


        console.log(data);
        if (data["status"] == "success") {
          const alert = this.alertCtrl.create({
            title: "Success",
            subTitle: "Document Deleted successfully",
            buttons: ["OK"]
          });
          loader.dismissAll();
          alert.present();
          console.log(data["msg"]);
          this.fetch_docs(this.tr_id);
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: "Process failed, please try after sometime.",
            buttons: ["OK"]
          });
          loader.dismissAll();
          alert.present();
          console.log(data["msg"]);
        }
      },
      err => {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: "Process failed, please try after sometime.",
          buttons: ["OK"]
        });
        loader.dismissAll();
        alert.present();
        console.log(err);
      }
    );

  }

  show_detail(index)
  {
    console.log(index)
    console.log(this.travel_docs[index])
    let msg =  "<ion-col col-4><b>Amount</b> - </ion-col><ion-col col-8>"+this.travel_docs[index]['amount']+"</ion-col>";
    if(this.travel_docs[index]['cgst']!=null)
    msg+="<br><ion-col col-4><b>CGST</b> - </ion-col><ion-col col-8>"+this.travel_docs[index]['cgst']+"</ion-col>";
    else
    msg+="<br><ion-col col-4><b>CGST</b> - </ion-col><ion-col col-8>0</ion-col>"
    if(this.travel_docs[index]['sgst']!=null)
    msg+="<br><ion-col col-4><b>SGST</b> - </ion-col><ion-col col-8>"+this.travel_docs[index]['sgst']+"</ion-col>";
    else
    msg+="<br><ion-col col-4><b>SGST</b> - </ion-col><ion-col col-8>0</ion-col>"
    if(this.travel_docs[index]['igst']!=null)
    msg+="<br><ion-col col-4><b>IGST</b> - </ion-col><ion-col col-8>"+this.travel_docs[index]['igst']+"</ion-col>";
    else
    msg+="<br><ion-col col-4><b>IGST</b> - </ion-col><ion-col col-8>0</ion-col>"
    if(this.travel_docs[index]['gst_no']!=null)
    msg+="<br><ion-col col-4><b>GST No</b> - </ion-col><ion-col col-8>"+this.travel_docs[index]['gst_no']+"</ion-col>";
    else
    msg+="<br><ion-col col-4><b>GST No</b> - </ion-col><ion-col col-8>NILL</ion-col>"
    if(this.travel_docs[index]['description']!=null)
    msg+="<br><ion-col col-4><b>Description</b> - </ion-col><ion-col col-8>"+this.travel_docs[index]['description']+"</ion-col>";
    else
    msg+="<br><ion-col col-4><b>CGST</b> - </ion-col><ion-col col-8>NILL</ion-col>"
    if(this.travel_docs[index]['uploaded_date']!=null)
    msg+="<br><ion-col col-4><b>Uploaded Date</b> - </ion-col><ion-col col-8>"+this.travel_docs[index]['uploaded_date']+"</ion-col>";

    console.log(msg);
    const alert = this.alertCtrl.create({
      title: "Document Detail",
      subTitle: msg,
      buttons: ["OK"]
    });
    alert.present();
  }

  openfile(filepath:string)
  {  
    window.open(base_path+filepath);
  }

  downloadopenfile(filepath:string)
  {
    let path = "";
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    }
    else {
      path = this.file.dataDirectory;
    }
    console.log(filepath);
    const transfer: FileTransferObject = this.transfer.create();
    let name = filepath.split('/');
    let size = name.length-1;
    this.filename = name[size];
    console.log(name);
    console.log(this.filename);
    let extn = this.filename.split('.')[1];
    let mimetype = this.getMIMEtype(extn);

    const options: DocumentViewerOptions = {
      title: 'Travel Booking Document'
    }
    console.log(this.filename)
    console.log(extn)
    console.log(mimetype)

    // if(extn=='pdf')
    // {
      if(extn=='xlsx' || extn=='xls')
      {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: 'Only png, jpg and pdf files are allowed',
          buttons: ["OK"]
        });
        alert.present();
      }
      else
      {
        window.open(base_path+filepath, '_system', 'location=yes');
      }
 
  }

  getMIMEtype(extn) {
    let ext = extn.toLowerCase();
    let MIMETypes = {
      'txt': 'text/plain',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc': 'application/msword',
      'pdf': 'application/pdf',
      'jpg': 'image/jpeg',
      'bmp': 'image/bmp',
      'png': 'image/png',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'rtf': 'application/rtf',
      'ppt': 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }
    return MIMETypes[ext];
  }

}
