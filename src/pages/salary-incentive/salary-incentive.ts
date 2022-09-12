import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { Slides } from 'ionic-angular';
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { ViewChild } from '@angular/core';

@Component({
  selector: "page-salary-incentive",
  templateUrl: "salary-incentive.html"
})
export class SalaryIncentivePage {
  
  emp_id:any;
  department:any;
  sal121: any;
  i2: any;
  total_sales: any;
  effective_sales: any;
  total_incentives: any;
  total_target_acheived: any;
  total_sales_incentive_array:any;
  id_array:any;
  master_array:any;
  j=0;
  home = "incentive_tab";
  public lineChartData:any;
  public lineChartData1:any;
  public lineChartData2:any;
  public target_array:any; 
  public lineChartLabels:Array<any>;
  public lineChartLabels1:Array<any>;
  public lineChartLabels2:Array<any>;
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  public lineChartOptions:any = {
    responsive: true
  };
  
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(255,51,153,0.2)',
      borderColor: 'rgba(255,51,153,1)',
      pointBackgroundColor: 'rgba(255,51,153,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,51,153,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(0,128,255,0.2)',
      borderColor: 'rgba(0,128,255,1)',
      pointBackgroundColor: 'rgba(0,128,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,128,255,1)'
    },
    { // grey
      backgroundColor: 'rgba(243,166,12,0.2)',
      borderColor: 'rgba(243,166,12,1)',
      pointBackgroundColor: 'rgba(243,166,12,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(243,166,12,0.8)'
    }
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController
  ) {
    this.home = "incentive_tab";
    this.storage.get("department").then(dep => {
      this.department = dep;
    });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad SalaryIncentivePage");
 
    this.fetch_incentive();

    this.storage.get("salary").then(val => {
      console.log('this.storage.get("salary").then(val =>');
      if(val!=null)
      for (var j = 0; j < val.length; j++) {
        console.log(val[j]["month"] + "   " + val[j]["net_payable"]);
        if (val[j]["month"] == "1") {
          val[j]["month"] = "January";
        } else if (val[j]["month"] == "2") {
          val[j]["month"] = "February";
        } else if (val[j]["month"] == "3") {
          val[j]["month"] = "March";
        } else if (val[j]["month"] == "4") {
          val[j]["month"] = "April";
        } else if (val[j]["month"] == "5") {
          val[j]["month"] = "May";
        } else if (val[j]["month"] == "6") {
          val[j]["month"] = "June";
        } else if (val[j]["month"] == "7") {
          val[j]["month"] = "July";
        } else if (val[j]["month"] == "8") {
          val[j]["month"] = "August";
        } else if (val[j]["month"] == "9") {
          val[j]["month"] = "September";
        } else if (val[j]["month"] == "10") {
          val[j]["month"] = "October";
        } else if (val[j]["month"] == "11") {
          val[j]["month"] = "November";
        } else if (val[j]["month"] == "12") {
          val[j]["month"] = "December";
        }
      }
      this.sal121 = val;
      this.i2 = 1;   
    });

  
   
  }
  fetch_incentive() {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();



    this.storage.get("emp_id").then(emp => {
      let data = JSON.stringify({
        emp_id: emp
      });

      this.authService.postData(data, "fetch_all_incentives_new").then(
        result => {
          let responseData = result;
          let data = JSON.parse(responseData["_body"]);

          console.log(data);
          if (data["status"] == "success") {

    
            this.total_sales = data["total_sales"];
            this.total_incentives = data["incentive_generated"];
            this.total_sales_incentive_array=data["total_sales_incentive_array"];
            this.lineChartLabels=data["monthly_dates"];
            this.lineChartData=data["incentive_array"];
            this.lineChartLabels1=data["target_date_array"];
            this.lineChartData1=data["daily_target_array"];
            this.lineChartLabels2=data["week_array"];
            this.lineChartData2=data["weekly_target_array"];  
            this.target_array=data["target_array"]; 
            this.master_array=data["master_array"];  
            this.id_array=this.master_array[0]['id'];
          console.log("linechartdata"+this.master_array[0]['id']);
               
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
    });

  }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }
}
