import React from 'react';

export const ConfirmCorrectApplication = (props) => {
    return (
        <>
            <div className="text-content">
                <h1>{props.title}</h1>
                <h2></h2>

                <div>
                    <p>
                        {props.applicationId} - {props.name}
                    </p>
                </div>
            </div>
            <div className="controlsBackground">
                <div className="controls">
                    <button className='back' name="cancel" onClick={props.onCancel}>BACK</button>
                    <button className='next' name="submit" onClick={props.onConfirm}>NEXT</button>
                </div>
            </div>
        </>
    )
};