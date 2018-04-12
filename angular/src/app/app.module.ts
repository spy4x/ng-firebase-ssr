import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ListComponent} from './list/list.component';
import {OneComponent} from './one/one.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    OneComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
