import React from 'react';
import PropTypes from 'prop-types';

export const ApplicationSummary = (props) => {
    let ratingYear = new Date().getFullYear() - 1;
    let taxYear = (new Date().getFullYear() - 2) + '/' + (new Date().getFullYear() - 1);

    let {
        full_name,
        occupation,
        address,
        ratesBill,
        noOfDependants,
        spouse_or_partner,
        total_income} = props.application;

    return (
        <>
            <div className="controlsBackground">
                <div className="controls">
                    <button className='next' onClick={props.onNext}>NEXT</button>
                </div>
            </div>
            <div className="text-content">
                <h1>Application summary</h1>
                <p className="summary">
                    Please check these details for your rebate claim.
                </p>

                <p>My name is <strong>{full_name}</strong> and my occupation is <strong>{occupation}</strong>.
                </p>

                <p>My address is <strong>{address}</strong> and I lived here on 1 July {ratingYear}.
                    I have not moved within this rating year.</p>

                <p>My {ratingYear} rates bill (including water) is <strong>${ratesBill}</strong>.</p>

                <p>I have <strong>{noOfDependants}</strong> dependants.</p>

                {spouse_or_partner ?
                <p>
                    Our combined income is <strong>${total_income}</strong>.
                </p>
                    :
                <p>My income is <strong>${total_income}</strong>.</p>
                }
            </div>
        </>
    )
};

ApplicationSummary.propTypes = {
    application: PropTypes.shape({
        full_name: PropTypes.string.isRequired,
        occupation: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        ratesBill: PropTypes.string.isRequired,
        noOfDependants: PropTypes.string.isRequired,
        spouse_or_partner: PropTypes.bool.isRequired,
        total_income: PropTypes.number.isRequired,
    })
};