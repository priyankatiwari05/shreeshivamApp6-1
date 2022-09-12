import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-leave-approval',
  templateUrl: 'leave-approval.html',
})
export class LeaveApprovalPage {
  page_for="myleaves";
  emp_id: any;
  designation_id:any;
  branch_id:any;
  role_id:any;
  
  leaves=[];
  old_leaves=[];
  
  today=new Date().toISOString().slice(0, 10);
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public authService: AuthserviceProvider,
    public toastCtrl :ToastController,
    public viewCtrl :ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveApprovalPage');
  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter LeaveApprovalPage');
    
    await this.storage.get("emp_id").then(emp_id => {
      this.emp_id=emp_id;
    });
    await this.storage.get("branch_location_id").then(branch_location_id => {
        this.branch_id=branch_location_id
    });
    await this.storage.get("designation_id").then(designation_id => {
      this.designation_id=designation_id;
    });
    await this.storage.get("role_id").then(role_id => {
      this.role_id=role_id;
    });

    await this.storage.get('emp_id').then(val=>{
      console.log(val);
      this.emp_id=val;
    });

    this.fetchLeaveForApproval();
  }

  fetchLeaveForApproval()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let request_data=JSON.stringify({
      emp_id:this.emp_id,
      branch_id:this.branch_id,
      designation_id:this.designation_id,
      role_id:this.role_id
    });

    this.authService.postData(request_data,'fetch_leave_for_approval').then(
      result => {
        let data = JSON.parse(result["_body"]);
        if (data["status"] == "success") {
          console.log(data);
          this.leaves=data['leaves'];
          this.old_leaves=data['old_leaves'];
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

  confirmUpdate(index,status)
  {
    if(status=='approve')
    {
      let alert = this.alertCtrl.create({
        title: "CONFIRM "+status.toUpperCase(),
        message: "Are you sure to want to "+status+" this leave request?",
        
        buttons: [
          {
            text: "No",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
              }
          },
          {
            text: "Yes",
            handler: () => {
              this.approveLeaveRequest(index);
            }
          }
        ]
      });
      alert.present();
    }
    else
    {
      let alert = this.alertCtrl.create({
        title: "CONFIRM "+status.toUpperCase(),
        // message: "Are you sure to want to "+status+" this leave request?",
        inputs:[
          {
            name:'remark',
            placeholder:'Write remark here',
          }
        ],
        buttons: [
          {
            text: "No",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
              }
          },
          {
            text: "Yes",
            handler: (data) => {
              if(data.remark!=null && data.remark!='')
                this.rejectLeaveRequest(index,data.remark)
              else
              {
                const alert = this.alertCtrl.create({
                  title: "Error",
                  subTitle: "Remark is required",
                  buttons: ["OK"]
                });
                alert.present();
              }
            }
          }
        ]
      });
      alert.present();
    }
    
  }

  approveLeaveRequest(index)
  {
    let leave_id=this.leaves[index]['id'];
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let request_data=JSON.stringify({
      leave_id:leave_id,
      emp_id:this.emp_id,
      status:'Approved',
      leave_date:this.leaves[index]['leave_dates']
    });
    console.log(request_data);
    this.authService.postData(request_data,'update_leave_status').then(
      result => {
        loader.dismiss();
        let data = JSON.parse(result["_body"]);
        if (data["status"] == "success") {
          this.toastCtrl.create({
            message: "Your leave application has been approved successfully",
            duration: 2000
          }).present();
          this.fetchLeaveForApproval();
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        }
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

  rejectLeaveRequest(index,remark)
  {
    let leave_id=this.leaves[index]['id'];
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let request_data=JSON.stringify({
      leave_id:leave_id,
      emp_id:this.emp_id,
      status:'Rejected',
      remark:remark
    });
    this.authService.postData(request_data,'update_leave_status').then(
      result => {
        loader.dismiss();
        let data = JSON.parse(result["_body"]);
        if (data["status"] == "success") {
          this.toastCtrl.create({
            message: "Your leave application has been rejected successfully",
            duration: 2000
          }).present();
          this.fetchLeaveForApproval();
        } else {
          const alert = this.alertCtrl.create({
            title: "Error",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();
          console.log(data["msg"]);
        }
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

}
