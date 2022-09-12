import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-ask-hr-form',
  templateUrl: './ask-hr-form.page.html',
  styleUrls: ['./ask-hr-form.page.scss'],
})
export class AskHrFormPage implements OnInit {
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
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public viewCtrl:ModalController) {  }

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
  
  async add_new_request()
  {
    if(this.query==null || this.query=='' || this.query_type=='' || this.query_type==null)
    {
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: 'Please select query type and write your query.',
        buttons: ["OK"]
      });
      (await alert).present();
    }
    else
    {
      this.submit_request();
    }
  }

  async submit_request()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({
      emp_id: this.emp_id,
      myquery:this.query,
      query_type:this.query_type
    });
    this.authService.postData(data, "add_askhr_request").then(
      async result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          const alert = this.alertCtrl.create({
            header: "Query Saved",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
          console.log(data["msg"]);
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
          console.log(data["msg"]);
        }
        (await loader).dismiss();
        this.viewCtrl.dismiss();
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
  
  async create_gallery()
  {
    if(this.title==null)
    {
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: 'Title is mandatory.',
        buttons: ["OK"]
      });
      (await alert).present();
    }
    else
    {
      this.submit_create_gallery();
    }
  }

  async submit_create_gallery()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({
      emp_id:this.emp_id,
      title: this.title,
      // start_date: this.start_date,
      // end_date: this.end_date,
      description: this.description,
      data_list:this.data_list
    });
    this.authService.postData(data, "create_gallery").then(
      async result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          const toast = this.toastCtrl.create({
            message: "Gallery created successfully",
            duration: 2000
          });
          (await toast).present();
          console.log(data["msg"]);
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            message: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
          console.log(data["msg"]);
        }
        (await loader).dismiss();
        this.viewCtrl.dismiss();
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

  async add_gallery_pic()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({
      emp_id:this.emp_id,
      gallery_id:this.gallery_id,
      data_list:this.data_list
    });
    console.log(data)
    this.authService.postData(data, "add_gallery_pic").then(
      async result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          const toast = this.toastCtrl.create({
            message: "Pictures uploaded successfully",
            duration: 2000
          });
          (await loader).dismiss();
          (await toast).present();
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
          console.log(data["msg"]);
        }
        (await loader).dismiss();
        this.viewCtrl.dismiss();
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

  async update_reimbursement()
  {
    if(this.page_title=='Reject' && (this.description==''||this.description==null))
    {
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: 'Description is required',
        buttons: ["OK"]
      });
      (await alert).present();
    } 
    else if(this.page_title=='Approve' && (this.mode==null||this.mode==''||this.description==''||this.description==null))
    {
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: 'Mode and description are required',
        buttons: ["OK"]
      });
      (await alert).present();
    }
    else
      this.loadingCtrl.dismiss(this.mode,this.description);
  }

  ngOnInit() {
  }
}
