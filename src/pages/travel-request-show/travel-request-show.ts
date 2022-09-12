import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  ModalController,
  ModalOptions,
  Modal
} from "ionic-angular";
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { Storage } from "@ionic/storage";
import { TravelReimbersmentModalPage } from "../travel-reimbersment-modal/travel-reimbersment-modal";
import { TravelDeskModalPage } from "../travel-desk-modal/travel-desk-modal";

@Component({
  selector: "page-travel-request-show",
  templateUrl: "travel-request-show.html"
})
export class TravelRequestShowPage {
  travel_request_details: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthserviceProvider,
    public alertCtrl: AlertController,
    private modal: ModalController
  ) {}

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);

    this.storage.get("emp_id").then(emp_id => {
      this.storage.get("email").then(email => {
        this.storage.get("role").then(role => {
          this.storage.get("branch_location_id").then(branch_location_id => {
            this.storage.get("designation").then(designation => {
              this.fetchTravelRequest(
                emp_id,
                email,
                role,
                branch_location_id,
                designation
              );
              refresher.complete();

              setTimeout(() => {
                console.log("Async operation has ended");
              }, 2000);
            });
          });
        });
      });
    });
  }
  async ionViewDidLoad() {
    console.log("ionViewDidLoad TravelRequestShowPage");
    await this.storage.get("emp_id").then(emp_id => {
      this.storage.get("email").then(email => {
        this.storage.get("role").then(role => {
          this.storage.get("branch_location_id").then(branch_location_id => {
            this.storage.get("designation").then(async designation => {
              await this.fetchTravelRequest(
                emp_id,
                email,
                role,
                branch_location_id,
                designation
              );
            });
          });
        });
      });
    });
    
    // for(let i=0;i<this.travel_request_details.length;i++){
    //   if(this.travel_request_details[i]['travel_booking_status']!='booked' || 
    //   this.travel_request_details[i]['travel_booking_status']!='closed' ||
    //   this.travel_request_details[i]['travel_booking_status']!='rejected')
    //   {
    //     this.fetch_booking_docs(i,this.travel_request_details[i]['id'])
    //   }
    //   else
    //   {
    //     this.travel_request_details[i]['travel_booking_docs']=[];
    //   }
    // }
  }

  fetchTravelRequest(emp_id, email, role, branch_location_id, designation) {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let data = JSON.stringify({
      emp_id: emp_id,
      useremail: email,
      role: role,
      branch_location_id: branch_location_id,
      designation: designation
    });
    console.log(data);
    this.authService.postData(data, "travel_request").then(
      result => {
        let responseData = result;
        let data = JSON.parse(responseData["_body"]);
        /// console.log(responseData);
        console.log(data);
        if (data["status"] == "success") {
          this.travel_request_details = data["my_request"];
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
  }

  upload_doc_list(order_id) {
    let data = {
      order_id: order_id
    };
    this.navCtrl.push(TravelReimbersmentModalPage, data);
  }

  async open_booking_detail(index)
  {
    // await this.fetch_booking_docs(index,this.travel_request_details[index]['id']);
    
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
   
    const myModal: Modal = this.modal.create(TravelDeskModalPage, { travel_detail: this.travel_request_details[index], type:'emp_page' }, myModalOptions);
  
    myModal.present();
  
    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      this.ionViewDidLoad();
      console.log(data);
    });
  
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
    });

    //this.navCtrl.push(TravelDeskModalPage, this.travel_request_details[index]);
  }
}
