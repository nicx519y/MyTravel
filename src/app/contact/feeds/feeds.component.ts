import { Component, OnInit } from '@angular/core';
import { CommonConfigService } from '../../common-config.service';

@Component({
	selector: 'app-feeds',
	templateUrl: './feeds.component.html',
	styleUrls: ['./feeds.component.less']
})
export class FeedsComponent implements OnInit {

	constructor(
		private commonConfig: CommonConfigService
	) { }

	ngOnInit() {
	}

}
