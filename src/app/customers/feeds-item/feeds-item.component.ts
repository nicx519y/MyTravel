import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-feeds-item',
	templateUrl: './feeds-item.component.html',
	styleUrls: ['./feeds-item.component.less']
})
export class FeedsItemComponent implements OnInit {

	@Input() 
	imageSrc: string = '';

	@Input()
	title: string = '';
		
	constructor() { }

	ngOnInit() {
	}

}
