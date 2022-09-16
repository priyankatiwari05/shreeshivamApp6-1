import { Component, OnInit } from '@angular/core';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { GlobalVarsService } from '../services/global-vars/global-vars.service';

let base_path = GlobalVarsService.base_path; 

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.page.html',
  styleUrls: ['./org-chart.page.scss'],
})
export class OrgChartPage implements OnInit {

  constructor(public photoViewer: PhotoViewer) {}

  open_img(){
    this.photoViewer.show(base_path+'org_chart.jpg', 'Organizational Chart', {share: false});
  }

  ngOnInit() {
  }
}