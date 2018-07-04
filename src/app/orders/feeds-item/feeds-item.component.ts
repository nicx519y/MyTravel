import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownComponent } from '../../common-component/countdown/countdown.component';
import { Order } from '.././order';
import { CommonConfigService } from '../../common-config.service';
import { PlaceOrderService } from '../../place-order.service';

@Component({
	selector: 'app-feeds-item',
	templateUrl: './feeds-item.component.html',
	styleUrls: ['./feeds-item.component.less'],
})
export class FeedsItemComponent implements OnInit {

	@Input()
	order: Order;

	@Input()
	type: number;

	@Input()
	showButtonIsShow: boolean = false;

	@Output()
	changeEnd: EventEmitter<Order> = new EventEmitter<Order>();

	@Output()
	changeStart: EventEmitter<any> = new EventEmitter();

	@ViewChild(CountdownComponent)
	counter: CountdownComponent;

	payButtonIsShow: boolean = false;
	dateFormat: string;

	constructor(
		private router: Router,
		private commonConfig: CommonConfigService,
		private service: PlaceOrderService,
	) { 

	}

	ngOnInit() {
		this.dateFormat = this.commonConfig.getDateTimeFormat();
		this.order.totalPrice = this.order.basePrice + this.order.extraPrice;
		this.payButtonIsShow = (this.order.orderStatus == 'processing' || this.order.orderStatus == 'payFail');
	}

	showDetail() {
		this.router.navigate(['orders/detail', this.order.orderId]);
	}

	changeHandler(waterItems) {
		this.changeStart.emit();
		this.service.updateOrderPrice({
			productUuid: this.order.productInfo.productUuid,
			yacht: {
				id: parseInt(this.order.yacht.id),
				person: this.order.yacht.person,
				num: this.order.yacht.num,
			},
			waterItems: this.order.waterItems.map(item => {
				return { id: parseInt(item.id), num: (item.num || 0) }
			}),
			boardingTime: this.order.boardingTime,
		})
		.subscribe(res => {
			this.order.totalPrice = res.price;
			this.changeEnd.emit(this.order);
		});
	}

	countdownFinishedHandler() {
		this.order.orderStatus = 'closed';
	}

}
