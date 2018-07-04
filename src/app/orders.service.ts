import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class OrdersService {

	constructor(
		private http: HttpClient,
	) { }

	fetchOrdersFeeds(params: any=null): Observable<any> {
		return this.http.post('/order/get-order-list', params);
	}

	fetchOrderDetail(params: any = null): Observable<any> {
		return this.http.post('/order/get-order-detail', params);
	}

}
