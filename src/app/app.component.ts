import { Component, OnInit } from '@angular/core';
import { routerTransition } from './app-routing-animation';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-root',
  animations: [ routerTransition ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  ngOnInit() {
  }
}

