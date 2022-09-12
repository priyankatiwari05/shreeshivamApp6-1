import { Component } from "@angular/core";
import { NavController, NavParams, AlertController, LoadingController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: "page-travel-request",
  templateUrl: "travel-request.html"
})
export class TravelRequestPage {
  booking_for: any;
  trip_type: any;
  travel_origin: any;
  travel_destination: any;
  responseData: any;
  hotel_planning:any;
  hotel_preferred:any;
  occupancy:any;
  express_booking:any;
  travel_type_snd: any="domestic";
  trip_type_snd: any;
  start_date_snd: any;
  origin_snd: any;
  destination_snd: any;
  emp_id_snd: any;
  mode_snd: any="road";
  prefer_time_snd: any;
  reason_snd: any;
  useremail_snd: any;
  cities:any;
  today:any;
  next_year:any;
  public travel_place:Array<{id:string,name:string}>=[];
  end_date: string;
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthserviceProvider,
  ) {
    this.today=new Date().toISOString().slice(0, 10);


    let nextyear= new Date().getFullYear()+1;
    this.next_year=nextyear+"-"+this.today.slice(5, 7)+"-"+this.today.slice(8, 10);


    this.storage.get("username").then(val => {
      this.booking_for = val;
    });
    this.storage.get("trip_type").then(val1 => {
      this.trip_type = val1;
      console.log(val1);
    });
    // this.storage.get("travel_origin").then(val2 => {
    //   this.travel_origin = val2;
    //   console.log(val2);
    // });
    // this.storage.get("travel_destination").then(val3 => {
    //   this.travel_destination = val3;
    //   console.log(val3);
    // });

    this.get_cities();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TravelRequestPage");
    console.log(this.today);
  }

  get_cities()
  {
    this.authService.getData("get_cities").then(
      result => {
        this.responseData = result;
        console.log(this.responseData);
        let data = JSON.parse(this.responseData["_body"]);

        console.log(data);
        if (data["status"] == "success") {
          this.cities=data['cities'];
          for(let i=0;i<this.cities.length;i++)
          {
            this.travel_place.push({id:this.cities[i]['city_id'],name:this.cities[i]['city_name']+' ('+this.cities[i]['city_state']+')'});
          }
          console.log(this.travel_place);
        } else {


        }
      },
      err => {
        console.log(err);
      }
    );
      // this.storage.get("travel_place").then(val =>{
      //   this.travel_place=val;
      // });

  }
  raise_travel_request() {
    console.log('inside raise_travel_request');
    if (this.travel_type_snd === "") {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Please Select Travel Type",
        buttons: ["OK"]
      });
      alert.present();
    } else if (this.trip_type_snd === "") {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Please select Trip Type",
        buttons: ["OK"]
      });
      alert.present();
    } else if (this.start_date_snd === "") {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Please select Start Date",
        buttons: ["OK"]
      });

      alert.present();
    } else if (this.end_date === "") {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Please select End Date",
        buttons: ["OK"]
      });

      alert.present();
    } else if (this.origin_snd === "") {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Please select Origin",
        buttons: ["OK"]
      });

      alert.present();
    } else if (this.mode_snd === "") {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Please select Mode",
        buttons: ["OK"]
      });

      alert.present();
    } else if (this.prefer_time_snd === "") {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Please enter Prefered Time",
        buttons: ["OK"]
      });

      alert.present();
    } else if (this.reason_snd === "") {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Please enter Reason",
        buttons: ["OK"]
      });

      alert.present();
    } else if (this.destination_snd ==="") {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Please Select Destination",
        buttons: ["OK"]
      });

      alert.present();
    } else if (this.hotel_planning ==true  && this.occupancy=='') {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: "Please select occupancy",
          buttons: ["OK"]
        });
        alert.present();

    } else {
      console.log(this.travel_type_snd);
      console.log(this.trip_type_snd);
      console.log(this.origin_snd);
      console.log(this.destination_snd);

      this.storage.get("email").then(email => {
        this.storage.get("emp_id").then(emp_id => {
          let data = JSON.stringify({
            emp_id: emp_id,
            travel_type:this.travel_type_snd,
            trip_type:this.trip_type_snd,
            start_date:this.start_date_snd,
            end_date:this.end_date,
            origin:this.origin_snd,
            destination:this.destination_snd,
            mode:this.mode_snd,
            prefer_time:this.prefer_time_snd,
            reason:this.reason_snd,
            hotel_planning:this.hotel_planning,
            hotel_preferred:this.hotel_preferred,
            occupancy:this.occupancy,
            express_booking:this.express_booking,
            useremail:email
          });
          const loader = this.loadingCtrl.create({
            content: "Please wait..."
          });
          loader.present();

          this.authService.postData(data, "travel_request/submit").then(
            result => {
              this.responseData = result;
              console.log(this.responseData);
              let data = JSON.parse(this.responseData["_body"]);

              console.log(data);
              if (data["status"] == "success") {
                const alert = this.alertCtrl.create({
                  title: "Success",
                  subTitle: "Travel Request raised successfully.",
                  buttons: ["OK"]
                });
                loader.dismissAll();
                alert.present();
                console.log(data["msg"]);
                this.navCtrl.pop();
              } else {
                const alert = this.alertCtrl.create({
                  title: "Error",
                  subTitle: data["msg"],
                  buttons: ["OK"]
                });
                loader.dismissAll();
                alert.present();
                console.log(data["msg"]);
              }
            },
            err => {
              const alert = this.alertCtrl.create({
                title: "Error",
                subTitle: "Process failed, please try after sometime.",
                buttons: ["OK"]
              });
              loader.dismissAll();
              alert.present();
              console.log(err);
            }
          );
        });
      });
    }
  }
  cityChange(city: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('city:', city.value);
  }

}
