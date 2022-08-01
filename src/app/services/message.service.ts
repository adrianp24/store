import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

/*
 * Send messages to subscribers
 * https://bit.ly/3p5U2iD
 */
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subjects: Map<string, Subject<any>>;

  constructor() {
    this.subjects = new Map<string, Subject<any>>();
  }

  private getSubject(key: string): Subject<any> | undefined {
    if (!this.subjects.has(key))
      this.subjects.set(key, new Subject<any>());
    return this.subjects.get(key);
  }

  /*
   * send message to subcribers and passes parameters if it needs to.
   */
  sendMessage(key: string, message: any) {
    this.getSubject(key)?.next(message);
  }

  /*
   * subscribes to message.  when message is sent, a procedure is run.
   */
  getMessage(key: string): Observable<any> | undefined {
    return this.getSubject(key)?.asObservable();
  }
}
