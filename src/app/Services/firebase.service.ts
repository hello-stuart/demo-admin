import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor() { }
}
import { NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
// import { AngularFireAuth } from '@angular/fire/auth';
export function AngularFirestoreCricket(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseConfigCricket, 'firebaseProjectCricket', false, null, platformId, zone, null, null, null);
}
export function AngularFirestoreTennis(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseConfigTennis, 'firebaseProjectTennis', false, null, platformId, zone, null, null, null);
}
export function AngularFirestoreSoccer(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseConfigSoccer, 'firebaseProjectSoccer', false, null, platformId, zone, null, null, null);
}
export function AngularFirestoreBinary(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseConfigBinary, 'firebaseProjectBinary', false, null, platformId, zone, null, null, null);
}
export function AngularFirestoreOther(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseConfigOther, 'firebaseProjectOther', false, null, platformId, zone, null, null, null);
}
export function AngularFirestoreScore(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseConfigScore, 'firebaseProjectScore', false, null, platformId, zone, null, null, null);
}