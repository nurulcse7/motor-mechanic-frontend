import Main from '../../Layout/Main';
import Checkout from '../../Pages/Checkout/Checkout';
import PaymentFail from '../../Pages/Checkout/PaymentFail';
import PaymentSuccess from '../../Pages/Checkout/PaymentSuccess';
import About from '../../Pages/Home/About/About';
import Contact from '../../Pages/Home/Contact/Contact';
import Home from '../../Pages/Home/Home/Home';
import Services from '../../Pages/Home/Services/Services';
import Login from '../../Pages/Login/Login';
import Orders from '../../Pages/Orders/Orders';
import ErrorPage from '../../Pages/Shared/ErrorPage';
import SignUp from '../../Pages/SignUp/SignUp';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const { createBrowserRouter } = require('react-router-dom');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/services',
        element: <Services></Services>,
      },
      {
        path: '/contact',
        element: <Contact></Contact>,
      },
      {
        path: '/about',
        element: <About></About>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>,
      },
      {
        path: '/checkout/:id',
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
        loader: ({ params })=> fetch(`${process.env.REACT_APP_ApiUrl}/services/${params.id}`),
      },
      {
        path: '/orders',
        element: <PrivateRoute> <Orders/></PrivateRoute>,
      },
      {
        path: '/payment/success',
        element: <PaymentSuccess />,
      },
    ],
  },
  {
    path: '/payment/fail',
    element: <PaymentFail />,
  },
]);

export default router;
