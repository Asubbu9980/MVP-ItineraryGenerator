import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import Components
import Header from './header';
import Footer from './footer';



const UserLayout = (props) => {

    const [headerClass, setHeaderClass] = useState("");
    // class add remove in header
    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
    });
    function scrollNavigation() {
        var scrollup = document.documentElement.scrollTop;
        if (scrollup > 50) {
            setHeaderClass("topbar-shadow");
        } else {
            setHeaderClass("");
        }
    }

    return (
        <React.Fragment>
            <div id="layout-wrapper">
                <ToastContainer autoClose={2000} />
                <Header />
                <div className="main-content">{props.children}
                </div>
                <Footer />
            </div>
        </React.Fragment>

    );
};

UserLayout.propTypes = {
    children: PropTypes.object,
};

export default withRouter(UserLayout);