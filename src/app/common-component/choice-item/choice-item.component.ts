import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
	selector: 'app-choice-item',
	templateUrl: './choice-item.component.html',
	styleUrls: ['./choice-item.component.less'],
	host: {
		'[class.active]' : 'isActive',
		'[class.disabled]' : 'isDisabled',
    },
})
export class ChoiceItemComponent implements OnInit {

	@Output()
	actived: EventEmitter<any> = new EventEmitter<any>();

	@Output()
	unactived: EventEmitter<any> = new EventEmitter<any>();

	@Output()
	fire: EventEmitter<any> = new EventEmitter<any>();

	@Input()
	activeValue: any;

	@Input()
	canValue: any[] = [];

	@Input()
	itemValue: any;

	private active: boolean = false;

	constructor() { }

	ngOnInit() {

	}

	ngDoCheck() {
		if(this.active && this.itemValue != this.activeValue) {
			this.active = false;
			this.unactived.emit(this.itemValue);
		}

		if(!this.active && this.itemValue == this.activeValue) {
			this.active = true;
			this.actived.emit(this.itemValue);
		}
	}

	@HostListener('click', ['$event.target'])
	onClick(item: HTMLElement) {
		this.fire.emit(this.itemValue);	
	}

	get isDisabled(): boolean {
		return this.canValue && this.canValue.length > 0 && this.canValue.indexOf(this.itemValue) < 0;
	}
	

	get isActive(): boolean {
		return this.active;
	}
}
