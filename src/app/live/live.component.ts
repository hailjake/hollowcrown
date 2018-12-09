import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const Twitch: any;

@Component({
  selector: 'app-live',
  templateUrl: 'live.component.html',
  styleUrls: ['live.component.css']
})

export class LiveComponent implements OnInit {

  constructor(private http: HttpClient) {}

  public isJakeLive = null;
  public isJamesLive = null;
  public isJamesVisible = false;
  public isJakeVisible = false;
  public twitchUrlJake = 'https://api.twitch.tv/kraken/streams/shroud?client_id=0091am3rpb4xg4986afk0okeoc851u';
  public twitchUrlJames = 'https://api.twitch.tv/kraken/streams/chancegod?client_id=0091am3rpb4xg4986afk0okeoc851u';
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
