import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController, ModalOptions } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth/auth.service';
import { TaskModalPage } from '../task-modal/task-modal.page';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  public home="today";
  public todaytasks:any=[];
  public upcomingtasks:any=[];
  public closedtasks:any=[];
  public todaygrouptasks:any=[];
  public upcominggrouptasks:any=[];
  public closedgrouptasks:any=[];
  public assignedbyme:any=[];
  public group_assignedbyme:any=[];
  public emp_id:any;
  public dataload=false;
  constructor(
    public navCtrl: NavController, 
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    private modal: ModalController){
      console.log('TaskPage executed.');
    }

  ionViewWillEnter() {
    this.dataload=false;
    if(this.emp_id==null)
    {
      this.storage.get('emp_id').then((id)=>{
        this.emp_id=id;
        this.fetchTasks();
      });
    }
    else
      this.fetchTasks();
    //if(this.todaytasks==null && this.emp_id!=null)
    
      
  }

  async fetchTasks()
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({
      emp_id: this.emp_id
    });

    this.authService.postData(data, "get_tasks").then(
      async result => {
        this.dataload=true;
        // let data = JSON.parse(result["_body"]);
        let data = result;
        if (data["status"] == "success") {
          console.log(data);
          this.todaytasks=data['todaytasks']['individual'];
          this.upcomingtasks=data['upcomingtasks']['individual'];
          this.closedtasks=data['closedtasks']['individual'];
          this.todaygrouptasks=data['todaytasks']['group'];
          this.upcominggrouptasks=data['upcomingtasks']['group'];
          this.closedgrouptasks=data['closedtasks']['group'];
          this.assignedbyme=data['assignedbyme'];
          this.group_assignedbyme=data['group_assignedbyme'];
          
          // console.log(this.todaytasks);
          // console.log(this.todaygrouptasks);
          // console.log(this.closedtasks);
          // console.log(this.closedgrouptasks);
          // console.log(this.upcomingtasks);
          // console.log(this.upcominggrouptasks);
          // console.log(this.assignedbyme);
          // console.log(this.group_assignedbyme);
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
        this.dataload=false;
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

  async openModal(item, type) {
  
    this.navCtrl.navigateForward(['task-modal',{task: item , type: type}]);

    // const myModal: ModalController = this.modal.create(TaskModalPage, { task: item , type: type }, {enableBackdropDismiss: true});
  
    // (await myModal).present();
  
    // await myModal.onDidDismiss((data) => {
    //   console.log("I have dismissed.");
    //   this.fetchTasks();
    // });
  
    // await myModal.onWillDismiss((data) => {
    //   console.log("I'm about to dismiss");
    // });
  
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
        this.ionViewWillEnter();
        refresher.complete();    
  }
  ngOnInit() {
  }

}