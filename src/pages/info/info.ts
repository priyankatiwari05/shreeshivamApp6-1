import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  Platform
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AuthserviceProvider } from "../../providers/authservice/authservice";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import { LoadingController } from "ionic-angular";
import { FileTransfer } from "@ionic-native/file-transfer";
import { GlobalVarsProvider } from "../../providers/global-vars/global-vars";
import { DocumentViewer, DocumentViewerOptions } from "@ionic-native/document-viewer";
import { PhotoViewer } from "@ionic-native/photo-viewer";
/**
 * Generated class for the LDPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

let base_path = GlobalVarsProvider.base_path;


@Component({
  selector: "page-info",
  templateUrl: "info.html"
})
export class InfoPage {
  home = "notice";
  hideme=false;
  pass_icon="add";
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
  username: any;
  // basic_sal:any;
  // sal:any;
  doc1: any;
  esic: any;
  epf: any;
  esic_number: any;
  uan_number: any;
  genesis_ledger_id: any;
  emp_id:any;
  dob:any;
  doj:any;
  new_password:string;
  new_confirm_password:string;
  password_report:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private fileOpener: FileOpener,
    private file: File,
    public platform: Platform,
    public transfer: FileTransfer,
    public storage: Storage,
    public alertCtrl: AlertController,
    public authService: AuthserviceProvider,
    public document: DocumentViewer,
    public photoViewer: PhotoViewer
  ) {
    this.storage.get("username").then(val => {
      this.username = val;
    });
    this.storage.get("emp_id").then(val2 => {
      this.emp_id = val2;
    });
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
  openfile(filepath) {
    console.log(filepath);
    console.log("try");
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
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
        loader.present();

        transfer.download(url, path + fileName).then(entry => {
          loader.dismissAll();
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
        loader.dismissAll();
      } catch (error) {

        loader.dismissAll();
        console.log(error);

        alert(error);
      }
      loader.dismissAll();
    } else {
      loader.dismissAll();
      alert("There is no bill generated.");
    }
    loader.dismissAll();
  }

  getDetails(email) {
    let data;
    this.storage.get("data").then(val => {
      data = val;

      let personal_details = data["persnal_infos"];
      if (data["doc"] != null || data["doc"] != "") {
        this.doc1 = data["doc"];
      }

      for (let i = 0; i < personal_details.length; i++) {
        // console.log(personal_details[i]["acc_no"]);
        this.acc_no = personal_details[i]["acc_no"];
        this.ifsc = personal_details[i]["ifsc_code"];
        this.mobile = personal_details[i]["mobile"];
        this.bank_name = personal_details[i]["bank_name"];
        this.esic_number = personal_details[i]["esic_number"];
        this.epf = personal_details[i]["epf_number"];
        this.uan_number = personal_details[i]["uan_number"];
        this.genesis_ledger_id = personal_details[i]["genesis_ledger_id"];
        this.dob = personal_details[i]["dob"];
        this.doj = personal_details[i]["doj"];
      }
      //  let sal=data['sal'];
      //  for(let i=0;i<sal.length;i++){
      //   // console.log(personal_details[i]["acc_no"]);
      //    let sal2=JSON.parse(sal[i]["salary"]);

      //   this.basic_sal=sal2['emp_salary']['basic'];
      //    this.sal=sal2['emp_salary']['salary'];
      //  }
      let family = data["fam"];

      for (let i = 0; i < family.length; i++) {
        // console.log(personal_details[i]["acc_no"]);
        let father = JSON.parse(family[i]["father"]);
        this.father_name = father["father_name"];

        let mother = JSON.parse(family[i]["mother"]);
        this.mother_name = mother["mother_name"];

        let spouse = JSON.parse(family[i]["spouse"]);
        this.spouse_name = spouse["spouse_name"];

        let child1: string;
        child1 = JSON.parse(family[i]["children"]);
        this.children = child1;
        //   child=child.toString();
        // console.log(typeof(child));
        // let sillyString = child.substr(2).slice(0, -2);
        var childName: string[] = new Array();
        for (let j = 0; j < this.children.length; j++) {
          let ch1 = JSON.parse(child1[j]);
          childName.push(ch1["child_name"]);
        }
        this.children = childName;
        //this.spouse_name=spouse["spouse_name"];
      }
    });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad InfoPage");
    this.storage.get("email").then(val => {
      //console.log(val);
      let my_email = val;
      this.email = val;
      this.getDetails(my_email);
    });
  }

  ionViewWillEnter() {}

  change_password_confirm(){
    if(this.new_password!=this.new_confirm_password){
      console.log("Not Matched");
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Password doesn't matched.",
        buttons: ["OK"]
      });

      alert.present();
    }else{
      console.log("Yes Matched");

      let alert = this.alertCtrl.create({
        title: "Confirm",
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
      alert.present();
    }
  }

  change_password(){
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.storage.get("email").then(email => {
      let data = JSON.stringify({
        email: email,
        password: this.new_password,
      });

      this.authService.postData(data, "reset_pass_mobile").then(
        result => {
        let  responseData = result;
          let data = JSON.parse(responseData["_body"]);
         /// console.log(responseData);
          console.log(data);
          if (data["status"] == "success") {
            const alert = this.alertCtrl.create({
              title: "Success",
              subTitle: "Password changed successfully.",
              buttons: ["OK"]
            });
            loader.dismissAll();
            alert.present();
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
  show_me(){
    if(this.hideme==false){
      this.hideme=true;
      this.pass_icon="remove";
    }else{
      this.hideme=false;
      this.pass_icon="add";
    }

  }
}
