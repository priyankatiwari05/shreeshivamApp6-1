import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, ToastController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { FileTransferObject, FileTransfer } from '@ionic-native/file-transfer';
import { File } from "@ionic-native/file";
import { DocumentViewerOptions, DocumentViewer } from '@ionic-native/document-viewer';

let base_path=GlobalVarsProvider.base_path;

@Component({
  selector: 'page-task-modal',
  templateUrl: 'task-modal.html',
})
export class TaskModalPage {
  public remark:any;
  public emp_id:any;
  public branch_location_id:any;
  public task_name:any='';
  public description:any='';
  public group_name:any='';
  reassignButton=false;
  group_list:any;
  emp_list:any;
  task: any;
  start_date: any;
  due_date: any;
  task_id: any;
  status: any;
  assign_by: string;
  assign_to: string;
  group_id: any;
  reassign_emp:any;
  reassign_type:any="emp";
  type: any;
  history:any=null;
  remark_time: any;
  imagefile: any;
  filename: any;
  base64data: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public viewCtrl:ViewController, 
    public document: DocumentViewer,
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    public toastController: ToastController,
    public platform:Platform,
    private photoViewer: PhotoViewer,
    public transfer: FileTransfer,
    private file: File,
    ) 
  {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskModalPage');
  }

  ionViewWillEnter()
  {
    console.log(this.type);console.log(this.status);
    //this.reassignButton=false;
    console.log('this.reassignButton');
    console.log(this.reassignButton);
    if(this.emp_id==null)
    {
      this.storage.get('emp_id').then((val) => {
        this.emp_id=val;
      });
    }
    if(this.branch_location_id==null)
    {
      this.storage.get('branch_location_id').then((val) => {
        this.branch_location_id=val;
      });
    }

    this.task=this.navParams.get('task');
    this.type=this.navParams.get('type');
    this.task_name=this.task.task_name;
    this.task_id=this.task.id;
    this.description=this.task.description;
    this.status=this.task.status;
    console.log(this.type);console.log(this.status);
    if(this.type=='assignedbyme')
    {
      if(this.task.first_name!=null)
        this.assign_to=this.task.first_name;
      if(this.task.middle_name!=null)
        this.assign_to+=" "+this.task.middle_name;
      if(this.task.last_name!=null)
        this.assign_to+=" "+this.task.last_name;
    }
    else
    {
      if(this.task.first_name!=null)
        this.assign_by=this.task.first_name;
      if(this.task.middle_name!=null)
        this.assign_by+=" "+this.task.middle_name;
      if(this.task.last_name!=null)
        this.assign_by+=" "+this.task.last_name;
    }
    
    //this.reassign_type='emp';
    if(this.task.group_id!=0)
    {
      this.group_name=this.task.group_name;
      this.group_id=this.task.group_id;
      //this.reassign_type="group";
    }
    
    this.start_date=this.task.start_date;
    this.due_date=this.task.due_date_time;
    //console.log(this.task);

    this.get_history();
  }
  
  update(status)
  {
    if(this.remark==null || this.remark=='')
    {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Please write remark.',
        buttons: ["OK"]
      });
      alert.present();
    }
    else
    {
      this.submit_request(status);
    }
  }

  submit_request(status)
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({
      task_id: this.task_id,
      emp_id: this.emp_id,
      file:this.base64data,
      filename:this.filename,
      status:status,
      remark:this.remark
    });
   console.log('inside submit_request function');
   console.log(data);
    this.authService.postData(data, "update_task_status").then(
      result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          const toast = this.toastController.create({
            message: "Updated successfully",
            duration: 2000
          });
          toast.present();

          // const alert = this.alertCtrl.create({
          //   title: "Query Saved",
          //   subTitle: data["msg"],
          //   buttons: ["OK"]
          // });
          // alert.present();
          // console.log(data["msg"]);
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          // console.log(data["msg"]);
        }
        loader.dismissAll();
        this.viewCtrl.dismiss();
    },
    err => {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: err,
        buttons: ["OK"]
      });
      alert.present();
      console.log(err);
      loader.dismissAll();
    }
  );
  }

  reassign()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({
      branch_location_id: this.branch_location_id,
      group_id: this.group_id,
      emp_id:this.emp_id
    });
    this.authService.postData(data, "get_reassign_emp").then(
      result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.emp_list=data['emp_list'];
          this.group_list=data['group_list'];
         
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          // console.log(data["msg"]);
        }
        loader.dismissAll();
        this.reassignButton=true;
    },
    err => {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: err,
        buttons: ["OK"]
      });
      alert.present();
      console.log(err);
      loader.dismissAll();
    }
  );
  }


  get_history()
  {
    let data = JSON.stringify({
      task_id: this.task_id     
    });
   
    this.authService.postData(data, "get_task_history").then(
      result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          console.log(data);
          this.history=data['history'];
        } else {         
          console.log(data["msg"]);
        }
    },
    err => {
      console.log(err);
    }
  );
  }

  changeListener($event) : void {
    console.log('inside  changelistener function')
    console.log($event);
    if($event.target.files.length>0)
    {
      this.imagefile = $event.target.files;
      var reader = new FileReader();
      this.filename = this.imagefile[0].name;
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.imagefile[0]);
    }
    else
    {
      this.imagefile=this.filename=this.base64data=null;
    }
    
  }
  _handleReaderLoaded(readerEvt) {
    console.log('inside _handleReaderLoaded function');
    var binaryString = readerEvt.target.result;
    this.base64data = btoa(binaryString);
    console.log(this.base64data);
  }

  open_img(url){
    if(this.platform.is('ios'))
    {
      let myurl = decodeURIComponent(url);
      this.photoViewer.show(myurl, url);
    }
    this.photoViewer.show(base_path+url, url, {share: false});
  }

  getMIMEtype(extn) {
    let ext = extn.toLowerCase();
    let MIMETypes = {
      txt: "text/plain",
      docx:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      doc: "application/msword",
      pdf: "application/pdf",
      jpg: "image/jpeg",
      bmp: "image/bmp",
      png: "image/png",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      rtf: "application/rtf",
      ppt: "application/vnd.ms-powerpoint",
      pptx:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      mp4: "video/mp4"
    };
    return MIMETypes[ext];
  }

  open_document(filepath)
  {
    let name = filepath.split('/');
    let size = name.length -1;
    let filename = name[size];
    console.log(filename);
    let extn = filename.split('.')[1];
    if(extn=='PNG' || extn=='png' || extn=='jpg' || extn=='JPG' || extn=='JPEG' || extn=='jpeg')
      this.open_img(filepath);
    else
      window.open(base_path+filepath, '_system', 'location=yes');

    // let path = "";
    // if (this.platform.is('ios')) {
    //   path = this.file.documentsDirectory;
    // }
    // else {
    //   path = this.file.dataDirectory;
    // }
    // console.log(filepath);
    // const transfer: FileTransferObject = this.transfer.create();
    // let name = filepath.split('/');
    // let size = name.length -1;
    // this.filename = name[size];
    // console.log(this.filename);
    // let extn = this.filename.split('.')[1];
    // let mimetype = this.getMIMEtype(extn);

    // console.log(this.filename)
    // console.log(extn)
    // console.log(mimetype)
    
    // const options: DocumentViewerOptions = {
    //   title: 'Task Document'
    // }
    // console.log('file root path');
    // console.log(base_path+filepath);

    // this.document.viewDocument(base_path+filepath, mimetype, options);

    // transfer.download(base_path + filepath, path + this.filename)
    //   .then(entry => {
    //     console.log('downloaded');
    //     console.log(entry.toURL());
    //     // loader.dismiss();
    //     let url = entry.toURL();
    //     this.document.viewDocument(url, mimetype, options);
    //   }).catch(err => {
    //     // loader.dismiss();
    //     console.log(err);
    //     const alert = this.alertCtrl.create({
    //       title: 'Error',
    //       subTitle: 'Something went wrong. Try again later.',
    //       buttons: ['OK'],
    //     });
    //     alert.present();

    // });
  }

}
