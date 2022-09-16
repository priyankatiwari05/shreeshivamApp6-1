import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { BlankPage } from '../blank/blank.page';
import { TaskPage } from '../task/task.page';
import { CreateTaskPage } from '../create-task/create-task.page';
import { CheckListPage } from '../check-list/check-list.page';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-task-master',
  templateUrl: './task-master.page.html',
  styleUrls: ['./task-master.page.scss'],
})
export class TaskMasterPage implements OnInit {
  blank = BlankPage;
  task = TaskPage;
  create_task = CreateTaskPage;
  check_list = CheckListPage;
  task_count: any;
  constructor(public navCtrl: NavController, 
    public storage: Storage,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastController: ToastController,) {
      this.getHomeData();
  }

  open_root(page) {
    console.log(page);
    this.navCtrl.navigateForward(page);
  }

  getHomeData()
  {
    this.storage.get('emp_id').then((val)=>{
      this.authService.postData(JSON.stringify({emp_id:val}),'getapphomedata').then((result)=>{
        console.log(result);
        this.task_count= result['task_count'];
      },err=>{
        console.log(err)
      });
    })
  }
  ngOnInit() {
  }

}