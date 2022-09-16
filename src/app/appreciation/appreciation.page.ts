import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; 
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { AuthService } from '../services/auth/auth.service';
import { GlobalVarsService } from '../services/global-vars/global-vars.service';


let base_path = GlobalVarsService.base_path;

@Component({
  selector: 'app-appreciation',
  templateUrl: './appreciation.page.html',
  styleUrls: ['./appreciation.page.scss'],
})
export class AppreciationPage implements OnInit {
  myappreciation:any;
  sentappreciation:any;
  allappreciation:any;
  emp_id:any;
  issued:any;
  designation: any;
  home='myappreciation';
  emp_list: any;
  appreciation_for:any;
  appreciation_content:any;
  appreciation_pic:any;
  appreciation_type="write";
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
      this.designation=designation;
      console.log(this.designation.toUpperCase());
    });
    await this.storage.get("branch_location_id").then(branch_location_id => {
      this.branch_location_id=branch_location_id;
    });
    
    if(this.emp_id!=null && this.designation!=null)
    {
      this.fetchappreciation();
     
      console.log('inside if condition');
    }

    // if(this.designation.toUpperCase().includes('GM')
    //   || this.designation.toUpperCase().includes('DIRECTOR')
    //   || this.designation.toUpperCase().includes('PCH'))
    //   {
    //     console.log("inside if this.designation.toUpperCase().includes")
    //     this.home='appreciations';
    //   }
    //   else
    //   {
    //     this.home='';
    //   }
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.fetchappreciation();
    refresher.complete();

    setTimeout(() => {
      console.log("Async operation has ended");
    }, 2000);
  }

  async fetchappreciation(){
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    let data = JSON.stringify({
      emp_id: this.emp_id,
      designation: this.designation,
    });
    console.log(data);

    this.authService.postData(data, "appreciation").then(async (data) => {
        console.log(data);

        if (data["status"] == "success") {
          this.myappreciation = data["myappreciation"];
          // this.sentappreciation = data["sentappreciation"];
          this.allappreciation = data["allappreciation"];

          if(this.myappreciation!=null && this.myappreciation!='')
          for(let i=0;i<this.myappreciation.length;i++)
          {
            this.myappreciation[i]['message'] = this.removeHTMLInfo(this.myappreciation[i]['message']);
          }
          // if(this.sentappreciation!=null && this.sentappreciation!='')
          // for(let i=0;i<this.sentappreciation.length;i++)
          // {
          //   this.sentappreciation[i]['message'] = this.removeHTMLInfo(this.sentappreciation[i]['message']);
          // }

          if(this.allappreciation!=null && this.allappreciation!='')
          for(let i=0;i<this.allappreciation.length;i++)
          {
            this.allappreciation[i]['message'] = this.removeHTMLInfo(this.allappreciation[i]['message']);
          }
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
      },
      async err => {
        const alert = this.alertCtrl.create({
          header: "Error",
          message: 'Process Failed! Please try later.',
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
    this.authService.postData(data, "get_emp_list").then(async (data) => {
        console.log(data);

        if (data["status"] == "success") {
          this.emp_list=data['emp_list'];
          console.log(this.emp_list)
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            message: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
        }
    },
    async err => {
      const alert = this.alertCtrl.create({
        header: "Error",
        message: 'Process Failed! Please try later.',
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
    if(this.appreciation_for=='' || this.appreciation_for==null ||this.appreciation_type=='' || this.appreciation_type==null)
    {
      validate=false;
      const alert = this.alertCtrl.create({
        header: "Error",
        message: 'Please select employee and select option write appreciation or upload pic.',
        buttons: ["OK"]
      });
      (await alert).present();
    }
    else if(this.appreciation_type=='write' && (this.appreciation_content=='' || this.appreciation_content==null))
    {
      validate=false;
      const alert = this.alertCtrl.create({
        header: "Error",
        message: 'Please type your appreciation content in given textarea',
        buttons: ["OK"]
      });
      (await alert).present();
    }

    else if(this.appreciation_type=='pic' && (this.filename=='' || this.filename==null))
    {
      validate=false;
      const alert = this.alertCtrl.create({
        header: "Error",
        message: 'Please select file to upload',
        buttons: ["OK"]
      });
      (await alert).present();
    }

    if(validate)
    {
      if(this.appreciation_type=='pic')
      {
        this.appreciation_content=null;
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
      to_emp:this.appreciation_for.id,
      from_emp:this.emp_id,
      type:'appreciation',
      // appreciation_type:this.appreciation_type,
      message:this.appreciation_content,
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
          message: "appreciation submitted successfully.",
          duration: 2000
        });
        (await toast).present();
      }
      else{
        const alert = this.alertCtrl.create({
          header: "Error",
          message: data['msg'],
          buttons: ["OK"]
        });
        (await alert).present();
      }
      (await loader).dismiss();
    },async err => {
      const alert = this.alertCtrl.create({
        header: "Error",
        message: 'Process Failed. Try again later',
        buttons: ["OK"]
      });
      (await alert).present();
      (await loader).dismiss();
    });
  }

  show(appreciation_for)
  {
    console.log(appreciation_for)
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
