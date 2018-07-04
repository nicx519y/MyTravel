import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CountdownComponent } from './countdown/countdown.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { WeUiModule, InputDirective, PopupConfig, PickerConfig, ToptipsModule, } from 'ngx-weui';
import { ChoiceComponent } from './choice/choice.component';
import { ChoiceItemComponent } from './choice-item/choice-item.component';
import { ImgComponent } from './img/img.component';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		WeUiModule,
		// FormModule,
		SwiperModule,
	],
	declarations: [
		CountdownComponent,
		ChoiceComponent,
		ChoiceItemComponent,
		ImgComponent,
	],
	providers: [
		PopupConfig,
		PickerConfig,
	],
	exports: [
		CommonModule,
		HttpClientModule,
		WeUiModule,
		SwiperModule,
		ChoiceItemComponent,
		ChoiceComponent,
		CountdownComponent,
		ImgComponent,
	],
})
export class CommonComponentModule { }
