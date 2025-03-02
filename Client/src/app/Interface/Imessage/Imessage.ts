import { Data } from "@angular/router";

export interface Imessage {
  messageId: number,
  chatId: number,
  senderId: number,
  messageText: string,
  sendAt: Date
}
