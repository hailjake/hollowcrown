import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const Twitch: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
  public isJakeLive = null;
  public isJamesLive = null;
  public isJamesVisible = false;
  public isJakeVisible = false;
  public twitchUrlJake = 'https://api.twitch.tv/kraken/streams/ghostinthishell?client_id=0091am3rpb4xg4986afk0okeoc851u';
  public twitchUrlJames = 'https://api.twitch.tv/kraken/streams/chancegod?client_id=0091am3rpb4xg4986afk0okeoc851u';
  public setHeader =  { 'Client-ID': '0091am3rpb4xg4986afk0okeoc851u' };
  public embed;

  public members = [
    {
      name: 'Jake Anderson',
      role: 'Vocalist',
      image: '../../assets/jake-anderson-hollow-crown-promo.jpg',
      twitter: 'https://www.twitter.com/ghostinthishell',
      instagram: 'https://www.instagram.com/hollow_jake',
    },
    {
      name: 'James Sauceda',
      role: 'Guitar',
      image: '../../assets/james-sauceda-hollow-crown.jpg',
      twitter: 'https://www.twitter.com/chancegod_',
      instagram: 'https://www.instagram.com/chancegod_',
    },
    {
      name: 'Zechariah Gamez',
      role: 'Drums',
      image: '../../assets/zechariah-gamez-hollow-crown.jpg',
      twitter: '',
      instagram: 'https://www.instagram.com/zackandres_'
    },
    {
      name: 'Tony Romo',
      role: 'Bass',
      image: '../../assets/tony-romo-hollow-crown.jpg',
      twitter: '',
      instagram: 'https://www.instagram.com/yungtrappplord'
    }
  ];

  constructor(private http: HttpClient) {}

  getTwitchDataJake() {
    this.http.get(this.twitchUrlJake, { headers: this.setHeader}).subscribe(res => {
      this.isJakeLive = res;

      if (this.isJakeLive.stream !== null) {
         this.embed = new Twitch.Embed('twitch-embed-jake', {
          width: '100%',
          height: 480,
          channel: 'ghostinthishell',
          layout: 'video',
          autoplay: false,
          allowfullscreen: false,
          headers: { 'Client-ID': '0091am3rpb4xg4986afk0okeoc851u' }
        });
        this.isJakeVisible = true;
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
          height: 480,
          channel: 'chancegod',
          layout: 'video',
          autoplay: false,
          headers: { 'Client-ID': '0091am3rpb4xg4986afk0okeoc851u' }
        });
        this.isJamesVisible = true;
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
