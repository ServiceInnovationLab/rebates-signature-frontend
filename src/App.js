import React from 'react';
import {useReducer, useEffect} from 'react';

import './App.css';
import {appReducer} from './appReducer';
import {SignatureSubmitter} from "./signatureSubmitter";
import {ApplicationSummary} from "./applicationSummary";

import {Signature} from "./signature";
import tick from './images/tick.svg';

// http://localhost:3000/?t=eyJhbGciOiJIUzI1NiJ9.eyJhcHBsaWNhdGlvbklkIjoxOCwiZXhwIjoxNTU3ODgxODM0LCJwZXIiOiJmZXRjaF9hcHBsaWNhdGlvbl9hbmRfc3VibWl0X3NpZ25hdHVyZXMifQ.vJ7iOTmJ3oOZTKIDJfFiT0_biqmKMxmw-4brlvXco2s

function App() {
    const initialState = {
        currentScreen: 'FETCH-APPLICATION'
    };
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        var urlParams = new URLSearchParams(window.location.search);
        dispatch({type: 'RECEIVED_TOKEN', token: urlParams.get('t')})
    }, []);

    return (
        <div className="App">
            <header>
                <h2>Rates Rebate 2018/2019</h2>
            </header>

            <div className="content">
                {state.currentScreen === 'FETCH-APPLICATION' &&
                <ApplicationSummary
                    token={state.token}
                    title="Please check these details for your rebate claim of $"
                    onCancel={() => dispatch({type: 'RESET'})}
                    onFetchedApplication={(applicationData) => dispatch({
                        type: 'FETCHED_APPLICATION',
                        applicationData
                    })}
                />}

                {state.currentScreen === 'SIGN-APPLICANT' &&
                <Signature
                    declaration="applicant"
                    nextButtonLabel="NEXT"
                    data={state.data}
                    title="Applicant signature"
                    subheading="Please sign to complete your application"
                    next={(data) => dispatch({type: 'APPLICANT_SIGNED', signature: data.signature})}
                    back={() => dispatch({type: 'CANCEL_APPLICANT_SIGN'})}
                />}

                {state.currentScreen === 'SIGN-WITNESS' &&
                <Signature
                    declaration="witness"
                    data={state.data}
                    nextButtonLabel="SUBMIT"
                    title="Witness signature"
                    subheading="Signature of person authorised to witness this declaration"
                    next={(data) => dispatch({type: 'WITNESS_SIGNED', signature: data.signature})}
                    back={() => dispatch({type: 'CANCEL_WITNESS_SIGN'})}
                />}

                {state.currentScreen === 'SUBMIT-SIGNATURES' &&
                <SignatureSubmitter
                    token={state.token}
                    data={state.data}
                    onSubmitted={() => dispatch({type: 'APPLICATION_SUBMITTED'})}
                />}

                {state.currentScreen === 'THANK-YOU' &&
                <div className="endScreen">
                    <h1>Thank you</h1>
                    <p className="summary">This declaration is now complete and ready to be processed.</p>
                    <img src={tick} alt="tick" className="img-tick"></img>
                </div>}
            </div>
        </div>
    );
}

export default App;
