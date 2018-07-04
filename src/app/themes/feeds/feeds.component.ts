import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemesService } from '../../themes.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonConfigService } from '../../common-config.service';
import { map, filter } from 'rxjs/operators';

@Component({
	selector: 'app-feeds',
	templateUrl: './feeds.component.html',
	styleUrls: ['./feeds.component.less']
})
export class FeedsComponent implements OnInit {

	feedsData: {
		mainImage: string,
		productId: number,
		productUuid: string,
		productName: string,
		productBrief: string,
		lowPrice: number,
		highPrice: number,
		duration: string,
	}[] = [];

	navConfig: {
		label: string,
		link: string,
	}[] = [];

	listen: Subscription;

	constructor(
		private service: ThemesService,
		private router: Router,
		private activedRoute: ActivatedRoute,
		private commonConfig: CommonConfigService,
	) {
		
	}

	ngOnInit() {
		
		this.getNavConfig();

		this.listen = this.activedRoute.params
			.pipe(
				filter(params => 'locationName' in params)
			)
			.subscribe(params => {
				console.log('Themes feeds render: ', params);
				this.service.fetchFeedsData(params)
					.subscribe(result => this.feedsData = result);
			});
		
	}

	getNavConfig() {
		this.service.fetchLocationData()
			.pipe(
				map(data => {
					return data.map(locationName => {
						return {
							label: locationName,
							link: ['/themes/', locationName],
						}
					});
				}),
				filter(res => res instanceof Array && res.length > 0),
			)
			.subscribe(res => {
				//自动跳转
				if(this.router.url == '/themes') {
					this.router.navigate(res[0]['link'], { replaceUrl: true });
				} else { 
					this.navConfig = res;
				}
			});
	}


	ngOnDestroy() {
		this.listen.unsubscribe();
	}


}
