import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpResponse, HttpHandler, HttpParams, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

const HOST: string = 'http://59.110.143.218:8080';

@Injectable({
	providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const hostRequest = req.clone({
			url: HOST + req.url,
			body: this.queryParams(req.body),
			setHeaders: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});
		return next.handle(hostRequest)
			.pipe(
				filter(event => event.type == 4 && event instanceof HttpResponse && event.body),
				map(event => event as HttpResponse<any>),
				map(event => {
					let data = event.body;
					if(data['error']['returnCode'] == 0) {

						console.log('request success: ', data);

						let body = data['data'];
						body.boardingTime && (body.boardingTime *= 1000);
						body.startTime && (body.startTime *= 1000);
						
						return event.clone({
							body: body
						});
					} else {
						throw data['data'];
					}
				})
			);
	}

	private queryParams(paramsObject: any): string {
			let obj = { userId: '12345678' };
			if(paramsObject) {
				for(let key in paramsObject) {
					if(key != 'userId')
						obj[key] = paramsObject[key];
				}
			}
			let str = '';
			for(let key in obj) {
				if(str != '') str += '&';
				str += key + '=' + (typeof obj[key] == 'string' ? obj[key] : 
				(obj[key] instanceof Date ? Math.round(obj[key].getTime() / 1000) : JSON.stringify(obj[key])));
			}
			console.log(str);
			return str;
	}

	
}

export const httpInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true, }
];