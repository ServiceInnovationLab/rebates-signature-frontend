import React from 'react';
import {Spinner} from "./spinner";
import PropTypes from "prop-types";
import {ApplicationSummary} from "./applicationSummary";

export const PendingTask = (props) => {

    const {task, title, errorTitle} = props;

    return (
        <>
            {task.pending &&
            <Spinner message={title} />}

            {task.error &&
            <div className="wrap-system-msg">
                <p className="system-msg system-msg--error">{errorTitle}</p>
                <button className='next' onClick={() => task.start()}>Try Again</button>
            </div>}
        </>
    );
};

PendingTask.propTypes = {
    application: PropTypes.shape({
        task: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        errorTitle: PropTypes.string.isRequired,
    })
};