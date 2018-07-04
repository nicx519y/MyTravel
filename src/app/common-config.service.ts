import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CommonConfigService {

	private _tabsConfig: any[] = [
		{
			name: 'themes',
			link: '/themes',
			icon: {
				default: 'icon-zhutiyou',
				active: 'icon-zhutiyou-active',
			},
			label: '主题游',
			match: /^\/themes\/.*/,
		},
		{
			name: 'customers',
			link: '/customers',
			icon: {
				default: 'icon-dingzhiyou',
				active: 'icon-dingzhiyou-active',
			},
			label: '定制游',
			match: /^\/customers$/,
		},
		{
			name: 'orders',
			link: '/orders/feeds',
			icon: {
				default: 'icon-dingdanchaxun',
				active: 'icon-dingdanchaxun-active',
			},
			label: '订单查询',
			match: /^\/orders\/feeds$/,
		},
		{
			name: 'contact',
			link: '/contact',
			icon: {
				default: 'icon-lianxikefu',
				active: 'icon-lianxikefu-active',
			},
			label: '联系客服',
			match: /^\/contact$/,
		},
	];

	private tabsShowConfig = [
		{
			path: '/themes',
			match: 'prefix',
		},
		{
			path: '/customers',
			match: 'full',
		},
		{
			path: '/contact',
			match: 'full',
		},
		{
			path: '/orders/feeds',
			match: 'full',
		},
	];



	constructor(
		private http: HttpClient,
		private activedRoute: ActivatedRoute,
		private router: Router,
	) { 
		
	}


	getTabsConfig() {
		return this._tabsConfig;
	}

	configPath(path, configs: { path: string, match: string }[]): boolean {
		for(let i = 0; i < configs.length; i ++) {
			let c = configs[i];
			if(c.match == 'full' && c.path == path) {
				return true;
			} else if(c.match == 'prefix' && new RegExp('^' + c.path).test(path)) {
				return true;
			}
		}
		return false;
	}

	getTabsIsShow(path: string): boolean {
		return this.configPath(path, this.tabsShowConfig);
	}

	getDateTimeMin(): Date {
		let t = new Date().getTime() + 1000 * 60 * 60 * 24 * 2;
		let dateTimeMin = new Date();
		dateTimeMin.setTime(t);
		return dateTimeMin;
	}

	getDateTimeFormat(): string {
		return 'yyyy年M月d日 h a';
	}

}
