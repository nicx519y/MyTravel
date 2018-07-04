import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConfigService } from '../../common-config.service';
import { Order } from '../order';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PlaceOrderService } from '../../place-order.service';
import { OrdersService } from '../../orders.service';

@Component({
	selector: 'app-order-detail',
	templateUrl: './order-detail.component.html',
	styleUrls: ['./order-detail.component.less']
})
export class OrderDetailComponent implements OnInit {

	isReady: boolean = false;
	type: 1 | 2 = 1;		//1: orderCommit, 2: orderDetail
	private formData: Order;
	private myForm: FormGroup;
	private dateTimeMin: Date;
	private dateTimeFormat;
	private isLoading: boolean = false;

	constructor(
		private placeOrderService: PlaceOrderService,
		private orderDetailService: OrdersService,
		private router: Router,
		private activedRoute: ActivatedRoute,
		private commonConfig: CommonConfigService,
		private fb: FormBuilder,
	) { }

	ngOnInit() {
		this.dateTimeMin = this.commonConfig.getDateTimeMin();
		this.dateTimeFormat = this.commonConfig.getDateTimeFormat();

		//订单提交
		if(/\/commit\//.test(this.router.url)) {
			this.createOrderFormRender();
		//订单详情
		} else if(/\/detail\//.test(this.router.url)) {
			this.orderDetailRender();
		}
	}

	createOrderFormRender() {
		this.type = 1;
		this.activedRoute.params.subscribe(params => {
			this.formData = new Order(JSON.parse(params.orderData));
			let boardingTime = new Date(this.formData.boardingTime);
			this.formData.boardingTime = boardingTime;
			this.formData.totalPrice = this.formData.basePrice + (this.formData.extraPrice || 0);

			this.myForm = this.fb.group({
				boardingTime: [this.formData.boardingTime, Validators.required],
				contactName: ['', Validators.required ],
				contactPhone: ['', Validators.required],
				buyerMessage: '',
			});

			this.isReady = true;
		});
	}

	orderDetailRender() {
		this.type = 2;
		this.activedRoute.params
		.subscribe(params => {
			if(!params.orderId) throw 'OrderId is not found.';
			this.orderDetailService.fetchOrderDetail(params)
				.subscribe(response => {
					// response.boardingTime = response.boardingTime;
					// console.log(response.boardingTime);
					this.formData = new Order(response);
					console.log(this.formData);
					this.myForm = this.fb.group({});
					this.isReady = true;
				});
		});
	}

	onChangeStart() {
		this.isLoading = true;
	}

	onChangeEnd(order: Order) {
		this.isLoading = false;
		this.formData = order;
	}

	onSubmit() {
		this.onChangeStart();
		this.placeOrderService.createOrder({
			productUuid: this.formData.productInfo.productUuid,
			yacht: this.formData.yacht,
			waterItems: this.formData.waterItems
				.filter(item => item.num > 0)
				.map(item => { 
					return { id: item.id, num: item.num }
				}),
			startTime: this.myForm.value.boardingTime,
			contactName: this.myForm.value.contactName,
			contactPhone: this.myForm.value.contactPhone,
			buyerMessage: this.myForm.value.buyerMessage,
			totalPrice: this.formData.totalPrice,
		})
		.subscribe(res => {
			this.router.navigate(['/orders/detail', res.orderId], { replaceUrl: true });
		});
	}

}
