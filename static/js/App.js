import "./App.css";
import React from "react";
import {
    HashRouter,
    Switch,
    Route
} from 'react-router-dom';
import Navbar from "../src/landingPage/navbar.js"
import Service from "../src/landingPage/service.js"
import Aboutpage from "../src/landingPage/aboutPage.js"
import Donationworking from "../src/landingPage/donationWorking.js"
import Footer from "../src/landingPage/footer.js"
import Benefits from "../src/landingPage/benefits.js"
import HeroComponent from "./landingPage/heroComponent.js";
import DonorCount from "./landingPage/donorCount";
import LearnDonation from "./landingPage/learnDonation";
import DonationType from "./landingPage/donationType";
import ERaktkosh_login from "./pages/eRaktkosh_login";
import DonorLogin from "./pages/donorLogin.js";

function App() {
    return ( <
        div className = "App" >
        <
        HashRouter basename = "/" >
        <
        Navbar / >

        <
        Switch > {
            /* <Route path="/login">
                        <ERaktkosh_login />
                      </Route> */
        }

        <
        Route path = "/donorLogin" >
        <
        DonorLogin / >
        <
        /Route>

        <
        Route path = "/" > { /* heroComponent */ } <
        HeroComponent / >

        { /* donorCount */ } <
        DonorCount / >

        { /* service section */ } <
        Service / >

        { /* about Life-Connect */ } <
        Aboutpage / >

        { /* learning donation */ } <
        LearnDonation / >

        { /* how donation works */ } <
        Donationworking / >

        { /* Types of Donation */ } <
        DonationType / >

        { /* Carousel section */ } <
        Benefits / >

        { /* <Footer /> */ } <
        /Route> <
        /Switch>

        <
        Footer / >
        <
        /HashRouter> <
        /div>
    );
}

export default App;