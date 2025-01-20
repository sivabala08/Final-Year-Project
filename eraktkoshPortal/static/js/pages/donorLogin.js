import React from 'react'

export default function DonorLogin() {
    return ( <
        >
        <
        section className = "donorlogin" >
        <
        div className = "container-fluid" >
        <
        div className = "row" >
        <
        div className = "col-xl-7 d-none d-lg-block d-xl-block d-md-block col-lg-7 col-md-7" >
        <
        div className = "donorImg" >
        <
        img src = "assets/images/donorImg.png"
        alt = ""
        className = "img-fluid" / >
        <
        /div> <
        /div> <
        div className = "col-xl-5 col-lg-5 col-md-5 d-flex flex-column align-items-center" >
        <
        div className = "donorlogin-right mb-3 p-5" >
        <
        div className = 'loginBox' >
        <
        h2 className = "login-header text-center mb-5" >
        Donor Login <
        /h2> <
        div className = "mb-4" >
        <
        label htmlFor = "exampleInputEmail1"
        className = "form-label mb-1" >
        Mobile Number <
        /label> <
        div className = "input-group mb-1" >
        <
        input type = "number"
        className = "form-control p-0"
        placeholder = "Enter Your Mobile Number"
        id = "username"
        aria - label = "Username"
        aria - describedby = "basic-addon1" /
        >
        <
        /div> <
        /div>

        <
        button type = "button"
        className = "w-100 btn btn-primary-outline py-1" >
        Generate OTP <
        /button> <
        /div> <
        /div> <
        p className = "option text-center" > Or < /p>

        <
        button type = "submit"
        className = "w-100 btn btn-primary-signIn py-1" >
        Register Now <
        /button> <
        div className = 'mt-4' >
        <
        div className = 'd-flex align-items-center mb-3' >
        <
        img className = 'me-3'
        src = "assets/images/volunteer.png"
        alt = "" / >
        <
        p className = "mb-0 details" > View / Add your Donations < /p> <
        /div> <
        div className = 'd-flex align-items-center mb-3' >
        <
        img className = 'me-3'
        src = "assets/images/profile.png"
        alt = "" / >
        <
        p className = "mb-0 details" > Update your Profile < /p> <
        /div> <
        div className = 'd-flex align-items-center' >
        <
        img className = 'me-3'
        src = "assets/images/accounts.png"
        alt = "" / >
        <
        p className = "mb-0 details" > Manage your Account < /p> <
        /div> <
        /div> <
        /div> <
        /div> <
        /div> <
        /section> <
        />
    )
}