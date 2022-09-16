import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'; 
import { SendWishesPage } from '../send-wishes/send-wishes.page'; 

@Component({
  selector: 'app-aniversary',
  templateUrl: './aniversary.page.html',
  styleUrls: ['./aniversary.page.scss'],
})
export class AniversaryPage implements OnInit {
  aniversaries:any;
  username:any;
  constructor(public router: Router,
    public storage:Storage) {
    this.storage.get('aniversaries').then( val =>{
      this.aniversaries=val;
      console.log(this.aniversaries)
      this.storage.get('username').then( val2 =>{
        this.username=val2;
      });
    });
  }

  send_wish(emp_id,fname,mname,lname)
  {
    this.router.navigate(['/send-wishes',{emp_id:emp_id,fname:fname,mname:mname,lname:lname,wish_type:'anniversary',page_type:'send_wish'}]);
  }
  ngOnInit() {
  }
}
