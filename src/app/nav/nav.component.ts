import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CommonConfigService } from '../common-config.service';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

	@Input()
	config: {
		label: string,
		link: any,
	}[] = [];

	constructor(
		private configService: CommonConfigService,
		private router: Router,
		private activedRoute: ActivatedRoute,
	) { }

	ngOnInit() {

	}


}
