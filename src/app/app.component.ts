import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart';
import { GlobalConstants } from './services/global-constants.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store';
  subscription: any;
  count?: number;

  constructor(private messageService: MessageService) {
  }

  
  ngOnInit(): void {
    this.subscription = this.messageService.getMessage(GlobalConstants.CountUpdate)?.subscribe(message => {
      this.count = message;
    });
  }
}
