import { Component, OnInit, Input, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonConfigService } from '../common-config.service';


@Component({
	selector: 'app-tabbar',
	templateUrl: './tabbar.component.html',
	styleUrls: ['./tabbar.component.less']
})
export class TabbarComponent implements OnInit {

	public config;

	constructor(
		private configService: CommonConfigService,
		private router: Router,
		private activedRoute: ActivatedRoute,
	) { }

	ngOnInit() {
		this.config = this.configService.getTabsConfig();
	}

	tabSelectHandler(url: string, mat: RegExp) {
		if(!mat.test(this.router.url))
			this.router.navigateByUrl(url);
	}

	itemIsActive(mat: RegExp) {
		return mat.test(this.router.url);
	}

	getIcon(iconSrc: { default: string, active: string }, match: RegExp) {
		let isActive: boolean = this.itemIsActive(match);
		// let src = isActive ? iconSrc.active : iconSrc.default;
		let className = !isActive ? iconSrc.default : iconSrc.active;
		// return '<img src="' + src + '" />';

		return '<div class="app-icon '+className+'" ></div>';
	}

}
