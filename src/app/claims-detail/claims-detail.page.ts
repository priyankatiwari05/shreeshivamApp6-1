import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController } from '@ionic/angular'; 
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { Storage } from '@ionic/storage-angular';
import { AskHrFormPage } from '../ask-hr-form/ask-hr-form.page';
import { GlobalVarsService } from '../services/global-vars/global-vars.service';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-claims-detail',
  templateUrl: './claims-detail.page.html',
  styleUrls: ['./claims-detail.page.scss'],
})
export class ClaimsDetailPage implements OnInit {
  base_path = GlobalVarsService.base_path;
  emp_name:any;
  claim_approver_name:any;
  reimbursement_approver_name:any;
  is_gallery:any;
  page_type: any;
  gallery_id: any;
  gallerypics: any;
  business_place: any;
  gst_no: any;
  main_remark: any;
  claim_id: any;
  claim_status: any;
  year: any;
  month: any;
  fare: string;
  accomodation: string;
  mobile_bill: string;
  hand_set: string;
  conveyance_charges: string;
  food_allowances: string;
  postal_courier: string;
  internet: string;
  registration: string;
  stationary: string;
  incidental_expenses: string;
  doc_list: any;
  city_state: any;
  city_name: any;
  fare_amount: any;
  mobile_bill_amount: any;
  hand_set_amount: any;
  accomodation_amount: any;
  conveyance_charges_amount: any;
  food_allowances_amount: any;
  postal_courier_amount: any;
  internet_amount: any;
  registration_amount: any;
  stationary_amount: any;
  incidental_expenses_amount: any;
  total_amount: any;
  variablename: any;
  jsonvalue: any;
  date: any;
  inv_serial_no: any;
  vendor_name: any;
  vendor_gst: any;
  file: any;
  filename: any;
  basic_amount: any;
  cgst_amount: any;
  mainvalue: any;
  sgst_amount: any;
  igst_amount: any;
  igst_applicable: any;
  item_total_amount: any;
  claim_type: string;
  reimbursement_status:any;
  
  constructor(public navCtrl: NavController,  private photoViewer: PhotoViewer,
    public route: ActivatedRoute,
     public storage:Storage,
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    private modal: ModalController,
    public mdlCtrl: ModalController) {
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter ClaimsDetailPage');
    this.page_type=this.route.snapshot.paramMap.get('page_type');
    if(this.page_type=='showdetail' || this.page_type=='showjson')
    {
      this.variablename=this.route.snapshot.paramMap.get('variablename');
      // if(this.page_type=='main')
      // {
        if(this.route.snapshot.paramMap.get('mainvalue')!=null && this.route.snapshot.paramMap.get('mainvalue')!='')
          this.mainvalue=JSON.parse(this.route.snapshot.paramMap.get('mainvalue'));
      // }
      else
      {
        if(this.route.snapshot.paramMap.get('jsonvalue')!='' && this.route.snapshot.paramMap.get('jsonvalue')!=null)
        {
          this.jsonvalue=JSON.parse(this.route.snapshot.paramMap.get('jsonvalue'));
        
          console.log('inside if condition')
          this.date=this.jsonvalue.date;
          this.inv_serial_no=this.jsonvalue.inv_serial_no;
          this.vendor_name=this.jsonvalue.vendor_name;
          this.vendor_gst=this.jsonvalue.vendor_gst;
          // this.data_list=this.jsonvalue.file_list;
          this.file=this.jsonvalue.file;
          // this.filename=this.jsonvalue.filename;
          this.basic_amount=this.jsonvalue.basic_amount;
          this.cgst_amount=this.jsonvalue.cgst_amount;
          this.sgst_amount=this.jsonvalue.sgst_amount;
          this.igst_amount=this.jsonvalue.igst_amount;
          this.igst_applicable=this.jsonvalue.igst_applicable;
          this.item_total_amount=this.jsonvalue.total_amount;
        }
      }
    }
    if(this.route.snapshot.paramMap.get('claim'))
    {
      let claim=this.route.snapshot.paramMap.get('claim');
      console.log(claim);
      this.business_place=claim['business_place'];
      this.year=claim['year'];
      // this.month=claim['month'];

      if(claim['month']==1)
      this.month='January';
      if(claim['month']==2)
      this.month='February';
      if(claim['month']==3)
      this.month='March';
      if(claim['month']==4)
      this.month='April';
      if(claim['month']==5)
      this.month='May';
      if(claim['month']==6)
      this.month='June';
      if(claim['month']==7)
      this.month='July';
      if(claim['month']==8)
      this.month='August';
      if(claim['month']==9)
      this.month='September';
      if(claim['month']==10)
      this.month='October';
      if(claim['month']==11)
      this.month='November';
      if(claim['month']==12)
      this.month='December';

      this.gst_no=claim['gst_no'];
      this.claim_id=claim['id'];
      this.claim_type=claim['claim_type'];
      console.log(this.claim_type);
      this.main_remark=claim['remark'];
      // this.emp_name=claim['emp_first_name']+" "+claim['emp_last_name'];
      
      if(claim['emp_first_name']!=null)
        this.emp_name=claim['emp_first_name'];
      if(claim['emp_last_name']!=null)
        this.emp_name+=" "+claim['emp_last_name'];

      if(claim['reimbursement_status']!=null)
        this.reimbursement_status=claim['reimbursement_status'];

      if(claim['reimbursement_first_name']!=null)
        this.reimbursement_approver_name=claim['reimbursement_first_name'];
      if(claim['reimbursement_last_name']!=null)
        this.reimbursement_approver_name+=" "+claim['reimbursement_last_name'];

      if(claim['claim_first_name']!=null)
        this.claim_approver_name=claim['claim_first_name'];
      if(claim['claim_last_name']!=null)
        this.claim_approver_name+=" "+claim['claim_last_name'];

      // this.reimbursement_approver_name=claim['reimbursement_first_name']+" "+claim['reimbursement_last_name'];
      this.city_state=claim['city_state'];
      this.city_name=claim['city_name'];
      this.fare_amount=claim['fare_amount'];
      this.mobile_bill_amount=claim['mobile_bill_amount'];
      this.hand_set_amount=claim['hand_set_amount'];
      this.accomodation_amount=claim['accomodation_amount'];
      this.conveyance_charges_amount=claim['conveyance_charges_amount'];
      this.food_allowances_amount=claim['food_allowances_amount'];
      this.postal_courier_amount=claim['postal_courier_amount'];
      this.internet_amount=claim['internet_amount'];
      this.registration_amount=claim['registration_amount'];
      this.stationary_amount=claim['stationary_amount'];
      this.incidental_expenses_amount=claim['incidental_expenses_amount'];
      this.total_amount=claim['total_amount'];
      this.claim_status=claim['claim_status'];
      
      if(claim['fare']!=null)
        this.fare=JSON.stringify(claim['fare']);

      if(claim['mobile_bill']!=null)
        this.mobile_bill=JSON.stringify(claim['mobile_bill']);

      if(claim['hand_set']!=null)
        this.hand_set=JSON.stringify(claim['hand_set']);

      if(claim['accomodation']!=null)
        this.accomodation=JSON.stringify(claim['accomodation']);

      if(claim['conveyance_charges']!=null)
        this.conveyance_charges=JSON.stringify(claim['conveyance_charges']);

      if(claim['food_allowances']!=null)
        this.food_allowances=JSON.stringify(claim['food_allowances']);

      if(claim['postal_courier']!=null)
        this.postal_courier=JSON.stringify(claim['postal_courier']);

      if(claim['internet']!=null)
        this.internet=JSON.stringify(claim['internet']);
      
      if(claim['registration']!=null)
        this.registration=JSON.stringify(claim['registration']);

      if(claim['stationary']!=null)
        this.stationary=JSON.stringify(claim['stationary']);

      if(claim['incidental_expenses']!=null)
        this.incidental_expenses=JSON.stringify(claim['incidental_expenses']);
      // this.business_place=claim['business_place'];
      // this.business_place=claim['business_place'];
      this.fetchDataList();
    }
  }
  open_img(path){
    let url=this.base_path+path;
    this.photoViewer.show(url, path, {share: false});
  }
  
