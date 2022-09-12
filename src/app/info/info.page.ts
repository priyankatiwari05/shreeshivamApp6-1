import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform, LoadingController} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { File } from "@awesome-cordova-plugins/file/ngx";
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@awesome-cordova-plugins/document-viewer/ngx';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { GlobalVarsService } from '../services/global-vars/global-vars.service';
import { AuthService } from '../services/auth/auth.service';

let base_path = GlobalVarsService.base_path;

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  home = "notice";
  hideme= true;
  pass_icon="chevron-down-outline";
  responseData: any;
  acc_no: any;
  bank_name: any;
  ifsc: any;
  email: any;
  mobile: any;
  father_name: any;
  mother_name: any;
  spouse_name: any;
  children: any;
  emp_id:any;
  username: any;
  doc1: any;
  esic: any;
  epf: any;
  esic_number: any;
  uan_number: any;
  genesis_ledger_id: any;
  // emp_id:any;
  dob:any;
  doj:any;
  new_password:string;
  new_confirm_password:string;
  password_report:any;
  data: any;
  bank_branch: any;
  pan_number: any;
  adhaar_number: any;
  local_address: any;
  permanent_address: any;
  last_working_day: any;
  company_name: any;
  branch_name: any;
  site_name: any;
  department: any;
  designation: any;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private fileOpener: FileOpener,
    private file: File,
    public platform: Platform,
    public transfer: FileTransfer,
    public storage: Storage,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public document: DocumentViewer,
    public photoViewer: PhotoViewer) {
      this.storage.get("email").then(val => {
        let my_email = val;
        this.email = val;
        // this.getDetails(my_email);
      });

      this.storage.get("username").then(val => {
        this.username = val;
      });
      this.storage.get("emp_id").then(val2 => {
        this.emp_id = val2;
      });
    }

    ionViewWillEnter() {
      console.log("ionViewDidLoad InfoPage");
      this.getDetails();
    }

  getMIMEtype(extn) {
    let ext = extn.toLowerCase();
    let MIMETypes = {
      txt: "text/plain",
      docx:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      doc: "application/msword",
      pdf: "application/pdf",
      jpg: "image/jpeg",
      bmp: "image/bmp",
      png: "image/png",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      rtf: "application/rtf",
      ppt: "application/vnd.ms-powerpoint",
      pptx:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    };
    return MIMETypes[ext];
  }
  async openfile(filepath) {
    console.log(filepath);
    console.log("try");
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });

    if (filepath.length != 0) {
      try {
        let path = null;
        if (this.platform.is("ios")) {
          path = this.file.documentsDirectory;
        } else if (this.platform.is("android")) {
          path = this.file.dataDirectory;
        }

        const transfer = this.transfer.create();
        let url =base_path+ filepath;
        console.log(url);
        var fileName = url.substr(url.lastIndexOf("/") + 1);
        (await loader).present();

        transfer.download(url, path + fileName).then(async entry => {
          (await loader).dismiss();
          let fileExtn = fileName.split(".").reverse()[0];
          let fileMIMEType = this.getMIMEtype(fileExtn);

          let re = /pdf/gi;
          let str = fileMIMEType;
          if (str.search(re) == -1 ) {
            let re1 = /image/gi;
            if (str.search(re1) == -1 ) {
              this.fileOpener
            .open(path + fileName, fileMIMEType)
            .then(() => console.log("File is opened"))
            .catch(e => console.log("Error opening file", e));
            } else{
              this.photoViewer.show(url, 'Organizational Chart', {share: false});
            }
          } else {
            const options: DocumentViewerOptions = {
              title: fileName
            };

            this.document.viewDocument(path + fileName, fileMIMEType, options);

          }
          // this.fileOpener
          //   .open(path + fileName, fileMIMEType)
          //   .then(() => console.log("File is opened"))
          //   .catch(e => console.log("Error opening file", e));
        }, (error) => {
          console.log(error);

        });
        (await loader).dismiss();
      } catch (error) {

        (await loader).dismiss();
        console.log(error);

        alert(error);
      }
      (await loader).dismiss();
    } else {
      (await loader).dismiss();
      alert("There is no bill generated.");
    }
    (await loader).dismiss();
  }

  // getDetails(email) {
  //   this.data = {};
  //   this.storage.get("data").then(val => {
  //     this.data = val;

  //     let personal_details = data["persnal_infos"];
  //     if (data["doc"] != null || data["doc"] != "") {
  //       this.doc1 = data["doc"];
  //     }

  //     for (let i = 0; i < personal_details.length; i++) {
  //       // console.log(personal_details[i]["acc_no"]);
  //       this.acc_no = personal_details[i]["acc_no"];
  //       this.ifsc = personal_details[i]["ifsc_code"];
  //       this.mobile = personal_details[i]["mobile"];
  //       this.bank_name = personal_details[i]["bank_name"];
  //       this.esic_number = personal_details[i]["esic_number"];
  //       this.epf = personal_details[i]["epf_number"];
  //       this.uan_number = personal_details[i]["uan_number"];
  //       this.genesis_ledger_id = personal_details[i]["genesis_ledger_id"];
  //       this.dob = personal_details[i]["dob"];
  //       this.doj = personal_details[i]["doj"];
  //     }
  //     //  let sal=data['sal'];
  //     //  for(let i=0;i<sal.length;i++){
  //     //   // console.log(personal_details[i]["acc_no"]);
  //     //    let sal2=JSON.parse(sal[i]["salary"]);

  //     //   this.basic_sal=sal2['emp_salary']['basic'];
  //     //    this.sal=sal2['emp_salary']['salary'];
  //     //  }
  //     let family = data["fam"];

  //     for (let i = 0; i < family.length; i++) {
  //       // console.log(personal_details[i]["acc_no"]);
  //       let father = JSON.parse(family[i]["father"]);
  //       this.father_name = father["father_name"];

  //       let mother = JSON.parse(family[i]["mother"]);
  //       this.mother_name = mother["mother_name"];

  //       let spouse = JSON.parse(family[i]["spouse"]);
  //       this.spouse_name = spouse["spouse_name"];

  //       let child1: string;
  //       child1 = JSON.parse(family[i]["children"]);
  //       this.children = child1;
  //       //   child=child.toString();
  //       // console.log(typeof(child));
  //       // let sillyString = child.substr(2).slice(0, -2);
  //       var childName: string[] = new Array();
  //       for (let j = 0; j < this.children.length; j++) {
  //         let ch1 = JSON.parse(child1[j]);
  //         childName.push(ch1["child_name"]);
  //       }
  //       this.children = childName;
  //       //this.spouse_name=spouse["spouse_name"];
  //     }
  //   });
  // }

  getDetails() {
    this.data = {};
    this.storage.forEach((value, key, iterationNumber) => {
      this.data[key] = value;
    }).then(val => {
        this.username =  this.data["username"];
        this.dob = this.data["dob"];
        this.email =  this.data["email"];
        this.bank_name = this.data["bank_name"];
        this.bank_branch = this.data["bank_branch"];
        this.acc_no = this.data["acc_no"];
        this.ifsc = this.data["ifsc_code"];
        this.esic_number = this.data["esic_number"];
        this.epf = this.data["epf_number"];
        this.uan_number = this.data["uan_number"];
        this.genesis_ledger_id = this.data["genesis_ledger_id"];
        this.pan_number = this.data["pan_number"];
        this.adhaar_number = this.data["adhaar_number"];
        this.local_address = this.data["local_address"];
        this.permanent_address = this.data["permanent_address"];
        this.last_working_day = this.data["last_working_day"];
        this.doj = this.data["doj"];
        this.company_name = this.data["company_name"];
        this.branch_name = this.data["branch_name"];
        this.site_name = this.data["site_name"];
        this.department = this.data["department"];
        this.designation = this.data["designation"];

        if (this.data["doc"] != null || this.data["doc"] != "") {
          this.doc1 = this.data["doc"];
        }
    });
  }

  async change_password_confirm(){
    if(this.new_password!=this.new_confirm_password){
      console.log("Not Matched");
      const alert = this.alertCtrl.create({
        header: "Error",
        subHeader: "Password doesn't matched.",
        buttons: ["OK"]
      });

      (await alert).present();
    }else{
      console.log("Yes Matched");

      let alert = this.alertCtrl.create({
        header: "Confirm",
        message: "Are you sure to change password?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          },
          {
            text: "Change",
            handler: () => {
              this.change_password();
            }
          }
        ]
      });
      (await alert).present();
    }
  }

  async change_password(){
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    this.storage.get("email").then(email => {
      let data = JSON.stringify({
        email: email,
        password: this.new_password,
      });

      this.authService.postData(data, "reset_pass_mobile").then(
        async result => {
        let  responseData = result;
          let data = JSON.parse(responseData["_body"]);
         /// console.log(responseData);
          console.log(data);
          if (data["status"] == "success") {
            const alert = this.alertCtrl.create({
              header: "Success",
              subHeader: "Password changed successfully.",
              buttons: ["OK"]
            });
            (await loader).dismiss();
            (await alert).present();
            console.log(data["msg"]);
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
    });
  }

  show_me(){
    if(this.hideme==false){
      this.hideme=true;
      // this.pass_icon="remove";
      this.pass_icon="chevron-down-outline";
    }else{
      this.hideme=false;
      // this.pass_icon="add";
      this.pass_icon="chevron-up-outline";
    }

  }
  ngOnInit() {
  }
}
