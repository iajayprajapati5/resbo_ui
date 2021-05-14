import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private _message: string = "";
  private _severity: string = "";
  private _internalMessage: string = "Unable to proccess this request.";

  get message(): string{
    return this._message;
  }

  get severity(): string{
    return this._severity;
  }

  closeNotification(){
    this._message = "";
    this._severity = "";
  }

  setNotification(message: string, severity: string){
    this._message = message;
    if (!this._message) this._message = this._internalMessage;
    this._severity = severity;
    setTimeout(() => {
      this._severity = this._message = "";
    }, 10000);
  }
}
