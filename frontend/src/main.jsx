import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import { AuthProvider } from './AuthContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import ErrorPage from './components/404error.jsx';
import Home from './views/Home/Index.jsx';
import About from './views/Home/About.jsx';
import Features from './views/Home/Features.jsx';
import TradingProcess from './views/Home/Trading.jsx';
import Education from './views/Home/Education.jsx';
import Regulations from './views/Home/Regulations.jsx';
import Contact from './views/Home/Contact.jsx';

import Login from './views/AuthViews/Login.jsx';
import Signup from './views/AuthViews/Signup.jsx';
import Inactive from './views/AuthViews/Inactive.jsx';

import Dashboard from './views/Account/Dashboard.jsx'
import Deposit from './views/Account/Deposit.jsx'
import Plans from './views/Account/Plans.jsx'
import TradeRoom from './views/Account/TradeRoom.jsx'
import Mining from './views/Account/Mining.jsx'
import Referrals from './views/Account/Referrals.jsx'
import Withdrawal from './views/Account/Withdrawal.jsx'
import History from './views/Account/History.jsx'
import Settings from './views/Account/Settings.jsx'



const router = createBrowserRouter([
  {
    path: "*",  
    element: <ErrorPage/>
  },
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/about",
    element: <About/>
  },
  {
    path: "/services",
    element: <Features/>
  },
  {
    path: "/trading",
    element: <TradingProcess/>
  },
  {
    path: "/education",
    element: <Education/>
  },
  {
    path: "/regulations",
    element: <Regulations/>
  },
  {
    path: "/contact",
    element: <Contact/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/verification",
    element: <Inactive/>
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />
  },
  {
    path: "/deposit",
    element: <ProtectedRoute element={<Deposit />} />
  },
  {
    path: "/plans",
    element: <ProtectedRoute element={<Plans />} />
  },
  {
    path: "/traderoom",
    element: <ProtectedRoute element={<TradeRoom />} />
  },
  {
    path: "/mining",
    element: <ProtectedRoute element={<Mining />} />
  },
  {
    path: "/referrals",
    element: <ProtectedRoute element={<Referrals />} />
  },
  {
    path: "/withdrawal",
    element: <ProtectedRoute element={<Withdrawal />} />
  },
  {
    path: "/transactions",
    element: <ProtectedRoute element={<History />} />
  },
  //{
  //  path: "/settings",
  //  element: <ProtectedRoute element={<Settings/>} />
  //},

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);