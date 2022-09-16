import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { GlobalVarsService } from '../services/global-vars/global-vars.service';
import { AuthService } from '../services/auth/auth.service';

let base_path = GlobalVarsService.base_path;

@Component({
  selector: 'app-warning',
  templateUrl: './warning.page.html',
  styleUrls: ['./warning.page.scss'],
})
export class WarningPage implements OnInit {
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
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {

      this.storage.get("emp_id").then(emp_id => {
        this.emp_id=emp_id;
        this.fetchEmployee();
      });
      this.storage.get("designation").then(designation => {
        this.designation=designation;
      });

  }

  async ionViewWillEnter()
  {
    await this.storage.get("emp_id").then(emp_id => {
      this.emp_id=emp_id;
    });
    await this.storage.get("designation").then(designation => {
      this.designation= designation;
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

  async fetchWarning(){
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    let data = JSON.stringify({
      emp_id: this.emp_id,
      designation: this.designation,
    });
    console.log(data);

    this.authService.postData(data, "warning").then(async data => {
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
          subHeader: 'Process Failed! Please try later.',
          buttons: ["OK"]
        });
        (await alert).present();
        console.log(err);
        (await loader).dismiss();
      }
    );
  }

  fetchEmployee()
  {
    console.log('inside fetch empl');
    let data = JSON.stringify({
      emp_id:this.emp_id
    });
    this.authService.postData(data, "get_emp_list").then(async data => {
        console.log(data);

        if (data["status"] == "success") {
          this.emp_list=data['emp_list'];
          console.log(this.emp_list)
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
          // console.log(data["msg"]);
        }
    },
    async err => {
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: 'Process Failed! Please try later.',
        buttons: ["OK"]
      });
      (await alert).present();
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

  async submitdata()
  {
    let validate=true;
    if(this.warning_for=='' || this.warning_for==null ||this.warning_type=='' || this.warning_type==null)
    {
      validate=false;
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: 'Please select employee and select option write warning or upload pic.',
        buttons: ["OK"]
      });
      (await alert).present();
    }
    else if(this.warning_type=='write' && (this.warning_content=='' || this.warning_content==null))
    {
      validate=false;
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: 'Please type your warning content in given textarea',
        buttons: ["OK"]
      });
      (await alert).present();
    }

    else if(this.warning_type=='pic' && (this.filename=='' || this.filename==null))
    {
      validate=false;
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: 'Please select file to upload',
        buttons: ["OK"]
      });
      (await alert).present();
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

  async submitdatatoserver()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
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

    this.authService.postData(data,'insert_warning_n_appreciation').then(async data=>{
      console.log(data);
      
      if(data['status']=='success')
      {
        const toast = this.toastCtrl.create({
          message: "PIL submitted successfully.",
          duration: 2000
        });
        (await toast).present();
      }
      else{
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: data['msg'],
          buttons: ["OK"]
        });
        (await alert).present();
      }
      (await loader).dismiss();
    },async err => {
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: 'Process Failed. Try again later',
        buttons: ["OK"]
      });
      (await alert).present();
      (await loader).dismiss();
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

  ngOnInit() {
  }

}