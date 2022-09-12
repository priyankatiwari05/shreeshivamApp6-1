import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  ModalOptions,
  Modal,
  ModalController,
  ToastController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { ClaimsDetailPage } from "../claims-detail/claims-detail";
import { AskHrFormPage } from "../ask-hr-form/ask-hr-form";

@Component({
  selector: 'page-claim-requests',
  templateUrl: 'claim-requests.html',
})
export class ClaimRequestsPage {
  emp_id:any;
  claims:any;
  page_type: any;
  designation: any;
  role: any;
  branch_location_id: any;
  designation_id: any;
  home='';
  claims_accountant: any;
  mode: any='';
  description: string='';
  constructor(public navCtrl: NavController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthserviceProvider,
    private modal: ModalController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClaimRequestsPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ClaimRequestsPage');
    this.page_type=this.navParams.get('page_type');
    console.log('page_type '+this.page_type);
    this.storage.get('designation').then(designation=>{
      this.designation=designation;
    });
    this.storage.get('designation_id').then(designation_id=>{
      this.designation_id=designation_id;
    });
    this.storage.get('role').then(role=>{
      this.role=role;
      if(role=='accountant')
        this.home='reimbursement';
    });
    this.storage.get('branch_location_id').then(branch_location_id=>{
      this.branch_location_id=branch_location_id;
    });
    this.storage.get('emp_id').then(emp_id=>{
      this.emp_id=emp_id;
      this.fetchClaims();
    });
    
  }

