import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth/auth.service'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-send-wishes',
  templateUrl: './send-wishes.page.html',
  styleUrls: ['./send-wishes.page.scss'],
})
export class SendWishesPage implements OnInit {
  emp_id:any;
  designation:any;
  emp_name:any;
  wish_type:any;
  from_emp:any;
  to_emp:any;
  wish:any;
  page_type:any;
  mywishes:any;
  sentwishes:any;
  allwishes:any;
  home:any;
  
  constructor(public navCtrl: NavController,
    public modal:ModalController, 
    public storage:Storage, 
    public loadingCtrl:LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public route :ActivatedRoute) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendWishesPage');
  }

  async ionViewWillEnter() {
    await this.storage.get('emp_id').then((val)=>{
      this.from_emp=val;
      this.emp_id=val;
    })
    await this.storage.get('designation').then((designation)=>{
      this.designation=designation;
      console.log(this.designation);
    })

    console.log('ionViewWillEnter SendWishesPage');
    await this.route.queryParams.subscribe(async params => {
      console.log(params);
      if(params.hasOwnProperty('page_type'))
      {
        this.page_type = params["page_type"];
        console.log('page type',this.page_type );
        if(this.page_type=='wishes')
        {
          if(params['fname']!=null)
          this.emp_name=params['fname'];
          console.log( this.emp_name);
          if(params['mname']!=null)
          this.emp_name+=" "+params['mname'];
          if(params['lname']!=null)
          this.emp_name+=" "+params['lname'];
    
          this.to_emp=params['emp_id'];
        }
        else
        {
          await this.fetchWishes();
          this.home='mywishes';
          console.log('hello');
        }
      }
      else
      {
        console.log(1);
      }
      this.wish_type=params['wish_type'];
      console.log(this.page_type=params['page_type']);
    });
   
    
    
    
  }

  async submit_wish()
  {
    const loader =await this.loadingCtrl.create({
      message: "Please wait..."
    });
    await loader.present();
    let data = JSON.stringify({
      from_emp: this.from_emp,
      to_emp: this.to_emp,
      wish:this.wish,
      wish_type:this.wish_type,
      to_name:this.emp_name,
    });
    this.authService.postData(data, "send_wish").then( async result => {
        let data = result;
        console.log(data);

        if (data["status"] == "success") {
          const toast = await this.toastCtrl.create({
            message: "Greetings have been sent.",
            duration: 2000
          });
          await  toast.present();
          console.log(data["msg"]);
        } else {
          const alert =await this.alertCtrl.create({
            header: "Error",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          await alert.present();
          console.log(data["msg"]);
        }
        loader.dismiss();
        this.modal.dismiss();
      },
      async err => {
        const alert =await this.alertCtrl.create({
          header: "Error",
          subHeader: err,
          buttons: ["OK"]
        });
        await alert.present();
        console.log(err);
        loader.dismiss();
      }
    );
  }

  async fetchWishes()
  {
    const loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    await loader.present();
    let data = JSON.stringify({
      emp_id: this.emp_id,
      designation: this.designation
    });
    this.authService.postData(data, "fetch_wishes").then(async result => {
      let data = result;
      console.log(data);
      
        if (data["status"] == "success") {
          this.mywishes=data['mywishes'];
          this.sentwishes=data['sentwishes'];
          this.allwishes=data['allwishes'];
        } else {
          const alert = await this.alertCtrl.create({
            header: "Error",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
          await  alert.present();
          console.log(data["msg"]);
        }
        loader.dismiss();
      },
      async err => {
        const alert =await  this.alertCtrl.create({
          header: "Error",
          subHeader: err,
          buttons: ["OK"]
        });
        await alert.present();
        console.log(err);
        loader.dismiss();
      }
    );
  }

  ngOnInit() {
  }

}
