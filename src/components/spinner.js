import React from 'react';
import '../App.css';
import PropTypes from "prop-types";

export const Spinner = (props) => {
    return (
        <div className="wrap-system-msg">
            <p className="system-msg system-msg--processing">{props.message}</p>
            <div className="sk-fading-circle">
                <div className="sk-circle1 sk-circle"></div>
                <div className="sk-circle2 sk-circle"></div>
                <div className="sk-circle3 sk-circle"></div>
                <div className="sk-circle4 sk-circle"></div>
                <div className="sk-circle5 sk-circle"></div>
                <div className="sk-circle6 sk-circle"></div>
                <div className="sk-circle7 sk-circle"></div>
                <div className="sk-circle8 sk-circle"></div>
                <div className="sk-circle9 sk-circle"></div>
                <div className="sk-circle10 sk-circle"></div>
                <div className="sk-circle11 sk-circle"></div>
                <div className="sk-circle12 sk-circle"></div>
            </div>
        </div>
    );
};

Spinner.propTypes = {
    message: PropTypes.string.isRequired,
};