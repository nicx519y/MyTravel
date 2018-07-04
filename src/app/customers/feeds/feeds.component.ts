import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../customers.service';
import { CommonConfigService } from '../../common-config.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.less']
})
export class FeedsComponent implements OnInit {

	swiperIndex: number = 0;	
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

	swiperData: {
		image: string,
		text: string,
		productId: number,
	}[] = [];
	feedsData: {
		image: string,
		title: string,
		productId: number,
	}[] = [];
	swiperText: string = '';

	constructor(
		private service: CustomersService,
		private commonConfig: CommonConfigService,
	) { }

	ngOnInit() {

		this.service.fetchSwiperData()
			.then(result => this.swiperData = result);

		this.service.fetchFeedsData()
			.then(result => this.feedsData = result);
	}

}
