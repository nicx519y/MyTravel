import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-feeds-item',
	templateUrl: './feeds-item.component.html',
	styleUrls: ['./feeds-item.component.less']
})
export class FeedsItemComponent implements OnInit {

	@Input() cover: string = '';
	@Input() title: string = '';
	@Input() lowPrice: string = '';
	@Input() highPrice: string = '';
	@Input() duration: string = '';
	@Input() link: string = '';

	constructor() { }

	ngOnInit() {

	}

}
