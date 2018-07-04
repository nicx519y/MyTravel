import { Component, } from '@angular/core';
import { CommonConfigService } from './common-config.service';
import { Observable, pipe } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd, } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
})
export class AppComponent {

	constructor(
		private commonConfig: CommonConfigService,
		private activedRoute: ActivatedRoute,
		private router: Router,
	) {

	}

	getTabsIsShow(): boolean {
		return this.commonConfig.getTabsIsShow(this.router.url);
	}

}
