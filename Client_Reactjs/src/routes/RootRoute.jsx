import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home/Home';
import SignIn from '../Pages/auth/SignIn';
import SignUp from '../Pages/auth/SignUp';

const RootRoute = () => {
    return (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          {/* <Route path='/orders' element={<Orders />} />
          <Route path='/products' element={<Products />} />
          <Route path='/customers' element={<Customers />} /> */}
        </Routes>
      )
};

export default RootRoute;