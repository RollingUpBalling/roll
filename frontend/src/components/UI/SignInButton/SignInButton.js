import React, { useEffect } from 'react';

import classes from './SignInButton.module.css';

<<<<<<< HEAD
const signInButton = (props) => (
    <a href="/"> 
        <div className={classes.SignInButton}>
            <span> 
                Sign with Steam 
                <i className="fa fa-steam" aria-hidden="true"></i>
            </span>
        </div>
    </a>
);
=======
const SignInButton = props => {
>>>>>>> 380cd9c337cb66d3fbe87966757068f6ae5c2988

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
        <div className={classes.SignInButton}>
            <button onClick={handleLogin}>
                Sign with Steam
                <i className="fa fa-steam" aria-hidden="true"></i>
            </button>
        </div>
    )
};

export default SignInButton;