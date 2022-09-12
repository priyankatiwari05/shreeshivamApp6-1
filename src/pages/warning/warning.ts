import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { Storage } from '@ionic/storage';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { PhotoViewer } from '@ionic-native/photo-viewer';

let base_path = GlobalVarsProvider.base_path;
@Component({
  selector: 'page-warning',
  templateUrl: 'warning.html',
})
export class WarningPage {
  emp_id:any;
  warning:any;
  issued:any;
  designation: any;
  home='';
  emp_list: any;
  warning_for:any;
  warning_content:any;
  warning_pic:any;
  warning_type="write";
  file: any;
  filename: any;
  base64data: string;
  branch_location_id: any;
  constructor(public navCtrl: NavController,
    private photoViewer: PhotoViewer,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController) {

      this.storage.get("emp_id").then(emp_id => {
        this.emp_id=emp_id;
        this.fetchEmployee();
      });
      this.storage.get("designation").then(designation => {
        this.designation=designation;
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarningPage');
  }

  async ionViewWillEnter()
  {
    await this.storage.get("emp_id").then(emp_id => {
      this.emp_id=emp_id;
    });
    await this.storage.get("designation").then(designation => {
      this.designation=designation;
      console.log(this.designation.toUpperCase());
    });
    await this.storage.get("branch_location_id").then(branch_location_id => {
      this.branch_location_id=branch_location_id;
    });
    
    if(this.emp_id!=null && this.designation!=null)
    {
      this.fetchWarning();
     
      console.log('inside if condition');
    }

    if(this.designation.toUpperCase().includes('GM')
      || this.designation.toUpperCase().includes('DIRECTOR')
      || this.designation.toUpperCase().includes('PCH')
      || this.designation.toUpperCase().includes('HR '))
      {
        console.log("inside if this.designation.toUpperCase().includes")
        this.home='warnings';
      }
      else
      {
        this.home='';
      }
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.fetchWarning();
    refresher.complete();

    setTimeout(() => {
      console.log("Async operation has ended");
    }, 2000);
  }

  fetchWarning(){
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let data = JSON.stringify({
      emp_id: this.emp_id,
      designation: this.designation,
    });
    console.log(data);

    this.authService.postData(data, "warning").then(
      result => {
        let responseData = result;
        let data = JSON.parse(responseData["_body"]);
        /// console.log(responseData);
        console.log(data);
        if (data["status"] == "success") {
          this.warning = data["warning"];
          this.issued = data["issued"];
          for(let i=0;i<this.warning.length;i++)
          {
            this.warning[i]['message'] = this.removeHTMLInfo(this.warning[i]['message']);
          }
          if(this.issued!=null && this.issued!='')
          for(let i=0;i<this.issued.length;i++)
          {
            this.issued[i]['message'] = this.removeHTMLInfo(this.issued[i]['message']);
          }
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        }
        loader.dismissAll();
      },
      err => {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: 'Process Failed! Please try later.',
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
        loader.dismissAll();
      }
    );
  }

  fetchEmployee()
  {
    console.log('inside fetch empl');
    let data = JSON.stringify({
      emp_id:this.emp_id
    });
    this.authService.postData(data, "get_emp_list").then(
      result => {
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.emp_list=data['emp_list'];
          console.log(this.emp_list)
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          // console.log(data["msg"]);
        }
    },
    err => {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Process Failed! Please try later.',
        buttons: ["OK"]
      });
      alert.present();
      console.log(err);
    }
  );
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
    this.base64data = btoa(binaryString);  // Converting binary string data.
    //
  }

  submitdata()
  {
    let validate=true;
    if(this.warning_for=='' || this.warning_for==null ||this.warning_type=='' || this.warning_type==null)
    {
      validate=false;
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Please select employee and select option write warning or upload pic.',
        buttons: ["OK"]
      });
      alert.present();
    }
    else if(this.warning_type=='write' && (this.warning_content=='' || this.warning_content==null))
    {
      validate=false;
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Please type your warning content in given textarea',
        buttons: ["OK"]
      });
      alert.present();
    }

    else if(this.warning_type=='pic' && (this.filename=='' || this.filename==null))
    {
      validate=false;
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Please select file to upload',
        buttons: ["OK"]
      });
      alert.present();
    }

    if(validate)
    {
      if(this.warning_type=='pic')
      {
        this.warning_content=null;
      }
      else
      {
        this.base64data=this.filename=null;
      }
      this.submitdatatoserver();
    }
    
  }

  submitdatatoserver()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({
      to_emp:this.warning_for.id,
      from_emp:this.emp_id,
      type:'warning',
      // warning_type:this.warning_type,
      message:this.warning_content,
      file:this.base64data,
      filename:this.filename,
      branch_location_id:this.branch_location_id
    });

    console.log(data);

    this.authService.postData(data,'insert_warning_n_appreciation').then(result=>{
      let data = JSON.parse(result['_body']);
      console.log(data['status']);
      if(data['status']=='success')
      {
        const toast = this.toastCtrl.create({
          message: "PIL submitted successfully.",
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

  show(warning_for)
  {
    console.log(warning_for)
  }

  removeHTMLInfo(value: string)
  {
    if(value)
      return value.replace(/<\/?[^>]+>/gi, "");
  }

  open_img(url){
    this.photoViewer.show(base_path+url, url, {share: false});
  }

}
