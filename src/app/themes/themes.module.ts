import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesRoutingModule } from './themes-routing.module';
import { FeedsComponent } from './feeds/feeds.component';
import { FeedsItemComponent } from './feeds-item/feeds-item.component';
import { CommonComponentModule } from '../common-component/common-component.module';
import { httpInterceptorProviders } from '../interceptor.service';
import { ThemesService } from '../themes.service';
import { NavComponent } from '../nav/nav.component'

@NgModule({
	imports: [
		CommonModule,
		ThemesRoutingModule,
		CommonComponentModule,
	],
	declarations: [
		FeedsComponent,
		FeedsItemComponent,
		NavComponent,
	],
	providers: [
		ThemesService,
		httpInterceptorProviders,
	],
	bootstrap: [FeedsComponent]
})
export class ThemesModule { }
