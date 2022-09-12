import { Component, OnInit } from '@angular/core';
import { AlertController, Platform, LoadingController} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@awesome-cordova-plugins/document-viewer/ngx';
import { PhotoViewer } from "@awesome-cordova-plugins/photo-viewer/ngx";
import { AuthService } from '../services/auth/auth.service';
import { GlobalVarsService } from '../services/global-vars/global-vars.service';
import { ActivatedRoute } from '@angular/router';

let base_path = GlobalVarsService.base_path;

@Component({
  selector: 'app-l-d',
  templateUrl: './l-d.page.html',
  styleUrls: ['./l-d.page.scss'],
})
export class LDPage implements OnInit {
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
      public loadingCtrl: LoadingController,
      public platform: Platform,
      public alertCtrl: AlertController,
      public storage: Storage,
      public route : ActivatedRoute,
      public authService: AuthService,
      public photoViewer: PhotoViewer,
      private file: File,
      public document: DocumentViewer,
      public transfer: FileTransfer,) {
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
          await this.route.queryParams.subscribe(async params => {
            if(params.hasOwnProperty('l_n_d'))
            {
              this.l_n_d= params["l_n_d"];         
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
      
      });
    }

  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
        this.checkIfNavDisabled(Object, slideView);
    });
  }

  slidePrev(object, slideView) {
      slideView.slidePrev(500).then(() => {
          this.checkIfNavDisabled(object, slideView);
      });
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

  async get_l_n_d(desig,desig_id)
  {
    const loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    let data = JSON.stringify({designation:desig,designation_id:desig_id});
    this.authService.postData(data,"get_l_n_d").then(async result => {
        let data = result;
        console.log(data);

        if (data["status"] == "success") {
          this.l_n_d=data['l_n_d'];
          console.log(data);
        } else {
          const alert = this.alertCtrl.create({
            header: "Error",
            subHeader: data["msg"],
            buttons: ["OK"]
          });
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
  //       (await loader).present();

  //       transfer.download(url, path + this.fileName).then(
  //         entry => {
  //           (await loader).dismiss();
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
  //               header: this.fileName
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
  //       (await loader).dismiss();
  //     } catch (error) {
  //       (await loader).dismiss();
  //       console.log(error);
  //       alert(error);
  //     }
  //     (await loader).dismiss();
  //   } else {
  //     (await loader).dismiss();
  //     alert("There is no bill generated.");
  //   }
  //   (await loader).dismiss();
  // }

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

  async downloadopenfile(filepath)
  {
    this.myfilepath = 'upload_l&d/'+ filepath;
    // const loader = this.loadingCtrl.create({
    //   content: "Please wait..."
    // });
    // (await loader).present();

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
    // (await loader).dismiss();
    // this.fileOpener.open(base_path+this.myfilepath, mimetype)
    // .then(() => console.log('File is opened'))
    // .catch(e => console.log('Error opening file', e));

    // if(extn=='pdf')
    // {

      if(extn=='xlsx' || extn=='xls')
      {
        const alert = this.alertCtrl.create({
          header: "Error",
          subHeader: 'Only png, jpg and pdf files are allowed',
          buttons: ["OK"]
        });
        (await alert).present();
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
      //     // (await loader).dismiss();
      //     let url = entry.toURL();
      //     this.document.viewDocument(url, mimetype, options);
      //   }).catch(err => {
      //     // (await loader).dismiss();
      //     console.log(err);
      //     const alert = this.alertCtrl.create({
      //       header: 'Error',
      //       subHeader: 'Something went wrong. Try again later.',
      //       buttons: ['OK'],
      //     });
      //     (await alert).present();

      // });
    // }
    // else
    // {
    //   this.openfile(filepath);
    // }
    
    // this.document.viewDocument(path + name, mimetype, options);
    
  }
  
  ngOnInit() {
  }
}
