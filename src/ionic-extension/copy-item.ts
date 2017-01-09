import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Directive, ElementRef, Input, QueryList, Renderer, Optional, ViewChild, ViewEncapsulation } from '@angular/core';

import { Button, Config, Form, Icon, Ion, Label, ItemReorder } from 'ionic-angular';

@Component({
	selector: 'copy-ion-item',
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
export class CopyItem extends Ion {
	_ids: number = -1;
	_inputs: Array<string> = [];
	_label: Label;
	_viewLabel: boolean = true;
	_name: string = 'item';
	_shouldHaveReorder: boolean = false;

	/**
	 * @private
	 */
	id: string;

	/**
	 * @private
	 */
	labelId: string = null;

	/**
	 * @input {string} The predefined color to use. For example: `"primary"`, `"secondary"`, `"danger"`.
	 */
	@Input()
	set color(val: string) {
		this._updateColor(val, this._name);
	}

	/**
	 * @input {string} The mode to apply to this component.
	 */
	@Input()
	set mode(val: string) {
		this._setMode(val);
	}

	constructor(
		form: Form,
		config: Config,
		elementRef: ElementRef,
		renderer: Renderer,
		@Optional() reorder: ItemReorder
	) {
		super(config, elementRef, renderer, 'item');

		this._setName(elementRef);
		this._shouldHaveReorder = !!reorder;
		this.id = form.nextId().toString();

		// auto add "tappable" attribute to ion-item components that have a click listener
		if (!(<any>renderer).orgListen) {
			(<any>renderer).orgListen = renderer.listen;
			renderer.listen = function(renderElement: HTMLElement, name: string, callback: Function): Function {
				if (name === 'click' && renderElement.setAttribute) {
					renderElement.setAttribute('tappable', '');
				}
				return (<any>renderer).orgListen(renderElement, name, callback);
			};
		}
	}

	/**
	 * @private
	 */
	registerInput(type: string) {
		this._inputs.push(type);
		return this.id + '-' + (++this._ids);
	}

	/**
	 * @private
	 */
	ngAfterContentInit() {
		if (this._viewLabel && this._inputs.length) {
			let labelText = this.getLabelText().trim();
			this._viewLabel = (labelText.length > 0);
		}

		if (this._inputs.length > 1) {
			this.setElementClass('item-multiple-inputs', true);
		}
	}

	/**
	 * @private
	 */
	_updateColor(newColor: string, componentName?: string) {
		componentName = componentName || 'item'; // item-radio
		this._setColor(newColor, componentName);
	}

	/**
	 * @private
	 */
	_setName(elementRef: ElementRef) {
		let nodeName = elementRef.nativeElement.nodeName.replace('ION-', '');

		if (nodeName === 'LIST-HEADER' || nodeName === 'ITEM-DIVIDER') {
			this._name = nodeName;
		}
	}

	/**
	 * @private
	 */
	getLabelText(): string {
		return this._label ? this._label.text : '';
	}

	/**
	 * @private
	 */
	@ContentChild(Label)
	set contentLabel(label: Label) {
		if (label) {
			this._label = label;
			this.labelId = label.id = ('lbl-' + this.id);
			if (label.type) {
				this.setElementClass('item-label-' + label.type, true);
			}
			this._viewLabel = false;
		}
	}

	/**
	 * @private
	 */
	@ViewChild(Label)
	set viewLabel(label: Label) {
		if (!this._label) {
			this._label = label;
		}
	}

	/**
	 * @private
	 */
	@ContentChildren(Button)
	set _buttons(buttons: QueryList<Button>) {
		buttons.forEach(button => {
			if (!button._size) {
				button.setElementClass('item-button', true);
			}
		});
	}

	/**
	 * @private
	 */
	@ContentChildren(Icon)
	set _icons(icons: QueryList<Icon>) {
		icons.forEach(icon => {
			icon.setElementClass('item-icon', true);
		});
	}
}

/**
 * @private
 */
@Directive({
	selector: 'ion-item-divider',
	host: {
		'class': 'item-divider'
	}
})
export class ItemDivider extends Ion {

	/**
	 * @input {string} The predefined color to use. For example: `"primary"`, `"secondary"`, `"danger"`.
	 */
	@Input()
	set color(val: string) {
		this._setColor(val);
	}

	/**
	 * @input {string} The mode to apply to this component.
	 */
	@Input()
	set mode(val: string) {
		this._setMode(val);
	}

	constructor(form: Form, config: Config, elementRef: ElementRef, renderer: Renderer) {
		super(config, elementRef, renderer, 'item-divider');
	}

}

/**
 * @private
 */
@Directive({
	selector: 'ion-item,[ion-item]',
	host: {
		'class': 'item-block'
	}
})
export class ItemContent { }


/**
	* @private
	*/
@Directive({
	selector: 'ion-item-group'
})
export class ItemGroup { }
