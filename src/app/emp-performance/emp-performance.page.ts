import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-emp-performance',
  templateUrl: './emp-performance.page.html',
  styleUrls: ['./emp-performance.page.scss'],
})
export class EmpPerformancePage implements OnInit {
  emp_id:any;
  department:any;
  sal121: any;
  i2: any;
  total_sales: any;
  effective_sales: any;
  total_incentives: any;
  total_target_acheived: any;
  total_sales_incentive_array:any;
  page = "showform";
  emp_list: any;
  start_date: any;
  end_date: any;
  today: string;
  next_year: string;
  current_year: number;
  performance_array_data: any;

  // public doughnutChartLabels: string[] = ["Achived Target", "Total Target"];
  // public doughnutChartData: number[] = [0, 0];
  // public doughnutChartType: string = "doughnut";
  // public doughnutChartOption: any = {
  //   legend: {
  //     display: true,
  //     position: "right"
  //   }
  // };
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public myOpts: any = {
    startVal: 0,
    duration: 3
  };
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
    //   yAxes: [
    //    {
    //        display: true,
    //        ticks: {
    //          fontSize: 14
    //        }
    //    }
    //  ],
    yAxes: [{
      ticks: {
          // autoSkip: false,
          beginAtZero:true,
          stepSize: 5,
          max : 50
      }
   }]
   }
  };
  public barChartLabels: string[] = [
    "2-Jun",
    "3-Jun",
    "4-Jun",
    "5-Jun",
    "6-Jun",
    "7-Jun",
    "8-Jun"
  ];
  public barChartType: string = "bar";
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [0, 0, 0,0, 0, 0, 0], label: "Assigned" },
    { data: [0, 0, 0,0, 0, 0, 0], label: "Completed" }
  ];



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController
  ) {
    this.page = "showform";
    this.storage.get("department").then(dep => {
      this.department = dep;
    });
    if(this.page=='showform')
    {
      this.today=new Date().toISOString().slice(0, 10);
      let nextyear= new Date().getFullYear()+1;
      this.next_year=nextyear+"-"+this.today.slice(5, 7)+"-"+this.today.slice(8, 10);
      this.current_year=new Date().getFullYear();
      this.fetch_emp_list();
    }    
  }

  async ionViewWillEnter()
  {
    console.log(this.navParams.get('page'))
    
    if(this.navParams.get('page')=='showgraph')
    {
      this.page=this.navParams.get('page');
      this.emp_id=this.navParams.get('emp_id');
      this.start_date=this.navParams.get('start_date');
      this.end_date=this.navParams.get('end_date');
      await this.fetch_performance();
    }
  }

  fetch_emp_list()
  {
    console.log('fetch emp list')
    this.authService.getData("fetch_emp_list").then(
      result => {
        let responseData = result;
        let data = JSON.parse(responseData["_body"]);

        console.log(data);
        if (data["status"] == "success") {
          this.emp_list=data['emp_list'];
        } else {
          // const alert = this.alertCtrl.create({
          //   title: "Error",
          //   subTitle: data["msg"],
          //   buttons: ["OK"]
          // });
          // alert.present();
          console.log(data["msg"]);
        }
      },
      err => {
        // const alert = this.alertCtrl.create({
        //   title: "Error",
        //   subTitle: err,
        //   buttons: ["OK"]
        // });
        // alert.present();
        console.log(err);
      }
    );
  }

  async fetch_performance() {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
      let data = JSON.stringify({
        emp_id: this.emp_id.id,
        from_date:this.start_date,
        to_date:this.end_date
      });

      this.authService.postData(data, "fetch_emp_performance").then(
        async result => {
          let responseData = result;
          let data = JSON.parse(responseData["_body"]);

          console.log(data);
          if (data["status"] == "success") {
            this.page='showgraph';
            if(data['performance_array']!=null && 
            data["monthly_date"]!=null &&
            data["performance_array_data"]!=null)
            {
              this.performance_array_data=data["performance_array_data"];
              this.barChartLabels=data["monthly_date"];
              this.barChartData=data["performance_array"];

              console.log(this.barChartData);
            }
            // this.total_sales = data["total_sales"];
            // this.total_incentives = data["incentive_generated"];
            
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

  async show_graph()
  {
    if(this.start_date!=null && this.end_date!=null && this.emp_id!=null)
    {
      this.navCtrl.navigateRoot([EmpPerformancePage,{page:'showgraph',start_date:this.start_date,end_date:this.end_date,emp_id:this.emp_id}]);
      // await this.fetch_performance();
    }
    else
    {
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: 'Please select employee , from date and to date',
        buttons: ["OK"]
      });
      (await alert).present();
    }
  }

  async check_date()
  {
    if(this.start_date!=null && this.start_date!='')
    {
      if(this.end_date<this.start_date)
      {
        this.end_date=null;
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: 'To date cannot be less that from date',
          buttons: ["OK"]
        });
        (await alert).present();
      }
    }
  }
  ngOnInit() {
  }

}
