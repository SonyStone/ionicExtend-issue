Doubt
------
I developed an Ionic 2 application and I would like to create extensions for some components already deployed in Ionic 2.
Example
------
For example, I create ngModule and try to extends [ionic item](https://github.com/driftyco/ionic/blob/master/src/components/item/item.ts)
but retaining its functionality and interaction with other Ionic components. Make `<extended-ion-item>` work like `<ion-item>`, but change `<extended-ion-item>` template and add new functionality.

https://github.com/SonyStone/ionicExtend-issue

`extended-item.ts`

<!-- language: lang-typescript -->

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


`module.ts`


    import { NgModule } from '@angular/core';
	import { IonicModule } from 'ionic-angular';
	import { BrowserModule } from '@angular/platform-browser';

	import { ExtendedItem } from './extended-item';
	import { CopyItem } from './copy-item';


	@NgModule({
		imports: [
			BrowserModule,
			IonicModule,
		],
		exports: [
			ExtendedItem,
			CopyItem,
		],
		declarations: [
			ExtendedItem,
			CopyItem,
		],
	})
	export class IonicExtensionModule { }

Problem
-----
But I got this error and really do not know how to solve it.

`console`

    Unhandled Promise rejection: Template parse errors:
    More than one component matched on this element.
    Make sure that only one component's selector can match a given element.
    Conflicting components: Item,PlanExtendedItem ("
		<div class="login-form">

			[ERROR ->]<ion-item padding>

				<ion-label floating>Username</ion-label>
    "): Login@42:3