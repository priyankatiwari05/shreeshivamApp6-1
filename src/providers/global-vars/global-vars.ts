import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";

@Injectable()
export class GlobalVarsProvider {
  public static file_url: string = "https://shreeshivam.net/hrm/api/";
  public static base_path: string = "https://shreeshivam.net/hrm/";
  public static softomatic_url: string = "https://www.softomatic.tech/";
  public static appurl: string;
  public static appversion: string = "3.5.2";
  constructor(public platform: Platform) {
    console.log("Hello GlobalVarsProvider Provider");

    if (this.platform.is("ios")) {
      GlobalVarsProvider.appurl = null;
    }
    if (this.platform.is("android")) {
      GlobalVarsProvider.appurl =
        "https://play.google.com/store/apps/details?id=app.softomatic.shreeshivam";
    }
    GlobalVarsProvider.file_url = "https://shreeshivam.net/hrm/api/";
    GlobalVarsProvider.base_path = "https://shreeshivam.net/hrm/";
    GlobalVarsProvider.softomatic_url = "https://www.softomatic.tech/";

    //  GlobalVars.packagename="app.softomatic.shreeshivam";
  }
}
