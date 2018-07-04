import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PlaceOrderService {

	constructor(
		private http: HttpClient,
	) { }
	//获取项目详情
	fetchProductDetail(params: any): Observable<any> {
		return this.http.post('/product/get-product-detail', params);
	}
	//获取游艇列表
	fetchYatchList(params: any): Observable<any> {
		return this.http.post('/product/get-yacht-list', params);
	}
	//获取水上项目列表
	fetchWaterItemList(params: any): Observable<any> {
		return this.http.post('/product/get-wateritem-list', params);
	}
	//新建订单
	createOrder(params: any): Observable<any> {
		return this.http.post('/order/create-order', params);
	}

	updateOrderPrice(params: {
		productUuid: string,
		yacht: {
			id: number,
			person: number,
			num: number,
		},
		waterItems?: {
			id: number,
			num: number,
		}[],
		boardingTime?: any,
	}): Observable<any> {
		return this.http.post('/product/calculate-price', params);
	}

	//解析日期字符串
	convertDateFromString(dateString) { 
		if (dateString) { 
			var arr1 = dateString.split(" "); 
			var sdate = arr1[0].split('-'); 
			var date = new Date(sdate[0], sdate[1]-1, sdate[2]); 
			return date;
		} 
	}

	//格式化日期
	dateFormat = function (date: Date, fmt: string) {
		var o = {
			"M+": date.getMonth() + 1, //月份 
			"d+": date.getDate(), //日 
			"h+": date.getHours(), //小时 
			"m+": date.getMinutes(), //分 
			"s+": date.getSeconds(), //秒 
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
			"S": date.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	}
}
