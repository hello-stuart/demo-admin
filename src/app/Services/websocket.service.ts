import { Injectable } from '@angular/core';

import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {


  public messages: any;

  public resultMsg: any;
  private socket: any;
  // wss://firefetch.com/cricket
  private url = ''; // Replace with your WebSocket URL
  private reconnectInterval = 5000; // Reconnect every 5 seconds
  private reconnectAttempts = 1000; // Maximum number of reconnect attempts
  private currentReconnectAttempts = 0; // Current number of reconnect attempts
  previousMsg: any;
  previousMessageEncrypted : any;
  isAttempt: boolean = false;
  reattempting: boolean = false;
  private marketData = new Subject<string>();

  ngOnInit() {
  }

  constructor() {
    this.connect();
  }
  public getMarketData(): Observable<any> {
    return this.marketData.asObservable();
  }

  public updateMarketData(message: any): void {
    this.marketData.next(message);
  }

  public connect(Url_Token?: any): Observable<any> {
    //     const CoustomProtocol = key


    return new Observable((observer: Observer<any>) => {

      if (Url_Token != null) {
        this.url =Url_Token;
      }
      // console.log(this.url);
      this.socket = new WebSocket(this.url);

      this.socket.onmessage = (event: MessageEvent) => {
        observer.next(event.data);
        this.marketData.next(event?.data == 'unsubscribed successfully' ? null : event.data);
      };

      this.socket.onerror = (event: Event) => {
        observer.error(event);
      };

      this.socket.onclose = (event: CloseEvent) => {
        // console.log("socket connection close")
        observer.complete();


        try {
          this.reconnect();
        }
        catch (error) {
          this.reconnect();
        }

      };


      try {

        setTimeout(() => {
          if (this.socket && this.isAttempt) {

            if (this.previousMsg == null || this.previousMsg == undefined) {

              this.previousMsg = { type: "2", id: "" };
              // this.send(this.previousMsg);

            } else {
              // this.send(this.previousMsg);
            }

          }
        }, 1000)
      }
      catch (error) {

        setTimeout(() => {
          if (this.socket && this.isAttempt) {

            if (this.previousMsg == null || this.previousMsg == undefined) {

              this.previousMsg = { type: "2", id: "" }
              // this.send(this.previousMsg);

            } else {
              // this.send(this.previousMsg);
            }

          }
        }, 1500)
      }

      return () => {
        this.socket.close();
      };
    });
  }
 closeSocket(): void {
  if (this.socket && this.socket.readyState === WebSocket.OPEN) {
    this.socket.onclose = () => {
      this.connect(); // Create a new WebSocket connection after the previous one is closed
    };
    this.socket.close();
  } else {
    this.connect(); // If the WebSocket connection is not open, create a new one directly
  }
  }
  public send(message: any): void {
    this.isAttempt = false
    this.previousMsg = message;
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }

    this.socket.onopen = () => {

      if (this.socket && this.socket.readyState === WebSocket.OPEN) {

        this.socket.send(JSON.stringify(message));
      }
      else {

        try {
          this.socket.send(JSON.stringify(message));
        }
        catch (error) {
          setTimeout(() => {

            this.socket.send(JSON.stringify(message));

            // this.socket.send(JSON.stringify(message));
          }, 1000);
        }

      }

    };

  }

  NeedToSendPrevious(){
    return this.socket && this.isAttempt;
  }
  public ping(): void {
    setInterval(() => {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.send('Ping');
      }
    }, 60000); // Send ping every 1 minute
  }

  public receive(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.socket.onmessage = (event: MessageEvent) => {
        observer.next(event.data);
        this.marketData.next(event?.data);
      };

      this.socket.onerror = (event: Event) => {
        observer.error(event);
      };

      this.socket.onclose = (event: CloseEvent) => {
        observer.complete();
        // this.reconnect()
      };

      return () => {
        this.socket.close();
      };
    });
  }

  public reconnect(): void {
    if (!this.reattempting) {
      this.reattempting = true;
      this.currentReconnectAttempts++;
      if (this.currentReconnectAttempts <= this.reconnectAttempts) {
        setTimeout(() => {
          // console.log(`WebSocket reconnecting... (attempt ${this.currentReconnectAttempts} of ${this.reconnectAttempts})`);
          this.isAttempt = true
          this.connect().subscribe(
            (message: any) => {
              this.reattempting = false;
              // console.log('Received message:', message);
              // Handle received message

            },
            (error: any) => {
              // console.error('WebSocket error:', error);
              // Handle WebSocket error
            },
            () => {
              // console.log('WebSocket connection closed');
              // Handle WebSocket connection closed
              // Attempt reconnect
              this.reattempting = false;
              this.reconnect();
            }
          );

        }, this.reconnectInterval);
      } else {
        console.error('WebSocket connection failed after maximum reconnect attempts');
        // Handle maximum reconnect attempts reached
      }
    }

  }
}



