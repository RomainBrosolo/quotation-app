import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'argus-c8ee0',
          appId: '1:639499138761:web:4f68bf7a7bf3014f92ff18',
          databaseURL:
            'https://argus-c8ee0-default-rtdb.europe-west1.firebasedatabase.app',
          storageBucket: 'argus-c8ee0.appspot.com',
          apiKey: 'AIzaSyA8yw6yLszvvq358-L-oTBzHVoyvulQfPc',
          authDomain: 'argus-c8ee0.firebaseapp.com',
          messagingSenderId: '639499138761',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideStorage(() => getStorage())), provideAnimationsAsync(),
  ],
};
