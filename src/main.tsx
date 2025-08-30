import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './routes/App';
import Wizard from './routes/Wizard';
import Review from './routes/Review';
import Export from './routes/Export';
import './styles.css';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/wizard', element: <Wizard /> },
  { path: '/review', element: <Review /> },
  { path: '/export', element: <Export /> }
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
