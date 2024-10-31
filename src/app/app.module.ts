import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ContentComponent } from './content/content.component';
import { CueCardComponent } from './content/cue-card/cue-card.component';


@NgModule({
  declarations: [AppComponent, ContentComponent, CueCardComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [ContentComponent]  // Ensure entry components are defined
  // bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector) {
    const contentElement = createCustomElement(ContentComponent, { injector });
    customElements.define('app-content', contentElement);
  }

  ngDoBootstrap() {}  // Bootstrap not required for web components
}
