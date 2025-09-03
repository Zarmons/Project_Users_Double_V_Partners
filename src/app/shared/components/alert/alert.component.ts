import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-alert',
  template: `<p-toast></p-toast>`,
  providers: [MessageService],
})
export class AlertComponent {

  constructor(private messageService: MessageService) {}

  showToastError(msg: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: msg,
    });
  }

  showToastSuccess(msg: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: msg,
    });
  }

  clearMessages() {
    this.messageService.clear();
  }
}

