import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'productType'
})
export class ProductTypePipe implements PipeTransform {

	private productTypeConfig = {
		'1': '主题游订单',
		'2': '定制游订单',
	};

	transform(typeId: number): string {
		return this.productTypeConfig[typeId.toString()] || '';
	}

}
