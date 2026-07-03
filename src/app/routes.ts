import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Details } from './details/details';
import { LocationCreate } from './location-create/location-create';

const routeConfig: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home page',
    },
    {
        path: 'about',
        component: About,
        title: 'About page',
    },
    {
        path: 'details/:id',
        component: Details,
        title: 'Home details',
    },
    {
        path: 'locations/create',
        component: LocationCreate,
        title: 'Location Create',
    },
];

export default routeConfig;
