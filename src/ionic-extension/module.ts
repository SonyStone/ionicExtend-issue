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

