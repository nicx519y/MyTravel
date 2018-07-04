import { Component, forwardRef, OnInit, AfterContentInit, QueryList, ContentChildren, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms/src/directives';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChoiceItemComponent } from '../choice-item/choice-item.component';
import { INTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser/src/browser';

@Component({
	selector: 'app-choice',
	templateUrl: './choice.component.html',
	styleUrls: ['./choice.component.less'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ChoiceComponent),
			multi: true
		}
	]
})
export class ChoiceComponent implements ControlValueAccessor {

	private innerValue: any;
	private onTouchedCallback: () => void = function(){};
	private onChangeCallback: (_: any) => void = function(){};

	@ContentChildren(ChoiceItemComponent)
	itemList: QueryList<ChoiceItemComponent>;

	@Output()
	change: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {

	}

	ngAfterViewInit() {
		this.itemList.forEach(item => {
			item.fire.subscribe(itemValue => {
				if(this.value != itemValue)
					this.value = itemValue;
				else
					this.value = null;
			});
		});
	}

	get value(): any {
        return this.innerValue;
    }

    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
			this.onChangeCallback(v);
			this.change.emit(v);
        }
    }

	writeValue(value: any) {
		if (value !== this.innerValue) {
            this.innerValue = value;
        }
	}

	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}

}
