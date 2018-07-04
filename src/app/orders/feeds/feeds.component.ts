import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../orders.service';
import { CommonConfigService } from '../../common-config.service';

@Component({
	selector: 'app-feeds',
	templateUrl: './feeds.component.html',
	styleUrls: ['./feeds.component.less']
})
export class FeedsComponent implements OnInit {
	
	ordersData: any = [];
	
	constructor(
		private service: OrdersService,
		private commonConfig: CommonConfigService,
	) { 

	}

	ngOnInit() {
		this.service.fetchOrdersFeeds()
			.subscribe(res => this.ordersData = res);
	}

}
