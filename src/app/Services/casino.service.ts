import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty, map, Observable, Observer, Subject } from "rxjs";
// import * as crypto from "crypto";
// import * as CryptoJS from 'crypto-js';
import { WebsocketService } from "./websocket.service";

// const CHAT_URL = "ws://130.172.1.26:40510/universecasino";
// const CHAT_URL = "wss://casino.unityexch.com/universecasino";

// const CHAT_URL = 'wss://'+window.location.host+'/universecasino';
const CHAT_URL = 'wss://casino.unityexch.com/universecasino?token=LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1JR2ZNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R05BRENCaVFLQmdRQ0lTVUpsYUxTUVl4TXBrUUkwY1RrVXY5a0oNCklibUk3MU9zaEVLQXJudXNHMGt4SWJFZUFXMVNaak1JM3FpMGN3ME1ZWlJxSFpnSmkxOG5Lc0tOWmdNWlF3YTMNCitlRVBRc1p6QTZVMlk4bFp5R2dtdjIvTmRxQVlMNDJ5SXQraVMrYWxhQ0RGbzdzTGFUSzhhbkQyR2VYNnZFM2MNClVJT21BVEh0OXFIeHNEazlyd0lEQVFBQg0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tDQo=';


export interface ProfileData {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CasinoService {

  public messages: any;

  public resultMsg: any;
  private socket: any;
//   private url = 'wss://'+window.location.host+'/universecasino'; // Replace with your WebSocket URL
  private url = CHAT_URL // Replace with your WebSocket URL
  private reconnectInterval = 5000; // Reconnect every 5 seconds
  private reconnectAttempts = 1000; // Maximum number of reconnect attempts
  private currentReconnectAttempts = 0; // Current number of reconnect attempts
  previousMsg: any;
  isAttempt: boolean = false;
  reattempting: boolean = false;
  private marketData = new Subject<string>();

  ngOnInit() {
  
  }

  constructor(private route:Router) {
    this.connect();

  }
  public getMarketData(): Observable<any> {
    return this.marketData.asObservable();
  }

  public updateMarketData(message: any): void {
    this.marketData.next(message);
  }

  public connect(): Observable<any> {
    
    return new Observable((observer: Observer<any>) => {
      this.socket = new WebSocket(this.url);

      this.socket.onmessage = (event: MessageEvent) => {
        observer.next(event.data);
        this.marketData.next(event?.data=='unsubscribed successfully'?null:event.data);
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
       

      try{

        setTimeout(() => {
          if (this.socket && this.isAttempt) {
  
            if (this.previousMsg == null || this.previousMsg == undefined) {
  
              this.previousMsg = { type: "2", id: "" }
              this.send(this.previousMsg);
  
            } else {
              this.send(this.previousMsg);
            }
  
          }
        }, 1000)
      }
      catch(error){

        setTimeout(() => {
          if (this.socket && this.isAttempt) {
  
            if (this.previousMsg == null || this.previousMsg == undefined) {
  
              this.previousMsg = { type: "2", id: "" }
              this.send(this.previousMsg);
  
            } else {
              this.send(this.previousMsg);
            }
  
          }
        }, 1500)
      }

      return () => {
        this.socket.close();
      };
    });
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
  
        try{
          this.socket.send(JSON.stringify(message));
        }
        catch(error)
        {
          setTimeout(() => {
  
            this.socket.send(JSON.stringify(message));
    
            // this.socket.send(JSON.stringify(message));
          }, 1000);
        }
      
      }
    
    };
  
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
