import {EventEmitter, Injectable} from '@angular/core';
import {Message} from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageManager: EventEmitter<Message> = new EventEmitter();

  constructor() {
  }

  sendMessage(text: string, cssClass?: string): void {
    this.messageManager.emit({text, cssClass});
  }


  sendSuccessMessage(text: string): void {
    this.messageManager.emit({text, cssClass: 'toast-message-success'});
  }

  sendErrorMessage(text: string): void {
    this.messageManager.emit({text, cssClass: 'toast-message-error'});
  }

  sendWarningMessage(text: string): void {
    this.messageManager.emit({text, cssClass: 'toast-message-warning'});
  }
}
