import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ThemesService {

	constructor(
		private http: HttpClient,
	) {}

	fetchFeedsData(params: Object): Observable<any> {
		return this.http.post('/product/get-product-list', params);
	}

	fetchLocationData(params: Object = null): Observable<any> {
		return this.http.post('/product/get-location-list', params);
	}
}
