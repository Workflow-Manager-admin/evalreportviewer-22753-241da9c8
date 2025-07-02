import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [
    { provide: PLATFORM_ID, useValue: 'browser' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
