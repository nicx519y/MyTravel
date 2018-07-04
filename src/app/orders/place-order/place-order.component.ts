import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PopupComponent } from 'ngx-weui';
import { PlaceOrderService } from '../../place-order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConfigService } from '../../common-config.service';
import { Order } from '../order';

@Component({
	selector: 'app-place-order',
	templateUrl: './place-order.component.html',
	styleUrls: ['./place-order.component.less'],
	providers: [ PlaceOrderService ],
	encapsulation: ViewEncapsulation.None,
})
export class PlaceOrderComponent implements OnInit {

	@ViewChild('commitPopup')
	commitPopup: PopupComponent;

	data: {
		productId: string,
		productUuid: string,
		productType: number,
		state: number,
		productName: string,
		productBrief: string,
		locationName: string,
		mainImage: string,
		duration: number,
		lowPrice: number,
		highPrice: number,
		topic: string,
		destation: string,
		description: string,
		swipeData: string[],
		instructions: {
			label: string,
			icon: string,
			value: string,
		}[],
		boardingLocation: string,
		bookingTips: string,
		ratingInfo: {
			price: number,
			yachtName: string,
			minPerson: number,
			maxPerson: number,
		}[],
		yachtList: {
			name: string,
			person: number[],
			image: string,
			description: string,
		}[],
		waterItems: {
			name: string,
			maxPerson: number,
			image: string,
			description: string,
			price: number,
		}[]
	};

	tempPrice: string;

	//游艇列表
	yachtList: {
		id: number,
		name: string,
		image: string,
		person: number[],
		description: string,
	}[];
	personList: number[];
	canPersonList: number[];
	canYachtIdList: number [];

	//水上项目列表
	waterItemList: {
		name: string,
		numPerson: number,
		price: number,
		image: string,
		description: string,
	}[];

	price: string;

	//当前订单配置
	currentYacht: {
		id: number,
		person: number,
		num: number,
	} = {
		id: 0,
		person: 0,
		num: 1,
	};

	private boardingTime: Date;
	private minDateTime: Date;
	private dateTimeFormat: string;

	//swiper配置
	swiperConfig = {
		autoHeight: true,
		height: 300,
		direction: 'horizontal',
		slidesPerView: 'auto',
		simulateTouch: false,
		autoplay: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		},
	};

	popupConfig = {
		confirm: '',
		cancel: '',
	};

	private canOrder: boolean = false;

	constructor(
		private service: PlaceOrderService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private commonConfig: CommonConfigService,
	) { }

	ngOnInit() {

		this.minDateTime = this.commonConfig.getDateTimeMin();
		this.boardingTime = this.commonConfig.getDateTimeMin();
		this.dateTimeFormat = this.commonConfig.getDateTimeFormat();


		this.activatedRoute.params.subscribe(params => {
			this.service.fetchProductDetail(params)
				.subscribe(result => {
					this.data = result;
					this.price = this.tempPrice = this.data.lowPrice.toString() + '-' + this.data.highPrice.toString();
					
					const params = { productUuid: this.data.productUuid };

					Promise.all([
						this.service.fetchYatchList(params).toPromise(),
						this.service.fetchWaterItemList(params).toPromise()
					])
					.then(results => {
						this.yachtList = results[0];
						this.waterItemList = results[1];


						this.personList = this.createPersonList(this.yachtList);

						// this.updatePrice();

						this.canOrder = true;
					});
				});
		})
	}

	//游艇选择变更
	yachtChange(yachtId: any) {
		let list = this.yachtList
			.filter(yacht => yacht.id == parseInt(yachtId));
		
		if(list && list.length > 0) {
			this.canPersonList = list[0]['person'];
		} else {
			this.canPersonList = [];
		}
		
		this.updatePrice();
	}

	//人数选择变更
	personTotalChange(person: any) {
		if(typeof parseInt(person) == 'number') {
			this.canYachtIdList = this.yachtList
				.filter(yacht => yacht.person.indexOf(person) >= 0)
				.map(yacht => yacht.id);
		} else {
			this.canYachtIdList = [];
		}
		this.updatePrice();
	}

	//总数变更
	numChange(num: number) {
		this.currentYacht.num = num;
		this.updatePrice();
	}

	//订单有变更，更新价格
	updatePrice() {
		if(this.currentYacht.num > 0 && this.currentYacht.id && this.currentYacht.person) {
			let data = Object.assign({}, {
				productUuid: this.data.productUuid,
				yacht: this.currentYacht,
				boardingTime: this.service.dateFormat(this.boardingTime, 'yyyy-MM-dd hh:mm:ss')
			});
			this.service.updateOrderPrice(data)
				.subscribe(res => this.price = res.price);
		} else {
			this.price = this.tempPrice;
		}
	}

	createPersonList(yachtList: any[]) {
		let arr: number[] = [];
		for(let i = 0; i < yachtList.length; i ++) {
			arr = arr.concat(yachtList[i]['person']);
		}
		return Array.from(new Set(arr)).sort((a, b) => a - b);
	}

	canCommit(): boolean {
		return this.currentYacht.id && this.currentYacht.num > 0 && this.currentYacht.person > 0;
	}


	confirm() {
		this.commitPopup.show();
	}

	commit() {

		let orderData = {
			productInfo: {
				productUuid: this.data.productUuid,
				productName: this.data.productName,
				productType: this.data.productType,
				mainImage: this.data.mainImage,
			},
			yacht: {
				id: this.currentYacht.id,
				person: this.currentYacht.person,
				name: this.yachtList.filter(yacht => yacht.id == this.currentYacht.id)[0]['name'],
				num: this.currentYacht.num,
			},
			waterItems: this.waterItemList,
			boardingTime: this.boardingTime.getTime(),
			basePrice: this.price,
		};

		console.log('before order commit: ', orderData);

		this.router.navigate(['/orders/commit', JSON.stringify(orderData)]);
	}
}