  fetchDataList() {
    let data = JSON.stringify({claim_id:this.claim_id})
    this.authService.postData(data,"fetch_travel_entitlement_docs").then(
      data => {
        console.log(data);
        if (data["status"] == "success") {
          this.doc_list = data["docs"];
        } else {
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  async showdetail(variablename, myvariable)
  {
    console.log('inside openAddPage')
    let jsonvalue='';

    if(myvariable=='fare' && this.fare!=null)
    {
      jsonvalue=this.fare;
    }
    if(myvariable=='accomodation' && this.accomodation!=null)
    {
      jsonvalue=this.accomodation;
    }
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
    const myModal = await this.modal.create({component:ClaimsDetailPage,backdropDismiss: true, componentProps:{ page_type: 'showdetail',mainvalue:jsonvalue, variablename:variablename}});
    
    (await myModal).present();
    
    myModal.onDidDismiss().then((type) => {
      console.log('inside onDidDismiss')
      console.log(type.data);
      console.log(myvariable);
      // if(myvariable=='fare' && type=="submit")
      // {
      //   this.fare=data;
      // }
      // if(myvariable=='accomodation' && type=="submit")
      // {
      //   this.accomodation=data;
      // }
      // if(myvariable=='food_allowances' && type=="submit")
      // {
      //   this.food_allowances=data;
      // }
      // if(myvariable=='conveyance_charges' && type=="submit")
      // {
      //   this.conveyance_charges=data;
      // }
      // if(myvariable=='stationary' && type=="submit")
      // {
      //   this.stationary=data;
      // }
      // if(myvariable=='incidental_expenses' && type=="submit")
      // {
      //   this.incidental_expenses=data;
      // }
    });

    // myModal.onDidDismiss((data) => {
    //   console.log("I have dismissed.");
    //   this.fetchDataList();
    // });
  
    // myModal.onWillDismiss((data) => {
    //   console.log("I'm about to dismiss");
    //   // console.log(data);
    // });
  }

  async showjson(i)
  {
    console.log('inside openAddPage')
    let jsonvalue=JSON.stringify(this.mainvalue[i]);
    console.log(jsonvalue);
  
    const myModal = await this.modal.create({component:ClaimsDetailPage,backdropDismiss: true, componentProps:{ page_type: 'showjson',jsonvalue:jsonvalue, variablename:this.variablename}});
  
    (await myModal).present();
    
    myModal.onDidDismiss().then((type) => {
      console.log('inside onDidDismiss')
    });

    // myModal.onDidDismiss((data) => {
    //   console.log("I have dismissed.");
    //   this.fetchDataList();
    // });
  
    // myModal.onWillDismiss((data) => {
    //   console.log("I'm about to dismiss");
    //   // console.log(data);
    // });
  }
  ngOnInit() {
  }
}
