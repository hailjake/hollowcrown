import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LiveComponent } from './live/live.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { state: 'home' } },
  { path: 'live', component: LiveComponent, data: { state: 'live' } },
  { path: 'chat', component: ChatComponent, data: { state: 'chat' } }
];

NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
  exports: [ RouterModule ]
});

export const AppRoutingModule = RouterModule.forRoot(routes, {
    useHash: true
});
