import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-product-unit',
	templateUrl: './product-unit.component.html',
	styleUrls: ['./product-unit.component.less']
})
export class ProductUnitComponent implements OnInit {

	@Input()
	image: string = '';

	@Input()
	name: string = '';

	@Input()
	description: string = '';

	@Input()
	num: number = -1;

	@Input()
	price: number = -1;

	@Input()
	others: {
		name: string,
		description: string,
		numPerson: number,
		price: number,
		num: number,
	}[] = [];

	@Input()
	type: 1 | 2 = 1;

	@Output()
	change: EventEmitter<any> = new EventEmitter<any>();

	private othersIsShow: boolean = true;

	constructor(
	) { }

	ngOnInit() {

	}

	othersTaggle() {
		this.othersIsShow = !this.othersIsShow;
	}

	waterItemsChange(num, index) {
		let price: number = 0;
		for(let i = 0; i < this.others.length; i ++) {
			if(index == i) {
				price += this.others[i].price * num;
				this.others[i].num = num;
			} else {
				price += this.others[i].price * (this.others[i].num || 0);
			}
		}
		this.price = price;

		this.change.emit(this.others);
	}

}
