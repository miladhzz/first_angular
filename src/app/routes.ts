import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Details } from './details/details';

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
];

export default routeConfig;
