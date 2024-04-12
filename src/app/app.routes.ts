import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [{ path: 'quotation/:id', component: AppComponent }],
  },
];
