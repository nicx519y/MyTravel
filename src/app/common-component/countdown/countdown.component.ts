import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-countdown',
	templateUrl: './countdown.component.html',
	styleUrls: ['./countdown.component.less']
})
export class CountdownComponent implements OnInit {

	@Input()
	leftTime: number = 0;

	@Input()
	stopTime: number = 0;

	@Input()
	format: string = 'mm分ss秒';

	@Output()
	start: EventEmitter<number> = new EventEmitter<number>();

	@Output()
	finished: EventEmitter<number> = new EventEmitter<number>();

	now: number;
	private timer;

	constructor() { }

	ngOnInit() {
		this.now = this.leftTime * 1000;
		this.start.emit(this.now);
		this.timer = setInterval(() => {
			if (this.now > this.stopTime) {
				this.now = Math.max(this.stopTime, this.now - 1000);
				if(this.now == this.stopTime) {
					this.finished.emit(this.now);
				}
			} else {
				this.now = this.stopTime;
				clearInterval(this.timer);
			}
		}, 1000);
	}

}
