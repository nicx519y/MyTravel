import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabbarComponent } from './tabbar/tabbar.component';
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import { CommonComponentModule } from './common-component/common-component.module';
import { httpInterceptorProviders } from './interceptor.service';


@NgModule({
	declarations: [
		AppComponent,
		TabbarComponent,
		CommonLayoutComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		CommonComponentModule,
	],
	exports: [
		CommonComponentModule,
	],
	providers: [
		httpInterceptorProviders,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
