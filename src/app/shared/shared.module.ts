import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingListComponent } from './building-list/building-list.component';
import { NicknameEditorComponent } from './nickname-editor/nickname-editor.component';
import { NicknameItemComponent } from './nickname-editor/nickname-item/nickname-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    BuildingListComponent,
    NicknameEditorComponent,
    NicknameItemComponent
  ],
  exports: [
    BuildingListComponent,
    NicknameEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
