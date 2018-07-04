import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedsComponent } from './feeds/feeds.component';
import { FeedsItemComponent } from './feeds-item/feeds-item.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PlaceOrderComponent } from './place-order/place-order.component';


const routes: Routes = [
	{
		path: 'feeds',
		component: FeedsComponent,
	},
	{
		path: 'detail/:orderId',
		component: OrderDetailComponent,
	},
	{
		path: 'commit/:orderData',
		component: OrderDetailComponent,
	},
	{
		path: 'place/:productUuid',
		component: PlaceOrderComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class OrdersRoutingModule { }
