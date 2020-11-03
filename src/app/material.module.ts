import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatInputModule
  ]
})
export class MaterialModule {
}
