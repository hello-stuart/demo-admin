import { Injectable } from '@angular/core';


import * as forge from 'node-forge';
import { Observable, Subject } from 'rxjs';
import { CONFIG } from '../../../config';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {


  private marketData = new Subject<string>();
  // ws://192.168.0.151:7777
  // wss://firefetch.comhttp://casino.t90exchange.com/
  // private SocketBaseUrl = 'wss://casino.unityexch.com/universecasino';

  isUnsubscribed: boolean = false;
  previousMsg: any;
  serverPublicKey: any;
  keyPair: any;
  previousGameName: any;
  messageToSocket: any;
  constructor(private socket: WebsocketService) {
    this.getMessageFromSocket();
  }
  public getMarketData(): Observable<any> {
    return this.marketData.asObservable();
  }

  public updateMarketData(message: any): void {
    // console.log(message);
    this.marketData.next(message);
  }
  async generateEncryptionKey(gameName: any, messageToSocket?: any) {
    //

    let SocketBaseUrl = this.getBaseUrlofEvent(messageToSocket);

    var url: any;
    this.messageToSocket = messageToSocket;
    if (!this.previousGameName) {
      this.previousGameName = gameName;
    }
    // if(gameName!=this.previousGameName){
    //   this.socket.closeSocket();
    //   this.keyPair=null;
    // }
    // if (!this.keyPair) {
    // this.sendMessageToSocket(messageToSocket);
    // return
    this.keyPair = forge.pki.rsa.generateKeyPair({ bits: 1024 });

    // Encrypt data
    const publicKey = forge.pki.publicKeyToPem(this.keyPair.publicKey);
    const privateKey = forge.pki.privateKeyToPem(this.keyPair.privateKey);
    const publicKeyBase64 = btoa(publicKey);

    // var url = this.SocketBaseUrl +'/'+gameName.toLowerCase() + '?token=' + publicKeyBase64;
    url = SocketBaseUrl + '?token=' + publicKeyBase64;
    // }




    this.socket.connect(url).subscribe(
      async (message: any) => {
        // this.MessageReader(message);

        // this.checkMsg();
      },
      (error: any) => {
        console.error('WebSocket error:', error);
      },
      () => {
        console.log('WebSocket connection closed');
        //
        // console.log('reconnecting socket')
        // this.socket.reconnect();
      }

    );



  }
  // getBaseUrlofEvent(msg: any) {
  //   let obj = msg
  //   let url = '';
  //   switch (obj.id) {


  //     //
  //     case "99.0010": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.casninoTeenPatti : CONFIG.CasinoSocketUrl + CONFIG.casninoTeenPatti;
  //       return url;
  //       break;
  //     }
  //     case "99.0015": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.casninoTeenPatti : CONFIG.CasinoSocketUrl + CONFIG.casninoTeenPatti;
  //       return url;
  //       break;
  //     }
  //     case "99.0016": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.jokerTeenpatti : CONFIG.CasinoSocketUrl + CONFIG.jokerTeenpatti;
  //       return url;
  //       break;
  //     }
  //     case "99.0019": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.dragontiger2020 : CONFIG.CasinoSocketUrl + CONFIG.dragontiger2020;
  //       return url;
  //       break;
  //     }
  //     case "99.0030": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.lucky7A : CONFIG.CasinoSocketUrl + CONFIG.lucky7A;
  //       return url;
  //       break;
  //     }
  //     case "99.0001": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.bacarat : CONFIG.CasinoSocketUrl + CONFIG.bacarat;
  //       return url;
  //       break;
  //     }
  //     case "99.0007": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.pocker2020 : CONFIG.CasinoSocketUrl + CONFIG.pocker2020;
  //       return url;
  //       break;
  //     }
  //     case "99.0002": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.bacaratA : CONFIG.CasinoSocketUrl + CONFIG.bacaratA;
  //       return url;
  //       break;
  //     }
  //     //
  //     case "99.0025": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.andarBahirA : CONFIG.CasinoSocketUrl + CONFIG.andarBahirA;
  //       return url;
  //       break;
  //     }
  //     case "99.0022": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.thirty2cardsA : CONFIG.CasinoSocketUrl + CONFIG.thirty2cardsA;
  //       return url;
  //       break;
  //     }
  //     case "99.0013": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.oneDayTeenPatti : CONFIG.CasinoSocketUrl + CONFIG.oneDayTeenPatti;
  //       return url;
  //       break;
  //     }
  //     case "99.0018": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.dragonTiger : CONFIG.CasinoSocketUrl + CONFIG.dragonTiger;
  //       return url;
  //       break;
  //     }
  //     //
  //     case "99.0032": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.fastLucky7 : CONFIG.CasinoSocketUrl + CONFIG.fastLucky7;
  //       return url;
  //       break;
  //     }
  //     case "99.0014": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.muflisTeenPatti : CONFIG.CasinoSocketUrl + CONFIG.muflisTeenPatti;
  //       return url;
  //       break;
  //     }
  //     case "99.0042": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.dtl : CONFIG.CasinoSocketUrl + CONFIG.dtl;
  //       return url;
  //       break;
  //     }
  //     case "99.0020": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.fastDragonTiger : CONFIG.CasinoSocketUrl + CONFIG.fastDragonTiger;
  //       return url;
  //       break;
  //     }
  //     //
  //     case "99.0040": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.threeCardJudA : CONFIG.CasinoSocketUrl + CONFIG.threeCardJudA;
  //       return url;
  //       break;
  //     }
  //     case "99.0005": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.ammarAkbarAnthony : CONFIG.CasinoSocketUrl + CONFIG.ammarAkbarAnthony;
  //       return url;
  //       break;
  //     }
  //     case "99.0004": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.dltTeenPatti : CONFIG.CasinoSocketUrl + CONFIG.dltTeenPatti;
  //       return url;
  //       break;
  //     }
  //     case "99.0006": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.inaMinaDika : CONFIG.CasinoSocketUrl + CONFIG.inaMinaDika;
  //       return url;
  //       break;
  //     }
  //     //
  //     case "99.0009": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.instantWorli : CONFIG.CasinoSocketUrl + CONFIG.instantWorli;
  //       return url;
  //       break;
  //     }
  //     case "99.0034": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.andarBahirC : CONFIG.CasinoSocketUrl + CONFIG.andarBahirC;
  //       return url;
  //       break;
  //     }
  //     case "99.0031": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.luck7B : CONFIG.CasinoSocketUrl + CONFIG.luck7B;
  //       return url;
  //       break;
  //     }
  //     case "99.0046": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.tewentyTewentyCardRace : CONFIG.CasinoSocketUrl + CONFIG.tewentyTewentyCardRace;
  //       return url;
  //       break;
  //     }
  //     //
  //     case "99.0036": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.baccaratC : CONFIG.CasinoSocketUrl + CONFIG.baccaratC;
  //       return url;
  //       break;
  //     }
  //     case "99.0023": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.thirty2cardB : CONFIG.CasinoSocketUrl + CONFIG.thirty2cardB;
  //       return url;
  //       break;
  //     }
  //     case "99.0041": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.dtlA : CONFIG.CasinoSocketUrl + CONFIG.dtlA;
  //       return url;
  //       break;
  //     }
  //     case "99.0059": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.kbc : CONFIG.CasinoSocketUrl + CONFIG.kbc;
  //       return url;
  //       break;
  //     }
  //     case "99.0060": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.trio : CONFIG.CasinoSocketUrl + CONFIG.trio;
  //       return url;
  //       break;
  //     }
  //     case "99.0056": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.baccarat29cards : CONFIG.CasinoSocketUrl + CONFIG.baccarat29cards;
  //       return url;
  //       break;
  //     }
  //     case "99.0050": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.bollywood : CONFIG.CasinoSocketUrl + CONFIG.bollywood;
  //       return url;
  //       break;
  //     }
  //     case "99.0058": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.lottry : CONFIG.CasinoSocketUrl + CONFIG.lottry;
  //       return url;
  //       break;
  //     }
  //     case "99.0051": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.oneCardMeter : CONFIG.CasinoSocketUrl + CONFIG.oneCardMeter;
  //       return url;
  //       break;
  //     }
  //     case "99.0057": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.oneCard2020 : CONFIG.CasinoSocketUrl + CONFIG.oneCard2020;
  //       return url;
  //       break;
  //     }
  //     case "99.0021": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.oneDayDragonTiger : CONFIG.CasinoSocketUrl + CONFIG.oneDayDragonTiger;
  //       return url;
  //       break;
  //     }
  //     case "99.0052": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.jhandiMunda : CONFIG.CasinoSocketUrl + CONFIG.jhandiMunda;
  //       return url;
  //       break;
  //     }
  //     case "99.0055": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.casinoMeter : CONFIG.CasinoSocketUrl + CONFIG.casinoMeter;
  //       return url;
  //       break;
  //     }
  //     case "99.0027": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.casinoWar : CONFIG.CasinoSocketUrl + CONFIG.casinoWar;
  //       return url;
  //       break;
  //     }
  //     case "99.0061": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.sicbo : CONFIG.CasinoSocketUrl + CONFIG.sicbo;
  //       return url;
  //       break;
  //     }
  //     case "99.0008": {
  //       url = CONFIG.socketurl == '' ? 'wss://' + window.location.host + '/' + CONFIG.pocker2020B : CONFIG.CasinoSocketUrl + CONFIG.pocker2020B;
  //       return url;
  //       break;
  //     }
  //     default: {
  //       //statements;
  //       return '';
  //       break;
  //     }

  //       console.log('url', url);
  //       return url;
  //   }
  // }

  getBaseUrlofEvent(msg: any) {
    let obj = msg;
    let url = '';

    if (obj.id.startsWith("99.")) {
      const tableId = obj.id.slice(-2); // Extract last 2 digits of obj.id
      url = CONFIG.socketurl == '' ? `wss://${window.location.host}/${CONFIG.casninoTableURL}${tableId}` : `${CONFIG.CasinoSocketUrl}${CONFIG.casninoTableURL}${tableId}`;
    }
    if (obj.id.startsWith("88.")) {
      const tableId = obj.id.slice(-2); // Extract last 2 digits of obj.id
      url = CONFIG.socketurl == '' ? `wss://${window.location.host}/${CONFIG.virtualTableURL}${tableId}` : `${CONFIG.CasinoSocketUrl}${CONFIG.virtualTableURL}${tableId}`;
    }

    return url;
  }
  
  sendMessageToSocket(message: any) {
    // if(message.type=='2'){
    //   console.log('removing')
    //   this.socket.closeSocket();
    // }
    let msg = JSON.stringify(message)
    let encryptedtext = this.encryptUsingNodeForge(msg, this.encryptionKey, this.ivhex);
    this.socket.send(forge.util.encode64(encryptedtext));

  }
  async encryptData(data: any, keyPair: any): Promise<string> {
    try {
      // const jsonData = JSON.stringify(data);
      const encryptedBytes = keyPair.publicKey.encrypt(data);
      const encryptedData = forge.util.encode64(encryptedBytes);
      return encryptedData;
    } catch (error) {
      // console.error('Encryption error:', error);
      throw error;
    }
  }

  // checkMsg() {
  //   try {

  //     setTimeout(() => {
  //       if (this.socket.NeedToSendPrevious()) {

  //         if (this.previousMsg == null || this.previousMsg == undefined) {

  //           this.previousMsg = { type: "2", id: "" };
  //           this.socket.send(this.previousMsg);

  //         } else {
  //           this.socket.send(this.previousMsg);
  //         }

  //       }
  //     }, 1000)
  //   }
  //   catch (error) {

  //     setTimeout(() => {
  //       if (this.socket.NeedToSendPrevious()) {

  //         if (this.previousMsg == null || this.previousMsg == undefined) {

  //           this.previousMsg = { type: "2", id: "" };
  //           this.socket.send(this.previousMsg);

  //         } else {
  //           this.socket.send(this.previousMsg);
  //         }

  //       }
  //     }, 1500)
  //   }
  // }

  decryptData(item: any): string {
    try {
      var concatenatedString: any = ''
      item.forEach((data: any, index: any) => {
        var decryptedString = this.decryptString(data);
        concatenatedString = concatenatedString + decryptedString
      });
      return concatenatedString;
    } catch (error) {
      // console.error('Decryption error:', error);
      throw error;
    }
  }
  getMessageFromSocket() {
    this.counter = 0;
    this.socket.getMarketData().subscribe((data: any) => {
      // console.log('data',data)
      if (data == "WebSocket connection closed" || data == "unsubscribed successfully" || data == null) {
        // this.SocketBaseUrl=''
        this.socket.closeSocket();
        return
      }
      else {
        try {
          let plaindata = JSON.parse(data);
          this.updateMarketData(data)
        } catch (error) {
          // console.log(typeof(data))
          this.MessageReader(data);
        }
      }

    })
  }
  ivhex: any;
  encryptionKey: any;
  counter: any;
  async MessageReader(message: any) {
    // console.log('Received message:', message);
    // Decrypt the data using the private key
    if (message == "WebSocket connection closed" || message == "unsubscribed successfully" || message == null) {
      this.socket.closeSocket();
      return
    }

    const decrptedBuffer = forge.util.decode64(message);

    // console.log('decrypted buffer', message)
    // console.log(decrptedBuffer);
    try {
      var dataParse = JSON.parse(decrptedBuffer);
      if (dataParse?.type == 1) {
        // this.updateMarketData(dataParse)
        return
      }
    } catch (error) {
      // console.log( 'plain text ',decrptedBuffer);
      // this.updateMarketData(decrptedBuffer)
      this.decryptusingNodeforge(decrptedBuffer, this.encryptionKey, this.ivhex);

    }

    if (dataParse) {

      dataParse = JSON.parse(decrptedBuffer);
      // console.log("server data here in objects =====> ", dataParse);
      if (dataParse?.type == 0) {

        this.serverPublicKey = forge.pki.publicKeyFromPem(dataParse.data);
        // console.log(dataParse)
        this.ivhex = this.decryptString(dataParse.iv);
        this.encryptionKey = this.decryptString(dataParse.encryptionKey);
        // const sampleEncrypTedData = forge.util.decode64(dataParse.sampleEncrypTedData);
        // console.log(this.serverPublicKey);

        // console.log('sample encrypted data', dataParse.sampleEncrypTedData);
        // console.log("key  ", this.encryptionKey,)
        // console.log("iv  ", this.ivhex,)

        // this.decryptusingNodeforge(dataParse.sampleEncrypTedData,this.encryptionKey,this.ivhex);

        // this.sendMessageToSocket({ type: "1", id: "99.0001" });
        // this.socket.send({ type: "1", id: "99.0001" })\

        // this.encryptionKey = '';
        // this.ivhex = '9000a097c97d5f67ba4d691fc8d97fed';
        this.sendMessageToSocket(this.messageToSocket);
        // this.decryptusingNodeforge(encryptedtext,this.encryptionKey,this.ivhex);

      }
      else {

        // console.log(dataParse.data, 'data from socket');

        // var finalData = this.decryptData(dataParse.data);
        // console.log('Data After Decrypting before sending : ',);
        // this.marketData.next(JSON.parse(finalData));

      }

    }
    else {
      // console.log('oye hoye 1234', decrptedBuffer);
      // this.decryptusingNodeforge(decrptedBuffer, this.encryptionKey, this.ivhex);
    }

  }

  decryptusingNodeforge(encryptedHex: any, keyBase64: any, ivHex: any) {
    // const encryptedHex = 'e30fed0d3ec77d7c4e323051e144fea60b3838f644e6acbc4d7d09772434f62e112096e96216f9a48f49f1565116aa54';
    // const keyBase64 = 'YidrPVqPJRA0S1z5eXH3Zw==';
    // const ivHex = '9000a097c97d5f67ba4d691fc8d97fed';
    const keyBytes = forge.util.decode64(keyBase64); // Decode base64-encoded key
    const ivBytes = forge.util.hexToBytes(ivHex); // Convert hex IV to bytes

    const decipher = forge.cipher.createDecipher('AES-CBC', keyBase64);
    decipher.start({ iv: ivBytes });
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(encryptedHex)));
    decipher.finish();
    const decryptedString = decipher.output.data; // Use without arguments
    this.updateMarketData(decryptedString)
    // console.log('Decrypted Data:', JSON.parse(decryptedString));
    // console.log('Decrypted Data:', JSON.parse(decryptedString));
  }
  encryptUsingNodeForge(data: string, keyBase64: string, ivHex: string): string {
    const keyBytes = forge.util.decode64(keyBase64); // Decode base64-encoded key
    const ivBytes = forge.util.hexToBytes(ivHex); // Convert hex IV to bytes

    const cipher = forge.cipher.createCipher('AES-CBC', keyBase64);
    cipher.start({ iv: ivBytes });
    cipher.update(forge.util.createBuffer(data, 'utf8'));
    cipher.finish();

    const encryptedBuffer = cipher.output;

    // Convert the encrypted buffer to a hexadecimal string
    const encryptedHex = forge.util.bytesToHex(encryptedBuffer.data);

    return encryptedHex;
  }
  closeExistingSocket() {
    this.keyPair = null;
    this.counter = 0;
    this.socket.closeSocket();
  }


  decryptString(data: any): any {

    try {
      const decryptedBuffer = forge.util.decode64(data);
      const decrypted = this.keyPair.privateKey.decrypt(decryptedBuffer);
      // console.log('decrypted buffer:', decrypted)
      return decrypted;
    } catch (error) {
      // console.error('Decryption error:', error);
      throw error;
    }
  }
}
