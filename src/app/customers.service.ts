import { Injectable } from '@angular/core';
import { resolve, reject } from 'q';

@Injectable({
	providedIn: 'root',
})
export class CustomersService {

	constructor() { }

	fetchSwiperData(): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			resolve([
				{
					image: '',
					text: 'swiper 1',
					productId: '2123123',
				},
				{
					image: '',
					text: 'swiper 2',
					productId: '123123',
				},
				{
					image: '',
					text: 'swiper 3',
					productId: '12312414',
				},
				{
					image: '',
					text: 'swiper 4',
					productId: '54123124',
				},
				{
					image: '',
					text: 'swiper 5',
					productId: '235234234',
				},
			]);
		});
	}

	fetchFeedsData(): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			resolve([
				{
					image: '',
					title: '私人派对',
					productId: 17,
				},
				{
					image: '',
					title: '私人派对',
					productId: 18,
				},
				{
					image: '',
					title: '私人派对',
					productId: 19,
				},
				{
					image: '',
					title: '私人派对',
					productId: 20,
				},
				{
					image: '',
					title: '私人派对',
					productId: 21,
				},
			]);
		});
	}
}
