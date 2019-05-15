import React from 'react';
import { useReducer, useEffect } from 'react';

import './App.css';
import {reducer} from './AppReducer';
import {SignatureSubmitter} from "./signatureSubmitter";
import {ApplicationSummary} from "./applicationSummary";

import {Signature} from "./signature";
import tick from './images/tick.png';

// http://localhost:3000/?t=eyJhbGciOiJIUzI1NiJ9.eyJhcHBsaWNhdGlvbklkIjoxOCwiZXhwIjoxNTU3ODgxODM0LCJwZXIiOiJmZXRjaF9hcHBsaWNhdGlvbl9hbmRfc3VibWl0X3NpZ25hdHVyZXMifQ.vJ7iOTmJ3oOZTKIDJfFiT0_biqmKMxmw-4brlvXco2s


function App() {
    const initialState = {
        currentScreen: 'FETCH-APPLICATION'
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    function submitSignature(data) {
        let signature2 = data.signature;

        let dataToSubmit = {
            token: state.token,
            signature1: state.data.signatureApplicant,
            signature2: signature2
        };
        console.log(dataToSubmit);
        
        alert('submitting application');

        setTimeout(() => {
            dispatch({type:'APPLICATION_SUBMITTED'});
        }, 1000);
       
        // dispatch({type: 'WITNESS_SIGNED', signature: data.signature});

        // pseudo code;
        /*
        1. create data structure that contains application id and both signatures
        2. submit this data to the council's view backend 
        3. if ok -> dispatch new state f.e. SIGNATURES_SUBMITTED,  to show thank-you page
           if not ok -> present 'retry' button (dispatch({type:'APPLICATION_SUBMIT_FAILED'});)
        */
    }

    // function parseJwt (token) {
    //     var base64Url = token.split('.')[1];
    //     var base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join(''));
    
    //     return JSON.parse(base64);
    // };

    useEffect(() => {
        var urlParams = new URLSearchParams(window.location.search);
        dispatch ({type: 'RECEIVED_TOKEN', token: urlParams.get('t')})
        console.log(urlParams.get('t'));
    }, []);

    return (
        <div className="App">
            <header>
                <h2>Rates Rebate 2018/2019</h2>
            </header>
            {/* <pre className="debug">{JSON.stringify(state, null, ' ')}</pre> */}

            <div className="empty-content">
                <div className="content2">
                    {state.currentScreen === 'FETCH-APPLICATION' &&
                    <ApplicationSummary
                        token={state.token}
                        title="Please check these details for your rebate claim of $"
                        onCancel={() => dispatch({type: 'RESET'})}
                        onFetchedApplication={(applicationData) => dispatch({type: 'FETCHED_APPLICATION', applicationData})}
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
                        next={(data) => submitSignature(data)}
                        back={() => dispatch({type: 'CANCEL_WITNESS_SIGN'})}
                    />}

                    {state.currentScreen === 'THANK-YOU' &&
                    <div className="endScreen">
                        <h1>Thank you</h1>
                        <h2>This declaration is now complete and ready to be processed.</h2>
                        <img src={tick} alt="tick" className="img-tick"></img>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default App;
