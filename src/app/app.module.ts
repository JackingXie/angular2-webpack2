import { NgModule, ApplicationRef }       from '@angular/core';
import { BrowserModule }                  from '@angular/platform-browser';
import { HttpModule }                     from '@angular/http';
import { FormsModule }                    from '@angular/forms';
import { NgbModule }                      from '@ng-bootstrap/ng-bootstrap';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { AppComponent }                   from './app.component';
import { AppRoutingModule }               from './app.routing.module';
import { HomeComponent }                  from './home/home.component';
import { AboutComponent }                 from './about/about.component';
import { ApiService }                     from './shared';

@NgModule({
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		NgbModule.forRoot()
	],
	declarations: [
		AppComponent,
		AboutComponent,
		HomeComponent
	],
	providers: [
		ApiService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {
	constructor(public appRef: ApplicationRef) {}
	hmrOnInit(store) {
		console.log('HMR store', store);
	}
	hmrOnDestroy(store) {
		let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
		// recreate elements
		store.disposeOldHosts = createNewHosts(cmpLocation);
		// remove styles
		removeNgStyles();
	}
	hmrAfterDestroy(store) {
		// display new elements
		store.disposeOldHosts();
		delete store.disposeOldHosts;
	}
}
