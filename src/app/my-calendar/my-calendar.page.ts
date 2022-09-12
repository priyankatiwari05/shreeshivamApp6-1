import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Push } from '@awesome-cordova-plugins/push/ngx';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.page.html',
  styleUrls: ['./my-calendar.page.scss'],
})
export class MyCalendarPage implements OnInit {
  date: Date;
  firstday: string;
  lastday: string;
  calendar=[];
  array_size=[];
  month:any;
  year:any;
  customised_date: any;
  weekoff_date: string[];
  emp_id:any;
  month_arr=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  leave_dates: string[];
  holiday_dates: string[];
  leaves: any;
  holidays: any;
  shifts: any;
  constructor(public push: Push,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public authService: AuthService) {
  }

  async ionViewWillEnter()
  {
    await this.storage.get('emp_id').then(val=>{
      this.emp_id=val;
    });

    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    // let year = this.date.getFullYear();
    // let month = this.date.getMonth();
    console.log(this.month_arr[this.month]);
    console.log(this.month);
    await this.fetchCalendarDetail(this.year,this.month);
    this.createCalendar(this.year,this.month);
  }

  createCalendar(year,month)
  {
    let calendar=[];
    this.array_size=[];
    let first = new Date(year, month, 1).toString();
    let last = new Date(year, month + 1, 0).toString();
    let last_date=parseInt(last.slice(8,10));
    let first_date=parseInt(first.slice(8,10));

    this.firstday = first.slice(0,3);
    this.lastday = last.slice(0,3);
    let order=[];

    if(this.firstday=='Sun')
    {
      order=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    }

    if(this.firstday=='Mon')
    {
      order=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    }

    if(this.firstday=='Tue')
    {
      order=['Tue','Wed','Thu','Fri','Sat','Sun','Mon'];
    }

    if(this.firstday=='Wed')
    {
      order=['Wed','Thu','Fri','Sat','Sun','Mon','Tue'];
    }

    if(this.firstday=='Thu')
    {
      order=['Thu','Fri','Sat','Sun','Mon','Tue','Wed'];
    }

    if(this.firstday=='Fri')
    {
      order=['Fri','Sat','Sun','Mon','Tue','Wed','Thu'];
    }

    if(this.firstday=='Sat')
    {
      order=['Sat','Sun','Mon','Tue','Wed','Thu','Fri'];
    }
    calendar['Sun']=[];
    calendar['Mon']=[];
    calendar['Tue']=[];
    calendar['Wed']=[];
    calendar['Thu']=[];
    calendar['Fri']=[];
    calendar['Sat']=[];

    let cur_date=first_date
    let i=0, j=0;

    if(this.firstday=='Mon')
    {
      calendar['Sun'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
    }
    if(this.firstday=='Tue')
    {
      calendar['Sun'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Mon'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
    }
    if(this.firstday=='Wed')
    {
      calendar['Sun'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Mon'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Tue'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
    }
    if(this.firstday=='Thu')
    {
      calendar['Sun'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Mon'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Tue'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Wed'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
    }
    if(this.firstday=='Fri')
    {
      calendar['Sun'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Mon'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Tue'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Wed'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Thu'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
    }
    if(this.firstday=='Sat')
    {
      calendar['Sun'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Mon'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Tue'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Wed'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Thu'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Fri'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
    }

    while(i<last_date)
    {
      if(j==7)
      {
        j=0;
      }
      let is_leave=this.leave_dates.indexOf(cur_date.toString());
      let is_holiday=this.holiday_dates.indexOf(cur_date.toString());
      let color_leave=false;
      let color_holiday=false;
      if(is_holiday!=-1)
      {
        color_holiday=true;
      }

      if(is_leave!=-1)
      {
        color_leave=true;
      }
      
        calendar[order[j]].push({val:String("00" + cur_date).slice(-2),
        color_leave:color_leave,color_holiday:color_holiday,
        time_in:this.shifts[cur_date-1]['time_in'],time_out:this.shifts[cur_date-1]['time_out']});

      cur_date=cur_date+1;
      i++;j++;
    }

    if(this.lastday=='Fri')
    {
      calendar['Sat'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
    }
    if(this.lastday=='Thu')
    {
      calendar['Fri'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Sat'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
    }
    if(this.lastday=='Wed')
    {
      calendar['Thu'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Fri'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Sat'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
    }
    if(this.lastday=='Tue')
    {
      calendar['Thu'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Fri'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Sat'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Wed'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
    }
    if(this.lastday=='Mon')
    {
      calendar['Fri'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Sat'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Tue'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Wed'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Thu'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
    }
    if(this.lastday=='Sun')
    {
      calendar['Sat'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Mon'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Tue'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Wed'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Thu'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
      calendar['Fri'].push({val:'',color_leave:false,color_holiday:false,time_in:'',time_out:''});
    }

    // this.leave_dates=['01','02','07'];
    console.log('updating calendar');

    this.calendar=calendar;

    for(let m=0;m<calendar['Sun'].length;m++)
    {
      this.array_size.push(m);
    }
  }

  async fetchCalendarDetail(year,month)
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    await this.authService.postData(JSON.stringify({emp_id:this.emp_id,year:year,month:month+1}),'fetch_calendar_detail').then(async result => {
        let data = result;
        console.log(data);
        
        if (data["status"] == "success") {
          console.log(data);
          this.leave_dates=data['leave_dates'];
          this.holiday_dates=data['holiday_dates'];
          this.leaves=data['leaves'];
          this.holidays=data['holidays'];
          this.shifts=data['shifts'];
          console.log(this.shifts);
          
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
          subHeader: err,
          buttons: ["OK"]
        });
        (await alert).present();
        console.log(err);
        (await loader).dismiss();
      }
    );
  }

  async changeCalender(index)
  {
    let new_month=this.month+index;
    let new_year=this.year;
    if(new_month<0)
    {
      new_month=11;
      new_year=new_year-1;
    }
    if(new_month>11)
    {
      new_month=0;
      new_year=new_year+1;
    }
    this.month=new_month;
    this.year=new_year;
    await this.fetchCalendarDetail(new_year,new_month);
    this.createCalendar(new_year,new_month);
      
  }

  ngOnInit() {
  }

}
