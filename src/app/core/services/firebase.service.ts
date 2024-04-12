import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc } from 'firebase/firestore';
import { Quotation, Status } from '../models/quotation.model';
import { collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  async updateQuotation(quotation: Quotation) {
    const docRef = doc(this.firestore, 'quotation', quotation.id);
    quotation.status = Status.done;
    await updateDoc(docRef, { ...quotation });
  }

  getQuotations() {
    return collection(this.firestore, 'quotation');
  }

  getUsers() {
    return collection(this.firestore, 'Utilisateurs');
  }
}
