import Home from './pages/Home';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import UserInputSalary from "./pages/UserInputSalary";
import TableCompanies from "./pages/TableCompanies";
import Company from './pages/Company';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: '/user-input-salary',
      element: <UserInputSalary/>
    },
    {
      path: '/table-companies',
      element: <TableCompanies/>
    },
    {
      path: '/company',
      element: <Company />
    }

  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
