import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AuthService } from '../services/auth/auth.service';
import { TravelEntitlementModalPage } from '../travel-entitlement-modal/travel-entitlement-modal.page'; 

@Component({
  selector: 'app-business',
  templateUrl: './business.page.html',
  styleUrls: ['./business.page.scss'],
})
export class BusinessPage implements OnInit {
  page:any="new";
  business_place:any;
  approver: any;
  month:any;
  year:any;
  start_year:number;
  end_year:number;
  years:any=[];
  gst_no  : any;
  data_list= [];
  remark: any;
  main_remark: any;
  mobile_bill:any;
  hand_set:any;
  food_allowances:any;
  conveyance_charges:any;
  postal_courier:any;
  internet:any;
  registration:any;
  stationary:any;
  incidental_expenses:any;
  claim_id:any;
  file_input:any;
  emp_id_snd: any;
  useremail_snd: any;
  filename: String;
  base64data: any;
  file: File;
  emp_id:any;
  public travel_place: Array<{ id: string; name: string }> = [];
  claim_status: any;
  doc_list: any;
  approver_id: any;
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    private modalCtrl: ModalController,
  ) 
  {
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
    this.year=new Date().toISOString().substring(0,4);
    console.log('year')
    console.log(this.year);
    this.start_year=parseInt(this.year)-10;
    this.end_year=parseInt(this.year)+10;

    for(let i=this.start_year;i<=this.end_year;i++)
    {
      console.log(i)
      this.years.push(i);
    }
    console.log(this.years)
  }

  get_cities() {
    this.authService.getData("get_cities").then(data => {
        console.log(data);

        if (data["status"] == "success") {
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

  async openmodal(variablename, myvariable)
  {
    console.log('inside openAddPage')
    let jsonvalue='';

    if(myvariable=='mobile_bill' && this.mobile_bill!=null)
    {
      jsonvalue=this.mobile_bill;
    }
    if(myvariable=='hand_set' && this.hand_set!=null)
    {
      jsonvalue=this.hand_set;
    }
    if(myvariable=='food_allowances' && this.food_allowances!=null)
    {
      jsonvalue=this.food_allowances;
    }
    if(myvariable=='conveyance_charges' && this.conveyance_charges!=null)
    {
      jsonvalue=this.conveyance_charges;
    }
    if(myvariable=='postal_courier' && this.postal_courier!=null)
    {
      jsonvalue=this.postal_courier;
    }
    if(myvariable=='internet' && this.internet!=null)
    {
      jsonvalue=this.internet;
    }
    if(myvariable=='registration' && this.registration!=null)
    {
      jsonvalue=this.registration;
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
    const myModal = await this.modalCtrl.create({component:TravelEntitlementModalPage,backdropDismiss: true, componentProps:{ variablename: variablename, mainvalue: jsonvalue, page_type:'main' }});

    (await myModal).present();
  
    myModal.onDidDismiss().then((type) => {
      console.log('inside onDidDismiss')
      console.log(type.data);
      console.log(myvariable);
      if(myvariable=='mobile_bill' && type=="submit")
      {
        this.mobile_bill=type.data;
      }
      if(myvariable=='hand_set' && type=="submit")
      {
        this.hand_set=type.data;
      }
      if(myvariable=='food_allowances' && type=="submit")
      {
        this.food_allowances=type.data;
      }
      if(myvariable=='conveyance_charges' && type=="submit")
      {
        this.conveyance_charges=type.data;
      }
      if(myvariable=='postal_courier' && type=="submit")
      {
        this.postal_courier=type.data;
      }
      if(myvariable=='internet' && type=="submit")
      {
        this.internet=type.data;
      }
      if(myvariable=='registration' && type=="submit")
      {
        this.registration=type.data;
      }
      if(myvariable=='stationary' && type=="submit")
      {
        this.stationary=type.data;
      }
      if(myvariable=='incidental_expenses' && type=="submit")
      {
        this.incidental_expenses=type.data;
      }
    });
  }

  async submitdata()
  {
    if(this.business_place!='' &&
     this.business_place!=null 
     )
     {
       this.raise_travel_entitlement();
     }
     else
     {
      const alert = this.alertCtrl.create({
        header: "Error",
        message: 'Business field is mandatory.',
        buttons: ["OK"]
      });
      (await alert).present();
     }
  }

  async raise_travel_entitlement(){
    console.log('inside raise_travel_entitlement')
    let data=JSON.stringify({
      claim_type:'business_entitlement',
      business_place:this.business_place.id,
      month:this.month,
      year:this.year,    
      emp_id: this.emp_id,
      approver_id: this.approver_id,
      data:this.data_list,
      mobile_bill:this.mobile_bill,
      hand_set:this.hand_set,
      food_allowances:this.food_allowances,
      conveyance_charges:this.conveyance_charges,
      postal_courier:this.postal_courier,
      internet:this.internet,
      registration:this.registration,
      stationary:this.stationary,
      incidental_expenses:this.incidental_expenses,
      gst_no:this.gst_no,
      data_list:this.data_list,
      remark:this.main_remark,
      useremail:this.useremail_snd
    });

    console.log(data);
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    
    this.authService.postData(data, "raise_claim_business/submit").then(async data => {
        console.log(data);

        if (data["status"] == "success") {
          const alert = this.alertCtrl.create({
            header: "Success",
            message: "Travel Request raised successfully.",
            buttons: ["OK"]
          });
          (await loader).dismiss();
          (await alert).present();
          console.log(data["msg"]);
          this.navCtrl.pop();
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          (await loader).dismiss();
          (await alert).present();
          console.log(data["msg"]);
        }
      },
      async err => {
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: "Process failed, please try after sometime.",
          buttons: ["OK"]
        });
        (await loader).dismiss();
        (await alert).present();
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

  ngOnInit() {
  }
}
