import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from "@microsoft/signalr";

export default class SignalRService {
  private connection: HubConnection;

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl('', { 
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: async () => { return "asdahskdahdkasd"}})
      .withAutomaticReconnect()
      .build();
  }

  public startConnection(): Promise<void> {
    console.log("Stopped")
    return this.connection.start();
  }

  public stopConnection(): Promise<void> {
    return this.connection.stop();
  }

  public onReceiveMessage(callback: (message: string) => void): void {
    console.log("received")
    this.connection.on('ReceiveMessage', callback);
  }

  public sendMessage(message: string): Promise<void> {
    return this.connection.invoke('SendMessage', message);
  }
}
