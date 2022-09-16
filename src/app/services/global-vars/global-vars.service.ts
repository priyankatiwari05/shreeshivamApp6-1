import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})

export class GlobalVarsService {
  public static file_url: string = "https://shreeshivam.net/hrm/api/";
  public static base_path: string = "https://shreeshivam.net/hrm/";
  public static softomatic_url: string = "https://www.softomatic.tech/"
  public static appurl: string;
  public static appversion: string = "3.5.2";
  constructor(public platform: Platform) {
    console.log("Hello GlobalVarsService Provider");

    if (this.platform.is("ios")) {
      GlobalVarsService.appurl = null;
    }
    if (this.platform.is("android")) {
      GlobalVarsService.appurl =
        "https://play.google.com/store/apps/details?id=app.softomatic.shreeshivam";
    }
    GlobalVarsService.file_url = "https://shreeshivam.net/hrm/api/";
    GlobalVarsService.base_path = "https://shreeshivam.net/hrm/";
    GlobalVarsService.softomatic_url = "https://www.softomatic.tech/";

    //  GlobalVars.packagename="app.softomatic.shreeshivam";
  }
}