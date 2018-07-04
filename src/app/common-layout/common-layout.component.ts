import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-common-layout',
	templateUrl: './common-layout.component.html',
	styleUrls: ['./common-layout.component.less']
})
export class CommonLayoutComponent implements OnInit {

	@ViewChild('content')
	contentContainer: ElementRef;

	private listen: Subscription;

	navIsShow: boolean = true;
	tabsIsShow: boolean = true;

	constructor(
		private router: Router,
	) { }

	ngOnInit() {
		this.listen = this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd)
			)
			.subscribe(event => {
				this.contentContainer.nativeElement.scrollTop = 0;

				//管理tabs和nav的显示
				if(/^\/place-order/.test(event['url'])) {
					this.navIsShow = this.tabsIsShow = false;
				} else {
					this.navIsShow = this.tabsIsShow = true;
				}
			});
	}

	

	ngOnDestroy() {
		this.listen.unsubscribe();
	}

}
