import React, { useEffect } from 'react';

import classes from './SignInButton.module.css';


const SignInButton = props => {


    const handleLogin = () => {
        const popupWindow = window.open(
            "http://localhost:5000/auth/",
            "_blank",
            "width=800, height=600",
        );
        if (window.focus) popupWindow.focus();
    };

    useEffect(() => {
        window.addEventListener("message", event => {
          if (event.origin !== "http://localhost:5000") return;

          const { token, ok } = event.data;
          if (ok) {
            localStorage.setItem("jwtToken", token);
            console.log(token);
          }
        });
      }, []);

    return (
        <a href="/" >
        <div className={classes.SignInButton} onClick={handleLogin}>
            <span>
                Sign with Steam 
                <i className="fa fa-steam" aria-hidden="true"></i>
            </span>
        </div>
    </a>
    )
};

export default SignInButton;