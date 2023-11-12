import {Component, OnInit} from '@angular/core';
import {Message} from '../../models/message.model';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss']
})
export class ToastMessageComponent implements OnInit {

  cssClass = '';
  message: Message;

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {

    this.messageService.messageManager.subscribe(msg => {
      this.message = msg;
      this.cssClass = 'show ' + msg.cssClass;

      // After 3 seconds, remove the show class from DIV
      setTimeout(() => {
        this.cssClass = '';
      }, 3000);
    });
  }

}
