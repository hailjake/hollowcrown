import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {trigger, stagger, animate, style, group, query as q, transition, keyframes} from '@angular/animations';

const query = (s, a, o = { optional: true}) => q(s, a, o);

declare const Twitch: any;

export const homeTransition = trigger('homeTransition', [
  transition(':enter', [
    query('.home-info', style({ opacity: 0 })),
    query('.home-info', stagger(300, [
      style({ transform: 'translateY(100px)' }),
      animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(0px)', opacity: 1})),
    ])),
  ]),
  transition(':leave', [
    query('.home-info', stagger(300, [
      style({ transform: 'translateY(0px)', opacity: 1 }),
      animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(100px)', opacity: 0})),
    ])),
  ])
]);

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
  animations: [ homeTransition ],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@homeTransition]': ''
  }
})

export class ChatComponent implements OnInit {

  ngOnInit(): void {

  }

}
