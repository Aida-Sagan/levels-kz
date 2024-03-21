import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import UserInputSalary from "./pages/UserInputSalary";
import TablePopularCompanies from "./components/TablePopularCompanies";
import Company from './pages/Company';
import CompareCompanies from './pages/CompareCompanies';
import Auth from './pages/Auth';
import SignUp from './pages/SignUp';


function App() {

  const API_TOKEN = process.env.API_TOKEN;


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: '/signin',
      element: <Auth/>
    },
    {
      path: '/signup',
      element: <SignUp/>
    },
    {
      path: '/user-input-salary',
      element: <UserInputSalary/>
    },
    {
      path: '/table-companies',
      element: <TablePopularCompanies/>
    },
    {
      path: '/company/:id',
      element: <Company/>
    },
    {
      path: '/comparing-companies',
      element: <CompareCompanies />
    }

  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
