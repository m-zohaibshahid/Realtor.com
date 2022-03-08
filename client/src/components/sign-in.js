import React from 'react';
import Navbar from './global-components/navbar-v2';
import PageHeader from './global-components/page-header';
import SignIn from '../Auth/pages/sign-in';
import Footer from './global-components/footer-v2';
const SignInPage = () => {


    return <div>
        <Navbar />
        <SignIn />
        <Footer />
    </div>
}

export default SignInPage

