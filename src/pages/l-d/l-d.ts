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
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { GlobalVarsProvider } from "../../providers/global-vars/global-vars";
import {
  DocumentViewer,
  DocumentViewerOptions
} from "@ionic-native/document-viewer";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import {
  StreamingMedia,
  StreamingVideoOptions
} from "@ionic-native/streaming-media";
import { Slides } from 'ionic-angular';

let base_path = GlobalVarsProvider.base_path;


@Component({
  selector: "page-l-d",
  templateUrl: "l-d.html"
})
export class LDPage {
  l_n_d: any;
  emp_id: any;
  myfilepath: string;
  filename: string;
  // slides: Slides;

  // @ViewChild('slideWithNav') slideWithNav: Slides;
    // sliderOne: any;

    // //Configuration for each Slider
    // slideOptsOne = {
    // initialSlide: 0,
    // slidesPerView: 1,
    // autoplay:true
    // };
    
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
    public photoViewer: PhotoViewer,
    public streamingMedia: StreamingMedia
  ) {
    this.storage.get("emp_id").then(val2 => {
      this.emp_id = val2;
    });
    // this.storage.get("l_n_d").then(val1 => {
    //   this.l_n_d = val1;
    //   console.log(this.l_n_d);
    // });


    // this.sliderOne =
    //     {
    //     isBeginningSlide: true,
    //     isEndSlide: false,
    //     slidesItems: []
    //     };


    console.log('inside constructor');
    this.storage.get("designation").then(desig => {
      this.storage.get("designation_id").then(async desig_id => {
        if(this.navParams.get('l_n_d')!=null)
        {
          this.l_n_d=this.navParams.get('l_n_d');
        }
        else
        {
          await this.get_l_n_d(desig,desig_id);
        }

        // if(this.l_n_d!=null)
        // {
        //   for(let  i=0;i<this.l_n_d.length;i++)
        //   {
        //     console.log('inside for loop '+i);
        //     let extension = this.l_n_d[i]['upload_file'].split('.')[1]
        //     console.log(extension.toLowerCase());

        //     // this.l_n_d[i]['image_path']=base_path+'upload_l&d/'+this.l_n_d[i]['upload_file'];
        //     if(extension.toLowerCase()=='jpg' || extension.toLowerCase()=='jpeg' || extension.toLowerCase()=='png')
        //       this.sliderOne.slidesItems.push({id:i,image:base_path+'upload_l&d/'+this.l_n_d[i]['upload_file']});
        //   }
            
        //   console.log(this.sliderOne.slidesItems);
        // }
        
      });
    });
    
    

    }

    //Move to Next slide
    slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
        this.checkIfNavDisabled(object, slideView);
    });
  }

  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
        this.checkIfNavDisabled(object, slideView);
    });;
    }

    //Method called when slide is changed by drag or navigation
    SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
    }

    //Call methods to check if slide is first or last to enable disbale navigation  
    checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
    }

    checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
        object.isBeginningSlide = istrue;
    });
    }
    checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
        object.isEndSlide = istrue;
    });
    }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LDPage");
  }

  ionViewWillEnter()
  {
    
  }

  get_l_n_d(desig,desig_id)
  {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    let data = JSON.stringify({designation:desig,designation_id:desig_id});
    this.authService.postData(data,"get_l_n_d").then(
      result => {
      let  responseData = result;
        let data = JSON.parse(responseData["_body"]);
        if (data["status"] == "success") {
          this.l_n_d=data['l_n_d'];
          console.log(data);
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
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      mp4: "video/mp4"
    };
    return MIMETypes[ext];
  }

  openfile(filepath)
  {  
    this.photoViewer.show(base_path+'upload_l&d/'+filepath, filepath, {share: false});
  }

  // openfile1(filepath) {
  //   console.log(filepath);
  //   console.log("try");
  //   const loader = this.loadingCtrl.create({
  //     content: "Please wait..."
  //   });

  //   if (filepath.length != 0) {
  //     try {
  //       let path = null;
  //       if (this.platform.is("ios")) {
  //         path = this.file.documentsDirectory;
  //       } else if (this.platform.is("android")) {
  //         path = this.file.dataDirectory;
  //       }
  //       const transfer = this.transfer.create();
  //       let url = base_path + "upload_l&d/" + filepath;
  //       var this.fileName = url.substr(url.lastIndexOf("/") + 1);
  //       loader.present();

  //       transfer.download(url, path + this.fileName).then(
  //         entry => {
  //           loader.dismissAll();
  //           let fileExtn = this.fileName.split(".").reverse()[0];
  //           let fileMIMEType = this.getMIMEtype(fileExtn);

  //           let re = /pdf/gi;
  //           let str = fileMIMEType;
  //           if (str.search(re) == -1) {
  //             let re1 = /image/gi;
  //             if (str.search(re1) == -1) {
  //               let re2 = /video/gi;
  //               if (str.search(re2) == -1) {
  //                 this.fileOpener
  //                   .open(path + this.fileName, fileMIMEType)
  //                   .then(() => console.log("File is opened"))
  //                   .catch(e => console.log("Error opening file", e));
  //               } else {
  //                 let options: StreamingVideoOptions = {
  //                   successCallback: () => {
  //                     console.log("Video played");
  //                   },
  //                   errorCallback: e => {
  //                     console.log("Error streaming");
  //                   },
  //                   orientation: "landscape",
  //                   shouldAutoClose: false,
  //                   controls: true
  //                 };

  //                 this.streamingMedia.playVideo(
  //                   url,
  //                   options
  //                 );
  //               }
  //             } else {
  //               this.photoViewer.show(url, this.fileName, { share: false });
  //             }
  //           } else {
  //             const options: DocumentViewerOptions = {
  //               title: this.fileName
  //             };
  //             this.document.viewDocument(
  //               path + this.fileName,
  //               fileMIMEType,
  //               options
  //             );
  //           }
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //       loader.dismissAll();
  //     } catch (error) {
  //       loader.dismissAll();
  //       console.log(error);
  //       alert(error);
  //     }
  //     loader.dismissAll();
  //   } else {
  //     loader.dismissAll();
  //     alert("There is no bill generated.");
  //   }
  //   loader.dismissAll();
  // }
  downloadopenfile(filepath)
  {
    this.myfilepath = 'upload_l&d/'+ filepath;
    // const loader = this.loadingCtrl.create({
    //   content: "Please wait..."
    // });
    // loader.present();

    let path = "";
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    }
    else {
      path = this.file.dataDirectory;
    }
    console.log(this.myfilepath);
    const transfer: FileTransferObject = this.transfer.create();
    let name = this.myfilepath.split('/');
    let size = name.length -1;
    this.filename = name[size];
    console.log(this.filename);
    let extn = this.filename.split('.')[1];
    let mimetype = this.getMIMEtype(extn);

    console.log(this.filename)
    console.log(extn)
    console.log(mimetype)
    
    const options: DocumentViewerOptions = {
      title: 'L & D Document'
    }
    console.log('file root path');
    console.log(base_path+this.myfilepath);
    // loader.dismiss();
    // this.fileOpener.open(base_path+this.myfilepath, mimetype)
    // .then(() => console.log('File is opened'))
    // .catch(e => console.log('Error opening file', e));

    // if(extn=='pdf')
    // {

      if(extn=='xlsx' || extn=='xls')
      {
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: 'Only png, jpg and pdf files are allowed',
          buttons: ["OK"]
        });
        alert.present();
      }
      else
      {
        if(extn=='PNG' || extn=='png' || extn=='jpg' || extn=='JPG' || extn=='JPEG' || extn=='jpeg')
          this.open_img(this.myfilepath);
        else
          window.open(base_path+this.myfilepath, '_system', 'location=yes');
      }

      

      // this.document.viewDocument(base_path+this.myfilepath, mimetype, options);

      // transfer.download(base_path + filepath, path + this.filename)
      //   .then(entry => {
      //     console.log('downloaded');
      //     console.log(entry.toURL());
      //     // loader.dismiss();
      //     let url = entry.toURL();
      //     this.document.viewDocument(url, mimetype, options);
      //   }).catch(err => {
      //     // loader.dismiss();
      //     console.log(err);
      //     const alert = this.alertCtrl.create({
      //       title: 'Error',
      //       subTitle: 'Something went wrong. Try again later.',
      //       buttons: ['OK'],
      //     });
      //     alert.present();

      // });
    // }
    // else
    // {
    //   this.openfile(filepath);
    // }
    
    // this.document.viewDocument(path + name, mimetype, options);
    
  }


  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    this.storage.get("designation").then(desig => {
      this.storage.get("designation_id").then(desig_id => {
        this.get_l_n_d(desig,desig_id);
      });
    });
    refresher.complete();

    setTimeout(() => {
      console.log("Async operation has ended");
    }, 2000);
  }

  open_img(path){
    this.photoViewer.show(base_path+path, path, {share: false});
  }

}
