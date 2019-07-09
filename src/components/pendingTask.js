import React from 'react';
import {Spinner} from "./spinner";
import PropTypes from "prop-types";

export const PendingTask = (props) => {

    const {task, title, errorTitle, extraClassNextButton} = props;

    const errorText = task.error && getErrorText(task.error, errorTitle)
    return (
        <>
            {task.pending &&
            <Spinner message={title} />}

            {task.error &&
            <div className="wrap-system-msg">
                <p className="system-msg system-msg--error">{errorText}</p>
                <button className={"next " + extraClassNextButton} onClick={() => task.start()}>Try Again</button>
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

function getErrorText (error, errorTitle) {
    return error.message === "Conflict"
        ? "This application has been updated and needs to be re-signed."
        : error.message === "Unprocessable Entity"
            ? "This application has already been signed."
            : errorTitle
}