import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';

import { ExtendedItem } from './extended-item';
import { CopyItem } from './copy-item';

// import { BasePanelComponent } from './base-panel.component';
import { MyPanelComponent } from './my-panel.component';

@NgModule({
	imports: [
		BrowserModule,
		IonicModule,
	],
	exports: [
		ExtendedItem,
		CopyItem,
		// BasePanelComponent,
		MyPanelComponent,
	],
	declarations: [
		ExtendedItem,
		CopyItem,
		// BasePanelComponent,
		MyPanelComponent,
	],
})
export class IonicExtensionModule { }

