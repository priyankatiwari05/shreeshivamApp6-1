import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthserviceProvider } from '../../providers/authservice/authservice';

@Component({
  selector: 'page-ask-hr-form',
  templateUrl: 'ask-hr-form.html',
})
export class AskHrFormPage {
  public query:any;
  public query_type:any;
  public emp_id:any;
  page_type: any;
  mode:any;
  today: string;
  file: any;
  filename: any;
  base64data: string;
  data_list: any=[];
  file_input: string;
  title: any;
  description: any;
  next_year: string;
  gallery_id: any;
  page_title:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public viewCtrl:ViewController, 
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    ) 
  {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskHrFormPage');
  }

  ionViewWillEnter()
  {
    this.today=new Date().toISOString().slice(0, 10);
    let nextyear= new Date().getFullYear()+1;
    this.next_year=nextyear+"-"+this.today.slice(5, 7)+"-"+this.today.slice(8, 10);
    
    if(this.emp_id==null)
    {
      this.storage.get('emp_id').then((val) => {
        this.emp_id=val;
      });
    }
    this.query_type=this.navParams.get('query_type');
    this.page_type=this.navParams.get('page_type');

    if(this.page_type=='add_gallery_pic')
      this.gallery_id=this.navParams.get('gallery_id')
    console.log(this.query_type);

    if(this.page_type=='reimbursement')
    this.page_title=this.navParams.get('page_title')
  }
  
  add_new_request()
  {
    if(this.query==null || this.query=='' || this.query_type=='' || this.query_type==null)
    {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Please select query type and write your query.',
        buttons: ["OK"]
      });
      alert.present();
    }
    else
    {
      this.submit_request();
    }
  }

  submit_request()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({
      emp_id: this.emp_id,
      myquery:this.query,
      query_type:this.query_type
    });
    this.authService.postData(data, "add_askhr_request").then(
      result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          const alert = this.alertCtrl.create({
            title: "Query Saved",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        }
        loader.dismiss();
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
      loader.dismiss();
    }
  );

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
      file: this.base64data
    });
    console.log(this.data_list);
    this.filename=null;
    this.base64data=null;
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
  
  create_gallery()
  {
    if(this.title==null)
    {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Title is mandatory.',
        buttons: ["OK"]
      });
      alert.present();
    }
    else
    {
      this.submit_create_gallery();
    }
  }

  submit_create_gallery()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({
      emp_id:this.emp_id,
      title: this.title,
      // start_date: this.start_date,
      // end_date: this.end_date,
      description: this.description,
      data_list:this.data_list
    });
    this.authService.postData(data, "create_gallery").then(
      result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          const toast = this.toastCtrl.create({
            message: "Gallery created successfully",
            duration: 2000
          });
          toast.present();
          console.log(data["msg"]);
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        }
        loader.dismiss();
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
      loader.dismiss();
    }
  );
  }

  add_gallery_pic()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({
      emp_id:this.emp_id,
      gallery_id:this.gallery_id,
      data_list:this.data_list
    });
    console.log(data)
    this.authService.postData(data, "add_gallery_pic").then(
      result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          const toast = this.toastCtrl.create({
            message: "Pictures uploaded successfully",
            duration: 2000
          });
          toast.present();
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        }
        loader.dismiss();
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
      loader.dismiss();
    }
  );
  }

  update_reimbursement()
  {
    if(this.page_title=='Reject' && (this.description==''||this.description==null))
    {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Description is required',
        buttons: ["OK"]
      });
      alert.present();
    } 
    else if(this.page_title=='Approve' && (this.mode==null||this.mode==''||this.description==''||this.description==null))
    {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Mode and description are required',
        buttons: ["OK"]
      });
      alert.present();
    }
    else
    this.viewCtrl.dismiss(this.mode,this.description);
  }
}
