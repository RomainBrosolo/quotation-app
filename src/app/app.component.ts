import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { doc, updateDoc } from 'firebase/firestore';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Quotation, Status } from './core/models/quotation.model';
import { CommonModule } from '@angular/common';
import { User } from './core/models/user.model';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from './core/services/firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'quotation-app';

  firestore: Firestore = inject(Firestore);

  public quotationsCollectiondata: any = [];
  public usersCollectiondata: any = [];
  public paramsID: string = '';
  private subQuotations: any;
  private subUsers: any;
  public carSelected: Quotation = {
    id: '',
    title: '',
    description: '',
    id_user: '',
    status: Status.progress,
  };

  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this._getData();
  }

  private async _getData() {
    const quotationCollection = collection(this.firestore, 'quotation');
    this.subQuotations = collectionData(quotationCollection).subscribe(
      (quotations: any) => {
        this.quotationsCollectiondata = quotations;
      }
    );

    const usersCollection = collection(this.firestore, 'Utilisateurs');
    this.subUsers = collectionData(usersCollection).subscribe((users: any) => {
      this.usersCollectiondata = users;
    });

    this.carSelected = this.quotationsCollectiondata.find(
      (data: Quotation) => data.id === this.paramsID
    );
  }

  public async updateQuotation() {
    const docRef = doc(this.firestore, 'quotation', this.carSelected.id);
    this.carSelected.status = Status.done;
    await updateDoc(docRef, { ...this.carSelected });

    let index = this.quotationsCollectiondata.findIndex(
      (x: Quotation) => x.id === this.carSelected.id
    );
    if (index >= this.quotationsCollectiondata.length - 1) {
      index = 0;
      this.selectCar(this.quotationsCollectiondata[index].id);
    } else {
      this.selectCar(this.quotationsCollectiondata[index + 1].id);
    }
    this._snackBar.open('Sucess', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1000,
    });
  }

  public getUser(id: string) {
    return this.usersCollectiondata.find((data: User) => data.id === id);
  }

  public selectCar(id: string) {
    this.router.navigate(['/quotation', id]);
    this.paramsID = id;
    this._getData();
  }

  ngOnDestroy(): void {
    this.subQuotations.unsubscribe();
    this.subUsers.unsubscribe();
  }
}
