import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { FeedsComponent } from './feeds/feeds.component';
import { CommonComponentModule } from '../common-component/common-component.module';


@NgModule({
  imports: [
    CommonModule,
	ContactRoutingModule,
	CommonComponentModule,
  ],
  declarations: [FeedsComponent]
})
export class ContactModule { }
