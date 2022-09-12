import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, ViewController, ModalOptions, ModalController, Modal } from 'ionic-angular';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { Storage } from '@ionic/storage';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { CheckListFormPage } from '../check-list-form/check-list-form';

@Component({
  selector: 'page-check-list',
  templateUrl: 'check-list.html',
})
export class CheckListPage {
  emp_id:any;
  mychecklist:any;
  allchecklist:any;
  designation: any;
  home='';
  emp_list: any;
  branch_location_id: any;
  datafrom='parent';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    private modal: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckListPage');
  }
  
  async ionViewWillEnter()
  {
    console.log('ionViewWillEnter CheckListPage');
    await this.storage.get("emp_id").then(emp_id => {
      this.emp_id=emp_id;
    });
    await this.storage.get("designation").then(designation => {
      this.designation=designation;
    });
    await this.storage.get("branch_location_id").then(branch_location_id => {
      this.branch_location_id=branch_location_id;
    });

    console.log(this.emp_id);

    if(this.emp_id!=null && this.designation!=null)
      this.fetchCheckList();
      
    console.log(this.home);
  }

  fetchCheckList()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let data = JSON.stringify({
      emp_id: this.emp_id
    });
    console.log(data);

    this.authService.postData(data, "fetchCheckList").then(
      result => {
        let responseData = result;
        let data = JSON.parse(responseData["_body"]);
        console.log(data);
        if (data["status"] == "success") {
          this.mychecklist = data["mychecklist"];
          this.allchecklist = data["allchecklist"];
          
          if(this.datafrom=='parent')
          {
            if(this.allchecklist.length!=0)
            {
              this.home='mychecklist';
            }
            else
            {
              this.home='';
            }
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

        console.log('home '+this.home)
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

  openModal(index,checklist_id,checklist_for)
  {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
  
    // const myModalData = {
    //   query_type: this.home
    // };
    let for_emp='';
    console.log(checklist_id)
    if(checklist_for=='approver')
    {
      if(this.allchecklist[index]['first_name']!=null)
        for_emp+=this.allchecklist[index]['first_name'];
      if(this.allchecklist[index]['middle_name']!=null)
        for_emp+=" "+this.allchecklist[index]['middle_name'];
      if(this.allchecklist[index]['last_name']!=null)
        for_emp+=" "+this.allchecklist[index]['last_name'];
    }
  console.log({ checklist_id:checklist_id,checklist_for:checklist_for,for_emp:for_emp })
    const myModal: Modal = this.modal.create(CheckListFormPage, { checklist_id:checklist_id,checklist_for:checklist_for,for_emp:for_emp }, myModalOptions);
  
    myModal.present();
  
    myModal.onDidDismiss(async (data) => {
      console.log("I have dismissed.");
      let mychecklist_for=checklist_for

      this.datafrom="child";

      console.log(mychecklist_for)
      await this.fetchCheckList();

      console.log(mychecklist_for+" mychecklist_for");
      if(mychecklist_for=='approver')
      {
        this.home='allchecklist';
        console.log(this.home+" home")
      }
      else
      {
        this.datafrom="parent";
      }
        
      // console.log(data);
    });
  
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      // console.log(data);
    });
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.fetchCheckList();
    refresher.complete();
  }

}
