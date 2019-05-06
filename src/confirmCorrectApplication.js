import React from 'react';

export const ConfirmCorrectApplication = (props) => {
    return (
        <>
            <div className="test-content">
                <h1>Rates Rebate 2018/2019</h1>
                <h2>{props.title}</h2>

                <div>
                    <p>
                        {props.applicationId} - {props.name}
                    </p>
                </div>
            </div>

            <div className="controls">
                <button className='back' name="cancel" onClick={props.onCancel}>Back</button>
                <button className='next' name="submit" onClick={props.onConfirm}>Next</button>
            </div>
        </>
    )
};