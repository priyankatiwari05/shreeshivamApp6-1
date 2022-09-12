import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  today: string;
  next_year: string;
  from_date:any;
  to_date:any;
  from_time:any;
  to_time:any;
  type:any='write';
  file: any;
  filename: any;
  filename_event: any;
  base64data: string;
  base64data_event: string;
  data_list: any=[];
  file_input: string;
  title: any;
  description: any;
  file_input_event: string;
  emp_id: any;
  event_id: any;
  page_type:any;
  constructor( public navCtrl: NavController,
    public navParams: NavParams, 
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,) {
      this.page_type=this.navParams.get('page_type');
      if(this.page_type=='add_pics')
      this.event_id=this.navParams.get('event_id');
      this.today=new Date().toISOString().slice(0, 10);
      let nextyear= new Date().getFullYear()+1;
      this.next_year=nextyear+"-"+this.today.slice(5, 7)+"-"+this.today.slice(8, 10);
  }

  changeListener($event) : void {

    this.file = $event.target.files;
    console.log(this.file)
    var reader = new FileReader();
    this.filename = this.file[0].name;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.file[0]);
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64data = btoa(binaryString);
  }


  changeListener_event($event) : void {

    this.file = $event.target.files;
    console.log(this.file)
    var reader = new FileReader();
    this.filename_event = this.file[0].name;

    reader.onload = this._handleReaderLoaded_event.bind(this);
    reader.readAsBinaryString(this.file[0]);
  }
  _handleReaderLoaded_event(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64data_event = btoa(binaryString);
  }

  add_to_list() {
    this.data_list.push({
      filename: this.filename_event,
      file: this.base64data_event
    });
    console.log(this.data_list);
    this.filename_event=null;
    this.base64data_event=null;
    this.file_input_event="";
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

  async create_event()
  {
    if(this.title==null || this.title=='' ||
     this.from_date==null || this.from_date=='' ||
     this.to_date==null || this.to_date=='' ||
    ( this.description==null && this.filename_event=='')  ) 
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
      this.submit_create_event();
    }
  }

  async submit_create_event()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({
      emp_id:this.emp_id,
      title: this.title,
      from_date: this.from_date,
      to_date: this.to_date,
      from_time: this.from_time,
      to_time: this.to_time,
      description: this.description,
      file:this.base64data,
      filename:this.filename
    });

    this.authService.postData(data, "create_event").then(async result => {
        let data = result;
        console.log(data);

        if (data["status"] == "success") {
          this.event_id=data['event_id']
          if(this.data_list.length!=0)
            this.add_event_pics();
          const toast = this.toastCtrl.create({
            message: "Event created successfully",
            duration: 2000
          });
          (await toast).present();
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
        if(this.data_list.length==0)
        {
          (await loader).dismiss();
        }
        
    },
    async err => {
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: err,
        buttons: ["OK"]
      });
      (await alert).present();
      console.log(err);
      (await loader).dismiss();
    }
  );
  }

  async add_event_pics()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({
      event_id:this.event_id,
      data_list:this.data_list
    });

    this.authService.postData(data, "add_event_gallery_pic").then(async result => {
      let data = result;
      console.log(data);
      
        if (data["status"] == "success") {
          this.event_id=data['event_id']
          const toast = this.toastCtrl.create({
            message: "Event pictures uploaded successfully",
            duration: 2000
          });
          (await toast).present();
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
    },
    async err => {
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: err,
        buttons: ["OK"]
      });
      (await alert).present();
      console.log(err);
      (await loader).dismiss();
    }
  );
  }

  async check_date()
  {
    if(this.from_date!=null && this.from_date!='')
    {
      if(this.to_date<this.from_date)
      {
        this.to_date=null;
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: 'To date cannot be less than from date',
          buttons: ["OK"]
        });
        (await alert).present();
      }
    }
  }

  ngOnInit() {
  }
}
