import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import App from '../App.jsx';
import Home from '../pages/homePage/Home.jsx';
import SuperheroCreate from '../pages/superheroCreatePage/SuperheroCreate.jsx';
import SuperheroView from '../pages/superheroViewPage/SuperheroView.jsx';
import SuperheroEdit from '../pages/superheroEditPage/SuperheroEdit.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'superhero/:id', Component: SuperheroView },
      { path: 'create', Component: SuperheroCreate },
      { path: 'edit/:id', Component: SuperheroEdit },
      { path: '*', Component: Home },
    ],
  },
]);

export default router;