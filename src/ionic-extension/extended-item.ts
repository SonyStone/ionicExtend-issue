import { ChangeDetectionStrategy, Component, ElementRef, Renderer, Optional, ViewEncapsulation } from '@angular/core';

import { Config, Form, ItemReorder, Item } from 'ionic-angular';

import { CopyItem } from './copy-item';

@Component({
	selector: 'extended-ion-item',
	template:
	'<ng-content select="[item-left],ion-checkbox:not([item-right])"></ng-content>' +
	'<div class="item-inner">' +
	'<div class="input-wrapper">' +
	'<ng-content select="ion-label"></ng-content>' +
	'<ion-label *ngIf="_viewLabel">' +
	'<ng-content></ng-content>' +
	'</ion-label>' +
	'<ng-content select="ion-select,ion-input,ion-textarea,ion-datetime,ion-range,[item-content]"></ng-content>' +
	'</div>' +
	'<ng-content select="[item-right],ion-radio,ion-toggle"></ng-content>' +
	'<ion-reorder *ngIf="_shouldHaveReorder"></ion-reorder>' +
	'</div>' +
	'<div class="button-effect"></div>',
	host: {
		'class': 'item'
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class ExtendedItem extends Item {
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