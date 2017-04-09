import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { ShoppingListAddComponent } from '../shopping-list/shopping-list-add.component';

@NgModule({
	declarations: [
    	ShoppingListComponent,
    	ShoppingListAddComponent,
	],
	imports: [
		FormsModule,
		CommonModule
	]
})
export class ShoppingListModule {}