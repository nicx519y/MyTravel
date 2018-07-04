export class Order {
	orderId: string = '';
	productInfo: {
		productUuid: string,
		productName: string,
		mainImage: string,
		productType: number,
	};
	orderStatus: string;
	leftTime: number = 0;
	basePrice: number = 0;
	extraPrice: number = 0;
	yacht: {
		id: string,
		name: string,
		image: string,
		person: number,
		persons?: number[],
		num?: number,
	};
	waterItems: {
		id: string,
		name: string,
		numPerson: number,
		description: string,
		num?: number,
		price: number,
	}[];
	contactName: string = '';
	contactPhone: string = '';
	boardingTime: Date;
	buyerMessage: string = '';
	totalPrice: number = 0;
	tips: string = '';
	refundRule: string = '待出票后更新。';
	boardingLocation: string = '待出票后更新。';

	constructor(data: any={}) {
		console.log(data);
		for(let i in data) {
			this[i] = data[i];
		}
	}
}

