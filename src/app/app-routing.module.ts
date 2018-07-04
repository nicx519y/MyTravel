import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'themes',
		pathMatch: 'full',
	},
	{
		path: 'themes',
		loadChildren: 'src/app/themes/themes.module#ThemesModule',
	},
	{
		path: 'customers',
		loadChildren: 'src/app/customers/customers.module#CustomersModule',
	},
	{
		path: 'contact',
		loadChildren: 'src/app/contact/contact.module#ContactModule',
	},
	{
		path: 'orders',
		loadChildren: 'src/app/orders/orders.module#OrdersModule',
		pathMatch: 'prefix',
	},
];

@NgModule({
	imports: [ 
		RouterModule.forRoot(routes, {
			enableTracing: false, // <-- debugging purposes only
			preloadingStrategy: PreloadAllModules	//预加载
		})
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
