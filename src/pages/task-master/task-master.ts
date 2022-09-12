import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BlankPage } from '../blank/blank';
import { TaskPage } from '../task/task';
import { CreateTaskPage } from '../create-task/create-task';
import { CheckListPage } from '../check-list/check-list';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TaskMasterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-task-master',
  templateUrl: 'task-master.html',
})
export class TaskMasterPage {
  blank = BlankPage;
  my_task = TaskPage;
  create_task = CreateTaskPage;
  check_list = CheckListPage;
  task_count: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    public toastController: ToastController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskMasterPage');
  }
  ionViewWillEnter()
  {
    this.getHomeData();
  }
  open_root(page) {
    console.log(page);
    this.navCtrl.push(page);
  }

  getHomeData()
  {
    this.storage.get('emp_id').then((val)=>{
      this.authService.postData(JSON.stringify({emp_id:val}),'getapphomedata').then((result)=>{
        console.log(result);
        let data = JSON.parse(result["_body"]);
        this.task_count=data['task_count'];
      },err=>{
        console.log(err)
      });
    })
  }

}
