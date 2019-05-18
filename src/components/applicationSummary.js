import React from 'react';

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