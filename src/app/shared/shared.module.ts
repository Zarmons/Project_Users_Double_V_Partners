import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    ToastModule
  ],
  exports: [AlertComponent]
})
export class SharedModule { }
