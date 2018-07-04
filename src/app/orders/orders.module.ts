import { NgModule } from '@angular/core';
import { httpInterceptorProviders } from '../interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { CommonComponentModule } from '../common-component/common-component.module';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { FeedsItemComponent } from './feeds-item/feeds-item.component';
import { FeedsComponent } from './feeds/feeds.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderStatusPipe } from '../order-status.pipe';
import { ProductTypePipe } from '../product-type.pipe';
import { ProductUnitComponent } from './product-unit/product-unit.component';

@NgModule({
	imports: [
		CommonModule,
		OrdersRoutingModule,
		CommonComponentModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [
		PlaceOrderComponent,
		FeedsItemComponent,
		FeedsComponent,
		OrderDetailComponent,
		OrderStatusPipe,
		ProductTypePipe,
		ProductUnitComponent,
	],
	providers: [
		httpInterceptorProviders,
	],
	exports: [
	]
})
export class OrdersModule { }
