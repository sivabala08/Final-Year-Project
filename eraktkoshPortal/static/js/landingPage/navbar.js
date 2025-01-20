import React, {
    useState
} from "react";
import {
    Link
} from "react-router-dom/cjs/react-router-dom.min";
export default function Navbar() {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [activeZoomControl, setActiveZoomControl] = useState(null);

    const zoomIn = () => {
        setZoomLevel(zoomLevel + 0.05);
        setActiveZoomControl("zoomIn");
    };

    const zoomOut = () => {
        if (zoomLevel > 0.05) {
            setZoomLevel(zoomLevel - 0.05);
            setActiveZoomControl("zoomOut");
        }
    };

    const resetZoom = () => {
        setZoomLevel(1);
        setActiveZoomControl("resetZoom");
    };

    return ( <
        >
        <
        header className = "header"
        style = {
            {
                transform: `scale(${zoomLevel})`
            }
        } >
        <
        div className = "container" >
        <
        div className = "d-flex align-items-center justify-content-between" >
        <
        a href = "javascript:void(0)" >
        <
        img src = "assets/images/main-icon1.png"
        width = "60px"
        height = "60px"
        className = "img-fluid logo"
        alt = "" /
        >
        <
        /a>

        <
        input type = "checkbox"
        id = "menu-bar" / >
        <
        label htmlFor = "menu-bar" > Menu < /label>

        <
        nav className = "navbar py-0" >
        <
        ul className = "mb-0 ps-0" >
        <
        li className = "activ" >
        <
        a className = "dropMenu"
        href = "javascript:void(0)" >
        HOME <
        img className = "ms-2 dropdown-icon"
        src = "assets/images/drop-down.png"
        width = "12px"
        height = "7.4px"
        alt = "" /
        >
        <
        /a> <
        ul className = "ps-0" >
        <
        li >
        <
        a href = "..\..\eraktkoshPortal\index.html" >
        Home <
        /a> <
        /li> <
        li >
        <
        a href = "\BLDAHIMS\bloodbank\about.html" >
        About eRaktkosh <
        /a> <
        /li> <
        li >
        <
        a className = "links"
        href = "https://eraktkosh.mohfw.gov.in/eRaktkoshUtilities/#/" >
        Life Connect Dashboard <
        /a> <
        /li> <
        li >
        <
        a href = "/BLDAHIMS/bloodbank/notification.html" >
        Notifications <
        /a> <
        /li> <
        li >
        <
        a href = "/BLDAHIMS/bloodbank/eraktkoshfaq.html" >
        eRaktkosh FAQs <
        /a> <
        /li> <
        li >
        <
        a href = "/BLDAHIMS/bloodbank/transactions/bbpublicindexGallery.html" >
        Gallery <
        /a> <
        /li> <
        li >
        <
        a href = "/BLDAHIMS/bloodbank/transactions/video.html" >
        Video Gallery <
        /a> <
        /li> <
        li >
        <
        a href = "/BLDAHIMS/bloodbank/contact.html" >
        Contact Us <
        /a> <
        /li> <
        li >
        <
        a href = "/BLDAHIMS/bloodbank/downloadMobile.html" >
        Mobile Apps <
        /a> <
        /li> <
        /ul> <
        /li> <
        li >
        <
        a href = "javascript:void(0)" >
        LOOKING FOR BLOOD <
        img className = "ms-2 dropdown-icon"
        src = "assets/images/drop-down.png"
        width = "12px"
        height = "7.4px"
        alt = "" /
        >
        <
        /a>

        <
        ul className = "ps-0" >
        <
        li >
        <
        a href = "/BLDAHIMS/bloodbank/stockAvailability.html" >
        Blood Availability <
        /a> <
        /li> <
        li >
        <
        a href = "/BLDAHIMS/bloodbank/nearbyBBRed.html" >
        Blood Bank Directory <
        /a> <
        /li> <
        li >
        <
        a href = "/BLDAHIMS/bloodbank/portalThalassemiaLogin.html" >
        Thalassemia Request <
        /a> <
        /li> <
        /ul> <
        /li> <
        li >
        <
        a href = "javascript:void(0)" >
        WANT TO DONATE BLOOD <
        img className = "ms-2 dropdown-icon"
        src = "assets/images/drop-down.png"
        width = "12px"
        height = "7.4px"
        alt = "" /
        >
        <
        /a> <
        ul className = "ps-0" >
        <
        li >
        <
        a href = "/BLDAHIMS/bloodbank/campSchedule.html" >
        Blood Donation Camps <
        /a> <
        /li> <
        li > { /* <Link className="links" to="/donorLogin"> Donor Login</Link> */ } <
        a href = "/BLDAHIMS/bloodbank/portalDonorLogin.html" >
        Donor Login <
        /a> <
        /li> <
        li >
        <
        a href = "/BLDAHIMS/bloodbank/donateblood.html" >
        About Blood Donation <
        /a> <
        /li> <
        li >
        <
        a href = "/BLDAHIMS/bloodbank/onlineCampRequestNewBB.html" >
        Register VBD Camp <
        /a> <
        /li> <
        /ul> <
        /li> <
        li >
        <
        a href = "javascript:void(0)" >
        BLOOD BANK LOGIN <
        img className = "ms-2 dropdown-icon"
        src = "assets/images/drop-down.png"
        width = "12px"
        height = "7.4px"
        alt = "" /
        >
        <
        /a> <
        ul className = "ps-0" >
        <
        li > { /* <Link className="links" to="/login"> eRaktkosh Login</Link> */ } <
        a className = "links"
        href = "/eRaktKosh/hissso/loginLogin" >
        eRaktkosh Login <
        /a> <
        /li> <
        li >
        <
        a className = "links"
        href = "/BLDAHIMS/bloodbank/bbOnboard.html?hmode=GETONBOARDFORMESSENTIAL" >
        Add Your Blood Bank <
        /a> <
        /li> <
        /ul> <
        /li>

        <
        li className = "nav-item d-flex d-xl-none d-lg-none" >
        <
        a className = "nav-link"
        href = "https://eraktkosh.mohfw.gov.in/eRaktkoshUtilities/#/" >
        Life Connect Dashboard <
        /a> <
        /li> {
            /* <li className="nav-item d-flex d-xl-none d-lg-none">
                          <a href="javascript:void(0)">
                            <img
                              onClick={zoomOut}
                              src="assets/images/icon-a-.png"
                              className="zoom-out img-fluid img-responsive"
                              alt=""
                            />
                          </a>
                          <a href="javascript:void(0)">
                            <img
                              onClick={resetZoom}
                              src="assets/images/icon-a.png"
                              className="zoom-out img-fluid img-responsive"
                              alt=""
                            />
                          </a>
                          <a href="javascript:void(0)">
                            <img
                              onClick={zoomIn}
                              src="assets/images/icon-a+.png"
                              className="zoom-out img-fluid img-responsive"
                              alt=""
                            />
                          </a>
                        </li> */
        }

        <
        div className = "d-xl-flex d-lg-flex d-none" >
        <
        li className = "nav-item" >
        <
        a className = "nav-link"
        href = "https://eraktkosh.mohfw.gov.in/eRaktkoshUtilities/#/" >
        Life Connect Dashboard <
        /a> <
        /li>

        {
            /* <button
                            className={`btn link-btn ${
                              activeZoomControl === "zoomOut" ? "active" : ""
                            }`}
                            onClick={zoomOut}
                          >
                            <img
                              src="assets/images/icon-a-.png"
                              className="zoom-out img-fluid"
                              alt=""
                            />
                          </button>

                          <button
                            className={`btn link-btn ${
                              activeZoomControl === "resetZoom" ? "active" : ""
                            }`}
                            onClick={resetZoom}
                          >
                            <img
                              src="assets/images/icon-a.png"
                              className="img-fluid no-zoom"
                              alt=""
                            />
                          </button>

                          <button
                            className={`btn link-btn ${
                              activeZoomControl === "zoomIn" ? "active" : ""
                            }`}
                            onClick={zoomIn}
                          >
                            <img
                              src="assets/images/icon-a+.png"
                              className="img-fluid zoom-in"
                              alt=""
                            />
                          </button> */
        } <
        /div> <
        /ul> <
        /nav> <
        /div> <
        /div> <
        /header> <
        />
    );
}