import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

	private orderStatusConfig = {
		'cancel': '订单待处理',
		'closed': '订单已关闭',
		'processing': '等待卖家付款',
		'paySuccess': '订单支付成功',
		'payFail': '订单支付失败',
	};

	transform(typeStatusId: string): any {
		return this.orderStatusConfig[typeStatusId] || '';
	}

}
