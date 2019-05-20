import React from 'react';
import {useReducer, useEffect} from 'react';

import {ApplicationSummary} from "./components/applicationSummary";
import {Signature} from "./components/signature";
import {PendingTask} from "./components/pendingTask";

import {appReducer} from './appReducer';
import {useFetchApplication, useSubmitApplication} from './services';
import {parseJwt} from './lib';

import './App.css';
import tick from './images/tick.svg';


function App() {
    const [state, dispatch] = useReducer(appReducer, {});

    useEffect(() => {
        let urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get('t');

        try {
            let decodedToken = parseJwt(token);
            dispatch({type: 'RECEIVED_TOKEN', data: {token, witness: decodedToken.witness}});
        } catch (error) {
            console.log(error);
        }
    }, []);

    const fetchTask = useFetchApplication(state.token, (result) => {
        dispatch({type: 'FETCHED_APPLICATION', application: result})
    }, [state.token]);

    const submitTask = useSubmitApplication(state, () => {
        dispatch({type: 'APPLICATION_SUBMITTED'});
    }, [state.readyToSubmit]);

    return (
        <div className="App">
            <header>
                <h2>Rates Rebate 2018/2019</h2>
            </header>

            <div className="content">
                <PendingTask
                    task={fetchTask}
                    title="Retrieving application..."
                    errorTitle="Error while retrieving application"
                />

                <PendingTask
                    task={submitTask}
                    title="Submitting application..."
                    errorTitle="Error while submitting application"
                />

                {state.currentScreen === 'CONFIRM-APPLICATION' &&
                <ApplicationSummary
                    application={state.application}
                    onNext={() => dispatch({type: 'CONFIRMED_APPLICATION'})}
                />}

                {state.currentScreen === 'SIGN-APPLICANT' &&
                <Signature
                    declaration="applicant"
                    nextButtonLabel="NEXT"
                    application={state.application}
                    title="Applicant signature"
                    subheading="Please sign to complete your application"
                    next={(data) => dispatch({type: 'APPLICANT_SIGNED', signature: data.signature})}
                    back={() => dispatch({type: 'CANCEL_APPLICANT_SIGN'})}
                />}

                {state.currentScreen === 'SIGN-WITNESS' &&
                <Signature
                    declaration="witness"
                    nextButtonLabel="SUBMIT"
                    application={state.application}
                    witness={state.witness}
                    title="Witness signature"
                    subheading="Signature of person authorised to witness this declaration"
                    next={(data) => dispatch({type: 'WITNESS_SIGNED', signature: data.signature})}
                    back={() => dispatch({type: 'CANCEL_WITNESS_SIGN'})}
                />}

                {state.currentScreen === 'THANK-YOU' &&
                <div className="endScreen">
                    <h1>Thank you</h1>
                    <p className="summary">
                        This declaration is now complete and ready to be processed.
                    </p>
                    <img src={tick} alt="tick" className="img-tick"></img>
                </div>}
            </div>
        </div>
    );
}

export default App;
