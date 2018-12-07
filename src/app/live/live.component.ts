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
  selector: 'app-live',
  templateUrl: 'live.component.html',
  styleUrls: ['live.component.css'],
  animations: [ homeTransition ],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@homeTransition]': ''
  }
})

export class LiveComponent implements OnInit {

  public members = [
    {
      name: 'Jake Anderson',
      role: 'Vocalist',
      image: '../../assets/jake-anderson-hollow-crown-promo.jpg',
      twitter: 'https://www.twitter.com/ghostinthishell',
      instagram: 'https://www.instagram.com/hollow_jake'
    },
    {
      name: 'James Sauceda',
      role: 'Guitar',
      image: '../../assets/james-sauceda-hollow-crown.jpg',
      twitter: 'https://www.twitter.com/changegod',
      instagram: 'https://www.instagram.com/chancegod'
    },
    {
      name: 'Zechariah Gamez',
      role: 'Drums',
      image: '../../assets/zechariah-gamez-hollow-crown.jpg',
      twitter: 'https://www.twitter.com/ghostinthishell',
      instagram: ''
    },
    {
      name: 'Tony Romo',
      role: 'Bass',
      image: '../../assets/tony-romo-hollow-crown.jpg',
      twitter: '',
      instagram: ''
    }
  ];

  constructor(private http: HttpClient) {}

  public isJakeLive = null;
  public isJamesLive = null;
  public isJamesVisible = false;
  public isJakeVisible = false;
  public twitchUrlJake = 'https://api.twitch.tv/kraken/streams/shroud?client_id=0091am3rpb4xg4986afk0okeoc851u';
  public twitchUrlJames = 'https://api.twitch.tv/kraken/streams/sodapoppin?client_id=0091am3rpb4xg4986afk0okeoc851u';
  public setHeader =  { 'Client-ID': '0091am3rpb4xg4986afk0okeoc851u' };
  public embed;

  getTwitchDataJake() {
    this.http.get(this.twitchUrlJake, { headers: this.setHeader}).subscribe(res => {
      this.isJakeLive = res;

      if (this.isJakeLive.stream !== null) {
        this.embed = new Twitch.Embed('twitch-embed-jake', {
          width: '100%',
          height: '100%',
          channel: 'shroud',
          layout: 'video',
          autoplay: false,
          headers: { 'Client-ID': '0091am3rpb4xg4986afk0okeoc851u' }
        });
        this.isJakeVisible = true;

        // embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
        // const player = embed.getPlayer();
        // player.play();
        // });
      } else {
        this.isJakeVisible = false;

      }
    });
  }

  getTwitchDataJames() {
    this.http.get(this.twitchUrlJames, { headers: this.setHeader}).subscribe(res => {
      this.isJamesLive = res;

      if (this.isJamesLive.stream !== null) {
       this.embed = new Twitch.Embed('twitch-embed-james', {
          width: '100%',
          height: '100%',
          channel: 'sodapoppin',
          layout: 'video',
          autoplay: false,
          headers: { 'Client-ID': '0091am3rpb4xg4986afk0okeoc851u' }
        });
        this.isJamesVisible = true;
        // embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
        // const player = embed.getPlayer();
        // player.play();
        // });
      } else {
        this.isJamesVisible = false;
      }
    });
  }

  ngOnInit(): void {
    this.getTwitchDataJake();
    this.getTwitchDataJames();
  }

}
