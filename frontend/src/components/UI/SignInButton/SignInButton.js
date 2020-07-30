import React, { useEffect, useContext, useState } from 'react';

import classes from './SignInButton.module.css';
import { AuthContext } from '../../../context/auth-context';

const SignInButton = props => {
    const auth = useContext(AuthContext);

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
            const { token, ok, username, id } = event.data;
            if (ok) {
                localStorage.setItem('userData', JSON.stringify({
                    userId: id,
                    token: token,
                    username: username,
                }));
                auth.login(token, id);
            }
        });
    }, [auth]);

    return (
        <React.Fragment>
            <div
                className={classes.SignInButton}
                onClick={handleLogin}>
                <span>
                    Sign with Steam
                <i className="fa fa-steam" aria-hidden="true"></i>
                </span>
            </div>
        </React.Fragment>
    )
};

export default SignInButton;