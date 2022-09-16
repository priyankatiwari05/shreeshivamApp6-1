import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {
  task_name:any;
  description:any;
  frequency:any;
  repeat:any;
  check_frequency:boolean;
  check_subtask:boolean;
  recursion_type:any;
  assign_to_type:any='indi_val';
  assign_to:any;
  assign_to_group:any;
  end_date:any;
  start_date:any;
  task_type:boolean=true;
  task_type_id: any;
  subtask_name:any;
  subtask_end_date:any;
  subtask_array:any=[];
  subtask_name_array:any=[];
  subtask_date_array:any=[];
  group_list:any;
  emp_list:any;
  grps:any;
  priority: any='low';
  emp_id : any;
  imagefile: any;
  filename: any;
  base64data: string;
  today=new Date().toISOString();
  constructor(public navCtrl: NavController,
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastController: ToastController,) {

      this.storage.get('emp_id').then((val)=>{
        this.emp_id=val;
        this.getEmpGroupList();
      });
  }

  getEmpGroupList()
  {
    console.log('Inside getEmpGroupList()');
    this.authService.postData(JSON.stringify({emp_id:this.emp_id}),"get_emp_and_group_list").then(async data => {
        if (data["status"] == "success") {
          this.emp_list=data['emp_list'];
          this.group_list=data['group_emp_list'];
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
          subHeader: err,
          buttons: ["OK"]
        });
        (await alert).present();
        console.log(err);
      }
    );

  }
  toggle_frequency()
  {
    if(this.check_frequency==true)
      this.check_subtask=false;
  }

  toggle_subtask()
  {
    if(this.check_subtask==true)
      this.check_frequency=false;
  }
  
  async save_task_type()
  {
    if(this.task_name!=null && this.task_name!='' && this.description!=null && this.description!='')
    {
      this.final_submit_task_type();
    } else {
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: 'Task Name and description are required',
        buttons: ["OK"]
      });
      (await alert).present();
      // console.log(data["msg"]);
    }
  }

  async final_submit_task_type()
  {
    console.log('Inside final_submit_task_type()');
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({
      task_name: this.task_name,
      task_description: this.description
    });

    this.authService.postData(data, "add_task_type").then( async data => {
        if (data["status"] == "success") {
          this.task_type_id=data['id'];
          console.log(this.task_type_id);
          this.task_type=false;
          // const alert = this.alertCtrl.create({
          //   title: "Task type Saved",
          //   subTitle: data["success"],
          //   buttons: ["OK"]
          // });
          // (await alert).present();
          // console.log(data["msg"]);
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: data["danger"],
            buttons: ["OK"]
          });
          (await alert).present();
          // console.log(data["msg"]);
        }
        (await loader).dismiss();
        //this.viewCtrl.dismiss();
      },
      async err => {
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: "Process Failed. Please try again later",
          buttons: ["OK"]
        });
        (await alert).present();
        console.log(err);
        (await loader).dismiss();
      }
    );
  }

  async add_subtask()
  {
    if(this.subtask_name!=null && this.subtask_name!='' && this.subtask_end_date!=null && this.subtask_end_date!='')
    {
      if(this.subtask_end_date.substring(0,10)<this.today.substring(0,10))
      {
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: "You cannot select past date",
          buttons: ["OK"]
        });
        (await alert).present();
      }
      else
      {
        this.subtask_array.push({'name':this.subtask_name,'end_date':this.subtask_end_date});
        this.subtask_name_array.push(this.subtask_name);
        this.subtask_date_array.push(this.subtask_end_date);
        this.subtask_name=null;
        this.subtask_end_date=null;
      }      
    }
  }

  remove_subtask(index)
  {
    let mytemparray=[];
    let mytempnamearray=[];
    let mytempdatearray=[];
    let i=0;
    for(i=0; i<this.subtask_name_array.length;i++)
    {
      if(i!=index)
      {
        mytemparray.push(this.subtask_array[i]);
        mytempnamearray.push(this.subtask_name_array[i]);
        mytempdatearray.push(this.subtask_date_array[i]);
      }
       
    }
    if(i==this.subtask_name_array.length)
    {
      this.subtask_array=mytemparray;
      this.subtask_name_array=mytempnamearray;
      this.subtask_date_array=mytempnamearray;
    }
      
  }

  async save_task_master()
  {
    let assign_to=[],assign_to_group=[],i=0,validated=true, error_msg="";
    console.log('inside save_task_master. ');
    if(this.assign_to_type=='indi_val')
    {
      if(this.assign_to!=null && this.assign_to!='')
      {
        for(i=0;i<this.assign_to.length;i++)
        {
          assign_to.push(this.assign_to[i]['id']);
        }
        if(i==this.assign_to.length)
          this.assign_to=assign_to;
      }
      else
      {
        validated=false;
        error_msg+="Please select Employee. ";
      }
    }
    if(this.assign_to_type=='grps_val')
    {
      if(this.assign_to_group!=null && this.assign_to_group!='')
      {
        for(i=0;i<this.assign_to_group.length;i++)
        {
          assign_to_group.push(this.assign_to_group[i]['id']);
        }
        if(i==this.assign_to_group.length)
          this.assign_to_group=assign_to_group;
      }
      else
      {
        validated=false;
        error_msg+="Please select Group. ";
      }
      
      // for(let i=0; i<this.group_list.length; i++)
      // {
      //   console.log('inside for');
      //   if(this.assign_to_group==this.group_list[i]['id'])
      //   {
      //     console.log('inside this.assign_to_group==this.group_list');
      //     grps = JSON.parse(this.group_list[i]['emp_id']);
      //   }
      // }
    }
    if(this.check_frequency==true)
    {
      if(this.start_date.substring(0,10)<this.today.substring(0,10))
      {
        validated=false;
        error_msg+="You cannot select past date in start date. ";
      }
      if(this.end_date.substring(0,10)<this.start_date.substring(0,10))
      {
        validated=false;
        error_msg+="End date cannot be smaller than start date. ";
      }
    }

    if(this.check_subtask!=true)
    {
      this.subtask_date_array=null;
      this.subtask_name_array=null;
    }
    let data = JSON.stringify({
      emp_id:this.emp_id,
      task_for:this.assign_to_type,
      indi:this.assign_to,
      recussion_type : this.frequency,
      recussion_start_date : this.start_date,
      recussion_till_date : this.end_date,
      recussion_weekly_date : this.repeat,
      recussion_month_date : this.repeat,
      newtask : this.task_type_id,
      priority : this.priority,
      subtask_type : this.subtask_name_array,
      due_date_main : this.end_date,
      subtask_date : this.subtask_date_array,
      grps:this.assign_to_group,
      file:this.base64data,
      filename:this.filename,
    });
    console.log({
      emp_id:this.emp_id,
      task_for:this.assign_to_type,
      indi:this.assign_to,
      recussion_type : this.frequency,
      recussion_start_date : this.start_date,
      recussion_till_date : this.end_date,
      recussion_weekly_date : this.repeat,
      recussion_month_date : this.repeat,
      repeat_daily:this.repeat,
      newtask : this.task_type_id,
      priority : this.priority,
      subtask_type : this.subtask_name_array,
      due_date_main : this.end_date,
      subtask_date : this.subtask_date_array,
      grps:this.assign_to_group,
      file:this.base64data,
      filename:this.filename,
    });

    if(validated==true)
      this.savetoserver(data); 
    else
    {
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: error_msg,
        buttons: ["OK"]
      });
      (await alert).present();
    }   
  }

  async savetoserver(data)
  {
    console.log('Inside savetoserver()');
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    this.authService.postData(data, "create_task").then(async data => {
        if (data["status"] == "success") {   
          // const alert = this.alertCtrl.create({
          //   title: "Success",
          //   subTitle: data["msg"],
          //   buttons: ["OK"]
          // });
          // (await alert).present(); 
          const toast = this.toastController.create({
            message: data["msg"],
            duration: 2000
          });
         (await toast).present();      
          (await loader).dismiss();
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: data["danger"],
            buttons: ["OK"]
          });
          (await alert).present();
          (await loader).dismiss();
        }
        
      },
      async err => {
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: "Process Failed. Please try again later",
          buttons: ["OK"]
        });
        (await alert).present();
        console.log(err);
        (await loader).dismiss();
      }
    );
  }
  changeListener($event) : void {
    console.log('inside  changelistener function')
    console.log($event);
    if($event.target.files.length>0)
    {
      this.imagefile = $event.target.files;
      var reader = new FileReader();
      this.filename = this.imagefile[0].name;
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.imagefile[0]);
    }
    else
    {
      this.imagefile=this.filename=this.base64data=null;
    }
    
  }
  _handleReaderLoaded(readerEvt) {
    console.log('inside _handleReaderLoaded function');
    var binaryString = readerEvt.target.result;
    this.base64data = btoa(binaryString);
    console.log(this.base64data);
  }
  showval(val)
  {
    console.log(val);
  }
  ngOnInit() {
  }
}
