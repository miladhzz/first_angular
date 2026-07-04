import { Routes } from '@angular/router';

import { AboutPage } from '@features/about/about';
import { DetailsPage } from '@features/details/details';
import { HomePage } from '@features/home/home';
import { LocationCreatePage } from '@features/locations/pages/location-create/location-create';
import { UploadAsyncPage } from '@features/locations/pages/upload-async/upload-async';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'Home page',
  },
  {
    path: 'about',
    component: AboutPage,
    title: 'About page',
  },
  {
    path: 'details/:id',
    component: DetailsPage,
    title: 'Home details',
  },
  {
    path: 'locations/create',
    component: LocationCreatePage,
    title: 'Location Create',
  },
  {
    path: 'locations/upload-async',
    component: UploadAsyncPage,
    title: 'Async Upload',
  },
];
