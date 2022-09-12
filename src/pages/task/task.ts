import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Modal, ModalController, ModalOptions } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { TaskModalPage } from '../task-modal/task-modal';

@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
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
    public navParams: NavParams, 
    public viewCtrl:ViewController, 
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    private modal: ModalController)
    {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
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

  fetchTasks()
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({
      emp_id: this.emp_id
    });

    this.authService.postData(data, "get_tasks").then(
      result => {
        this.dataload=true;
        let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
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
        this.dataload=false;
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
        loader.dismissAll();
      }
    );
  }

  openModal(item, type) {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
  
    const myModal: Modal = this.modal.create(TaskModalPage, { task: item , type: type }, myModalOptions);
  
    myModal.present();
  
    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      this.fetchTasks();
    });
  
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
    });
  
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
        this.ionViewWillEnter();
        refresher.complete();    
  }

}