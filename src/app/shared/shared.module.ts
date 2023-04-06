import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppMaterialModule } from './app-material.module';

@NgModule({
  imports: [
    CommonModule,

  ],
  exports: [
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
