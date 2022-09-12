import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  ModalOptions,
  Modal,
  ModalController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AuthserviceProvider } from "../../providers/authservice/authservice";

import { TravelEntitlementModalPage } from "../travel-entitlement-modal/travel-entitlement-modal";

@Component({
  selector: "page-travel-entitlement",
  templateUrl: "travel-entitlement.html"
})
export class TravelEntitlementPage {
  page:any="new";
  business_place:any;
  approver: any;
  // booking_place: any;
  gst_no: any;
  data_list= [];
  remark: any;
  main_remark: any;
  fare:any;
  accomodation:any;
  food_allowances:any;
  conveyance_charges:any;
  stationary:any;
  incidental_expenses:any;
  claim_id:any;
  // travel_destination: any;
  responseData: any;
  file_input:any;
  // travel_type_snd: any = "domestic";
  // trip_type_snd: any;
  // start_date_snd: any;
  // origin_snd: any;
  // destination_snd: any;
  emp_id_snd: any;
  // mode_snd: any = "road";
  // prefer_time_snd: any;
  // reason_snd: any;
  useremail_snd: any;
  // cities: any;

  filename: String;
  base64data: any;
  file: File;

  

  emp_id:any;
  //id=0;
  // remark_list:any;
  // file_bsd_list:any;
  public travel_place: Array<{ id: string; name: string }> = [];
  claim_status: any;
  doc_list: any;
  approver_id: any;
  //public travel_place: any = [];
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthserviceProvider,
    private modal: ModalController
  ) {
    this.get_cities();
    this.storage.get('emp_id').then( val => {
      this.emp_id=val;
    });
    this.storage.get("travel_approver_name").then(val => {
      this.approver = val;
    });
    this.storage.get("travel_approver_id").then(approver_id => {
      this.approver_id = approver_id;
    });
    this.storage.get("email").then(val => {
      this.useremail_snd = val;
    });
  }

  ionViewWillEnter()
  {
    console.log("ionViewWillEnter TravelEntitlementPage");
    console.log(this.navParams.get('claim'));
    // if(this.navParams.get('claim'))
    // {
    //   let claim=this.navParams.get('claim');
    //   this.business_place=claim['business_place'];
    //   this.gst_no=claim['gst_no'];
    //   this.claim_id=claim['id'];
    //   this.main_remark=claim['remark'];
    //   this.claim_status=claim['claim_status'];
    //   this.fare=JSON.stringify(claim['fare']);
    //   this.accomodation=JSON.stringify(claim['accomodation']);
    //   this.conveyance_charges=JSON.stringify(claim['conveyance_charges']);
    //   this.food_allowances=JSON.stringify(claim['food_allowances']);
    //   this.stationary=JSON.stringify(claim['stationary']);
    //   this.incidental_expenses=JSON.stringify(claim['incidental_expenses']);
    //   // this.business_place=claim['business_place'];
    //   // this.business_place=claim['business_place'];
    //   this.fetchDataList();
    // }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TravelEntitlementPage");
  }
  get_cities() {
    this.authService.getData("get_cities").then(
      result => {
        this.responseData = result;
        //console.log(this.responseData);
        let data = JSON.parse(this.responseData["_body"]);

        console.log(data);
        if (data["status"] == "success") {
          //this.travel_place = data["cities"];
          for (let i = 0; i < data["cities"].length; i++) {
            this.travel_place.push({
              id: data["cities"][i]["city_id"],
              name:
                data["cities"][i]["city_name"] +
                " (" +
                data["cities"][i]["city_state"] +
                ")"
            });
          }
          console.log(this.travel_place);
        } else {
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // cityChange(city: { component: IonicSelectableComponent; value: any }) {
  //   console.log("city:", city.value);
  // }

  changeListener($event): void {
    if($event.target.files!=null && $event.target.files!='')
    {
      this.file = $event.target.files;
      var reader = new FileReader();
      this.filename = this.file[0].name;
      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(this.file[0]);
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64data = btoa(binaryString); // Converting binary string data.

  }
  add_to_list() {

    this.data_list.push({
      filename: this.filename,
      file: this.base64data,
      remark: this.remark
    });
    console.log(this.data_list);
    this.filename=null;
    this.base64data=null;
    this.remark=null;
    this.file_input="";
  }
  delete_id_list(id) {

    let updated_list=[] ;

    for(let i=0;i<this.data_list.length;i++){
      if(i!=id){
        updated_list.push({
          filename: this.data_list[i]['filename'],
          file: this.data_list[i]['file'],
          remark: this.data_list[i]['remark']
        });
      }
    }
    this.data_list=updated_list;
  }

  openmodal(variablename, myvariable)
  {
    console.log('inside openAddPage')
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
    let jsonvalue='';

    if(myvariable=='fare' && this.fare!=null)
    {
      jsonvalue=this.fare;
    }
    if(myvariable=='accomodation' && this.accomodation!=null)
    {
      jsonvalue=this.accomodation;
    }
    if(myvariable=='food_allowances' && this.food_allowances!=null)
    {
      jsonvalue=this.food_allowances;
    }
    if(myvariable=='conveyance_charges' && this.conveyance_charges!=null)
    {
      jsonvalue=this.conveyance_charges;
    }
    if(myvariable=='stationary' && this.stationary!=null)
    {
      jsonvalue=this.stationary;
    }
    if(myvariable=='incidental_expenses' && this.incidental_expenses!=null)
    {
      jsonvalue=this.incidental_expenses;
    }
    console.log(jsonvalue);
    const myModal: Modal = this.modal.create(TravelEntitlementModalPage, { variablename: variablename, mainvalue: jsonvalue, page_type:'main' }, myModalOptions);
  
    myModal.present();
  
    myModal.onDidDismiss((data,type) => {
      console.log('inside onDidDismiss')
      console.log(data);
      console.log(myvariable);
      if(myvariable=='fare' && type=="submit")
      {
        this.fare=data;
      }
      if(myvariable=='accomodation' && type=="submit")
      {
        this.accomodation=data;
      }
      if(myvariable=='food_allowances' && type=="submit")
      {
        this.food_allowances=data;
      }
      if(myvariable=='conveyance_charges' && type=="submit")
      {
        this.conveyance_charges=data;
      }
      if(myvariable=='stationary' && type=="submit")
      {
        this.stationary=data;
      }
      if(myvariable=='incidental_expenses' && type=="submit")
      {
        this.incidental_expenses=data;
      }
    });
  
    // myModal.onWillDismiss((data) => {
    //   console.log(data);
    //   console.log('inside onWillDismiss')
    // });
    
  }

  submitdata()
  {
    if(this.business_place!='' &&
     this.business_place!=null 
    //  &&
    //  this.data_list!=[] &&
    //  this.data_list!=null &&
    //  this.fare!=null &&
    //  this.fare!='' &&

    //  this.accomodation!=null &&
    //  this.accomodation!='' &&

    //  this.food_allowances!=null &&
    //  this.food_allowances!='' &&

    //  this.stationary!=null &&
    //  this.stationary!='' &&

    //  this.conveyance_charges!=null &&
    //  this.conveyance_charges!='' &&

    //  this.incidental_expenses!=null &&
    //  this.incidental_expenses!='' &&

    //  this.gst_no!=null &&
    //  this.gst_no!=''
     )
     {
       this.raise_travel_entitlement();
     }
     else
     {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: 'Business field is mandatory.',
        buttons: ["OK"]
      });
      alert.present();
     }
  }

  raise_travel_entitlement(){

    // if(this.data_list==[]){

    // }
    //console.log(this.origin_snd["id"]);
    let data=JSON.stringify({
      claim_type:'travel_entitlement',
      business_place:this.business_place.id,      
      emp_id: this.emp_id,
      approver_id: this.approver_id,
      data:this.data_list,
      fare:this.fare,
      accomodation:this.accomodation,
      food_allowances:this.food_allowances,
      conveyance_charges:this.conveyance_charges,
      stationary:this.stationary,
      incidental_expenses:this.incidental_expenses,
      gst_no:this.gst_no,
      data_list:this.data_list,
      // travel_type:this.travel_type_snd,
      // trip_type:this.trip_type_snd,
      // start_date:this.start_date_snd,
      // origin:this.origin_snd["id"],
      // destination:this.destination_snd["id"],
      // mode:this.mode_snd,
      // prefer_time:this.prefer_time_snd,
      remark:this.main_remark,
      useremail:this.useremail_snd
    });

    console.log(data);
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.authService.postData(data, "raise_claim/submit").then(
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
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.get_cities();
    refresher.complete();

    setTimeout(() => {
      console.log("Async operation has ended");
    }, 2000);
  }

}
