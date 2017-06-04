import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatService } from '../../providers/chat-service';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  userMsg: any
  messages: any[]
  context: any
  sessionId: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatService: ChatService, ) {
    this.messages = [{ text: "Hello, I am Mathsbot do you want to add, subtract, divide or multiply?", type: "received" }];
    this.context = {};
    this.sessionId = (function () {
      var now = new Date();
      var enterDT = now.getFullYear() + now.getMonth() + now.getDate() + now.getTime()
      return enterDT;
    }())
  }

  addMessage(text, type) {
    this.messages.push({
      text: text,
      type: type
    });
  }

  sendMessage() {
    let self = this;
    console.log(this.sessionId);

    self.addMessage(this.userMsg, "sent");

    var request = {
      "userMsg": this.userMsg,
      "id": this.sessionId,
      "context": this.context
    }

    this.chatService.processUserRequest(request)
      .then(function (result) {
        console.log(result.json());
        self.addMessage(result.json().botMessage, "received");
        self.context = result.json().context;
      })

      this.userMsg = null; //clear input
  }
}