  fetchClaims()
  {
    let data=JSON.stringify({
      emp_id:this.emp_id,
      role:this.role,
      designation:this.designation,
      designation_id:this.designation_id,
      fetch_for:this.page_type
    });

    console.log(data);
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.authService.postData(data, "fetch_claims").then(
      result => {
        let responseData = result;
        console.log(responseData);
        let data = JSON.parse(responseData["_body"]);
        console.log(data);
        if (data["status"] == "success") {
          this.claims=data['claims'];
          this.claims_accountant=data['claims_accountant'];
          console.log(this.claims_accountant);
          for(let i=0;i<this.claims.length;i++)
          {
            let fare = 0;
            let mobile_bill = 0;
            let hand_set = 0;
            let accomodation = 0;
            let food_allowances = 0;
            let conveyance_charges = 0;
            let postal_courier = 0;
            let internet = 0;
            let registration = 0;
            let stationary = 0;
            let incidental_expenses = 0;
            let total_amount=0;

            // this.claims[i]['title']=this.claims[i]['title'].Replace('_',' ');
            // if(this.claims[i]['fare']!=null)
            // this.claims[i]['fare']=JSON.stringify(this.claims[i]['fare']);

            // if(this.claims[i]['mobile_bill']!=null)
            //   this.claims[i]['mobile_bill']=JSON.stringify(this.claims[i]['mobile_bill']);

            // if(this.claims[i]['hand_set']!=null)
            //   this.claims[i]['hand_set']=JSON.stringify(this.claims[i]['hand_set']);

            // if(this.claims[i]['accomodation']!=null)
            //   this.claims[i]['accomodation']=JSON.stringify(this.claims[i]['accomodation']);

            // if(this.claims[i]['conveyance_charges']!=null)
            //   this.claims[i]['conveyance_charges']=JSON.stringify(this.claims[i]['conveyance_charges']);

            // if(this.claims[i]['food_allowances']!=null)
            //   this.claims[i]['food_allowances']=JSON.stringify(this.claims[i]['food_allowances']);

            // if(this.claims[i]['postal_courier']!=null)
            //   this.claims[i]['postal_courier']=JSON.stringify(this.claims[i]['postal_courier']);

            // if(this.claims[i]['internet']!=null)
            //   this.claims[i]['internet']=JSON.stringify(this.claims[i]['internet']);
            
            // if(this.claims[i]['registration']!=null)
            //   this.claims[i]['registration']=JSON.stringify(this.claims[i]['registration']);

            // if(this.claims[i]['stationary']!=null)
            //   this.claims[i]['stationary']=JSON.stringify(this.claims[i]['stationary']);
            
            // if(this.claims[i]['incidental_expenses']!=null)
            //   this.claims[i]['incidental_expenses']=JSON.stringify(this.claims[i]['incidental_expenses']);

            this.claims[i]['fare']=JSON.parse(this.claims[i]['fare']);
            this.claims[i]['accomodation']=JSON.parse(this.claims[i]['accomodation']);
            this.claims[i]['mobile_bill']=JSON.parse(this.claims[i]['mobile_bill']);
            this.claims[i]['hand_set']=JSON.parse(this.claims[i]['hand_set']);
            this.claims[i]['food_allowances']=JSON.parse(this.claims[i]['food_allowances']);
            this.claims[i]['conveyance_charges']=JSON.parse(this.claims[i]['conveyance_charges']);
            this.claims[i]['postal_courier']=JSON.parse(this.claims[i]['postal_courier']);
            this.claims[i]['internet']=JSON.parse(this.claims[i]['internet']);
            this.claims[i]['registration']=JSON.parse(this.claims[i]['registration']);
            this.claims[i]['stationary']=JSON.parse(this.claims[i]['stationary']);
            this.claims[i]['incidental_expenses']=JSON.parse(this.claims[i]['incidental_expenses']);

            console.log("typeof this.claims[i]['fare']");
            console.log(typeof this.claims[i]['fare']);

            if(this.claims[i]['fare']!=null)
              for(let j=0; j<this.claims[i]['fare'].length;j++)
              {
                fare+=parseInt(this.claims[i]['fare'][j]['total_amount']);
              }
            if(this.claims[i]['accomodation']!=null)
              for(let j=0; j<this.claims[i]['accomodation'].length;j++)
              {
                accomodation+=parseInt(this.claims[i]['accomodation'][j]['total_amount']);
              }
            if(this.claims[i]['mobile_bill']!=null)
              for(let j=0; j<this.claims[i]['mobile_bill'].length;j++)
              {
                mobile_bill+=parseInt(this.claims[i]['mobile_bill'][j]['total_amount']);
              }
            if(this.claims[i]['hand_set']!=null)
              for(let j=0; j<this.claims[i]['hand_set'].length;j++)
              {
                hand_set+=parseInt(this.claims[i]['hand_set'][j]['total_amount']);
              }
            if(this.claims[i]['food_allowances']!=null)
              for(let j=0; j<this.claims[i]['food_allowances'].length;j++)
              {
                food_allowances+=parseInt(this.claims[i]['food_allowances'][j]['total_amount']);
              }
            if(this.claims[i]['conveyance_charges']!=null)
              for(let j=0; j<this.claims[i]['conveyance_charges'].length;j++)
              {
                conveyance_charges+=parseInt(this.claims[i]['conveyance_charges'][j]['total_amount']);
              }
            if(this.claims[i]['postal_courier']!=null)
              for(let j=0; j<this.claims[i]['postal_courier'].length;j++)
              {
                postal_courier+=parseInt(this.claims[i]['postal_courier'][j]['total_amount']);
              }
            if(this.claims[i]['internet']!=null)
              for(let j=0; j<this.claims[i]['internet'].length;j++)
              {
                internet+=parseInt(this.claims[i]['internet'][j]['total_amount']);
              }
            if(this.claims[i]['registration']!=null)
              for(let j=0; j<this.claims[i]['registration'].length;j++)
              {
                registration+=parseInt(this.claims[i]['registration'][j]['total_amount']);
              }
            if(this.claims[i]['stationary']!=null)
              for(let j=0; j<this.claims[i]['stationary'].length;j++)
              {
                stationary+=parseInt(this.claims[i]['stationary'][j]['total_amount']);
              }
            if(this.claims[i]['incidental_expenses']!=null)
              for(let j=0; j<this.claims[i]['incidental_expenses'].length;j++)
              {
                incidental_expenses+=parseInt(this.claims[i]['incidental_expenses'][j]['total_amount']);
              }
            
            this.claims[i]['total_amount']=fare+accomodation+mobile_bill+hand_set+food_allowances+conveyance_charges+postal_courier+internet+registration+stationary+incidental_expenses;
            this.claims[i]['fare_amount']=fare;
            this.claims[i]['mobile_bill_amount']=mobile_bill;
            this.claims[i]['hand_set_amount']=hand_set;
            this.claims[i]['accomodation_amount']=accomodation;
            this.claims[i]['food_allowances_amount']=food_allowances;
            this.claims[i]['conveyance_charges_amount']=conveyance_charges;
            this.claims[i]['postal_courier_amount']=postal_courier;
            this.claims[i]['internet_amount']=internet;
            this.claims[i]['registration_amount']=registration;
            this.claims[i]['stationary_amount']=stationary;
            this.claims[i]['incidental_expenses_amount']=incidental_expenses;
            console.log(this.claims[i]['fare'])
            console.log(this.claims[i]['mobile_bill'])
            console.log(this.claims[i]['hand_set'])
            console.log(this.claims[i]['accomodation'])
            console.log(this.claims[i]['food_allowances'])
            console.log(this.claims[i]['conveyance_charges'])
            console.log(this.claims[i]['postal_courier'])
            console.log(this.claims[i]['internet'])
            console.log(this.claims[i]['registration'])
            console.log(this.claims[i]['stationary'])
            console.log(this.claims[i]['incidental_expenses'])
            console.log(this.claims[i]['total_amount'])
          }
          loader.dismissAll();
          console.log(data["msg"]);
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

  show(index,type)
  {
    let myclaim=null;
    if(type=='caim')
    myclaim=this.claims[index];
    else
    myclaim=this.claims_accountant[index];
    console.log('inside show function')
    console.log(this.claims)
    this.navCtrl.push(ClaimsDetailPage,{claim:myclaim,page_type:'showclaim'});
  }

  presentalert(id,status,status_field,page_title)
  {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
    const myModal: Modal = this.modal.create(AskHrFormPage, { page_type:'reimbursement',page_title:page_title }, myModalOptions);
  
    myModal.present();
  
    myModal.onDidDismiss((mode,description) => {
      console.log("I have dismissed.");
      this.mode=mode;
      this.description=description;
       console.log(mode);
       console.log(description);
       if(page_title=='Approve' && this.mode!='' && this.description!='' && this.mode!=null && this.description!=null)
        this.submitstatus(id,status,status_field)
       if(page_title=='Reject' && this.description!='' && this.description!=null)
        this.submitstatus(id,status,status_field)
    });
  
    myModal.onWillDismiss((mode,description) => {
      console.log("I'm about to dismiss");
    });
  }

  submitstatus(id,status,status_field)
  {
    console.log(id);
    console.log(status);
    console.log(status_field);

    let data=JSON.stringify({
      emp_id:this.emp_id,
      claim_id:id,
      status:status,
      status_field:status_field,
      mode:this.mode,
      description:this.description
    });

    console.log(data);
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.authService.postData(data, "update_claim_status").then(
      result => {
        let responseData = result;
        console.log(responseData);
        let data = JSON.parse(responseData["_body"]);
        console.log(data);
        if (data["status"] == "success") {
          const toast = this.toastCtrl.create({
            message: "Status Updated",
            duration: 2000
          });
          toast.present();
          this.ionViewWillEnter();
          console.log(data["msg"]);
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
}
