import React from 'react';
import PropTypes from 'prop-types';

export const ApplicationSummary = (props) => {
    let {
        full_name,
        occupationStatus,
        address,
        ratingYear,
        taxYear,
        ratesBill,
        noOfDependants,
        partner,
        combinedIncome,
        singleIncome,
        rebateClaim} = props.application;

    return (
        <>
            <div className="controlsBackground">
                <div className="controls">
                    <button className='next' onClick={props.onNext}>NEXT</button>
                </div>
            </div>
            <div className="text-content">
                <h1>Application Summary</h1>
                <p className="summary">
                    Please check these details for your rebate claim of ${rebateClaim}
                </p>

                <p>My name is <strong>{full_name}</strong> and my occupation is <strong>{occupationStatus}</strong>.
                </p>

                <p>My address is <strong>{address}</strong> and I lived here on 1 July {ratingYear}.
                    I have not moved within this rating year.</p>

                <p>My {ratingYear} rates bill (including water) is <strong>${ratesBill}</strong>.</p>

                <p>I have <strong>{noOfDependants}</strong> dependant(s).</p>

                {partner ?
                <p>
                    The combined income of myself and my [partner or joint home owner] living with me
                    on 1 July {taxYear} for the {taxYear} tax year was <strong>${combinedIncome}</strong>.
                </p>
                    :
                <p>My income for the {taxYear} tax year was <strong>${singleIncome}</strong>.</p>
                }
            </div>
        </>
    )
};

ApplicationSummary.propTypes = {
    application: PropTypes.shape({
        full_name: PropTypes.string.isRequired,
        occupationStatus: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        ratingYear: PropTypes.string.isRequired,
        taxYear: PropTypes.string.isRequired,
        ratesBill: PropTypes.string.isRequired,
        noOfDependants: PropTypes.string.isRequired,
        partner: PropTypes.bool.isRequired,
        combinedIncome: PropTypes.number.isRequired,
        singleIncome: PropTypes.number.isRequired,
        rebateClaim: PropTypes.string.isRequired,
    })
};