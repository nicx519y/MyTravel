import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';

@Component({
	selector: 'app-img',
	templateUrl: './img.component.html',
	styleUrls: ['./img.component.less']
})
export class ImgComponent implements OnInit {

	@Input()
	src: string = '';

	@Input()
	width: number = -1;

	@Input()
	height: number = -1;

	@Input()
	alt: string = '';

	realSrc: string = '';
	imgWidth: number = 0;
	imgHeight: number = 0;

	constructor(
		private container: ViewContainerRef,
	) { }

	ngOnInit() {
		let w: number = this.width > 0 ? this.width : this.container.element.nativeElement.clientWidth;
		let h: number = this.height > 0 ? this.height : this.container.element.nativeElement.clientHeight;
		this.imgWidth = w;
		this.imgHeight = h;
		

		this.realSrc = this.src + '?x-oss-process=image/';
		if(w/h >= 1.51) {
			this.realSrc += 'resize,w_' + w*2;
		} else {
			this.realSrc += 'resize,h_' + h*2;
		}
		this.realSrc += '/crop,x_0,y_0,w_'+w*2+',h_'+h*2+',g_center';
	}

	ngAfterViewInit() {
		
	}
}
