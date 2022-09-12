import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController, ModalOptions, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { CheckListFormPage } from '../check-list-form/check-list-form.page';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.page.html',
  styleUrls: ['./check-list.page.scss'],
})
export class CheckListPage implements OnInit {
  emp_id:any;
  mychecklist:any;
  allchecklist:any;
  designation: any;
  home='';
  emp_list: any;
  branch_location_id: any;
  datafrom='parent';
  constructor(public navCtrl: NavController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private modal: ModalController) {
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

  async fetchCheckList()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    let data = JSON.stringify({
      emp_id: this.emp_id
    });
    console.log(data);

    this.authService.postData(data, "fetchCheckList").then(async result => {
        let data = result;
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
            header: "Error",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          (await alert).present();
          console.log(data["msg"]);
        }
        (await loader).dismiss();

        console.log('home '+this.home)
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

  async openModal(index,checklist_id,checklist_for)
  {
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
    const myModal = await this.modal.create({component:CheckListFormPage,backdropDismiss: true, componentProps:{checklist_id:checklist_id,checklist_for:checklist_for,for_emp:for_emp }});

    (await myModal).present();
  
    myModal.onDidDismiss().then(async (data) => {
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
    });
  
    myModal.onWillDismiss().then((data) => {
      console.log("I'm about to dismiss");
    });
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.fetchCheckList();
    refresher.complete();
  }

  ngOnInit() {
  }
}
