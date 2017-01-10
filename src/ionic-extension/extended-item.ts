import { ChangeDetectionStrategy, Component, ElementRef, Renderer, Optional, ViewEncapsulation } from '@angular/core';

import { Config, Form, ItemReorder, Item } from 'ionic-angular';

class TempItem extends Item {
	static decorators = undefined;
}

@Component({
	selector: 'extended-ion-item',
	templateUrl: './extended-item.html',
	host: {
		'class': 'item item-block'
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class ExtendedItem extends TempItem {
	constructor(
		form: Form,
		config: Config,
		elementRef: ElementRef,
		renderer: Renderer,
		@Optional() reorder: ItemReorder
	) {

		super(form, config, elementRef, renderer, reorder);
	}
}