import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { FeedsComponent } from './feeds/feeds.component';
import { CommonComponentModule } from '../common-component/common-component.module';
import { CustomersService } from '../customers.service';
// import { SwiperModule } from 'ngx-swiper-wrapper';
import { FeedsItemComponent } from './feeds-item/feeds-item.component';


@NgModule({
	imports: [
		CommonModule,
		CustomersRoutingModule,
		CommonComponentModule,
		// SwiperModule,
	],
	providers: [
		CustomersService,
	],
	declarations: [
		FeedsComponent,
		FeedsItemComponent,
	],
	entryComponents: [ FeedsComponent ],
})
export class CustomersModule { }
