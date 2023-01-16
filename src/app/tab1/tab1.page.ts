import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Torneo } from '../models/torneo';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  torneos:Torneo[] = [];

  constructor(
    
   public api:ApiService
  ) {}

  ngOnInit(): void {
    this.getTorneos();
  }

  getTorneos (){
    this.api.getEntity("torneo").subscribe((torneos:Torneo[])=>this.torneos=torneos);

    
    
     
  }

}
