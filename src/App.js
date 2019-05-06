import React from 'react';
import { useState, useReducer } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import './App.css';
import {SignatureSubmitter} from "./signatureSubmitter";
import {ApplicationFetcher} from "./applicationFetcher";
import logo from './images/footer-logo-govt.png';

const reducer = (state, action) => {
    switch (action.type) {
        case 'START':
            return {
                ...state,
                started: true,
                fetchedApplication: false,
                correctApplication: -1,
                signedByApplicant: false,
                signedByWitness: false,
                data: {
                    applicationId: '',
                    name: '',
                    signatureApplicant: '',
                    signatureWitness: ''
                }
            };
        case 'FETCHED_APPLICATION':
            return {
                ...state,
                fetchedApplication: true,
                data: {
                    ...state.data,
                    applicationId: action.applicationData.applicationId,
                    name: action.applicationData.name,
                }
            };
        case 'CONFIRM_CORRECT_APPLICATION':
            return {
                ...state,
                correctApplication: true,
            };
        case 'APPLICANT_SIGNED':
            return {
                ...state,
                signedByApplicant: true,
                data: {
                    ...state.data,
                    signatureApplicant: action.signature
                }
            };
        case 'WITNESS_SIGNED':
            return {
                ...state,
                signedByWitness: true,
                data: {
                    ...state.data,
                    signatureWitness: action.signature
                }
            };
        case 'RESET':
            return {
                ...state,
                started: false,
                fetchedApplication: false,
                correctApplication: false,
                signedByApplicant: false,
                signedByWitness: false,
                data: {}
            };
        default: throw new Error('Unhandled action type ' + action.type);
    }

    return state;
};

const StartButton = (props) => {
    return (
        <button onClick={props.onClick}>Start</button>
    )
};

const StopButton = (props) => {
    return (
        <button onClick={props.onClick}>Stop</button>
    )
};

const ConfirmCorrectApplication = (props) => {
    return (
        <div>
            <button name="correct" onClick={props.correct}>Correct</button>
            <button name="incorrect" onClick={props.incorrect}>Incorrect</button>
        </div>
    );
};

const Signature = (props) => {
    let sigCanvas = null;

    return (
        <div>
            <div className="test-content">
                <h1>Rates Rebate 2018/2019</h1>
                <h2>{props.title}</h2>

                <div className='sign-applicant'>
                    <div>
                        I, test, solemnly and sincerely declare that I believe
                        the information I have given on this form is true and correct, and I make this solemn declaration
                        conscientiously believing the same to be true and virtue of the Oaths and Declarations Act 1957.
                    </div>
                    <div id="div1">
                        Signature of ratepayer to be signed in the presence of an authorized person
                    </div>
                    <SignatureCanvas
                        ref={(ref) => { sigCanvas = ref; }}
                        penColor='green'
                        canvasProps={{className: 'sigCanvas'}}
                    />
                </div>
            </div>
            <div className="test-controls">
                <button className='back' name="sign" onClick={props.back}>Go back</button>
                <button className='next' name="sign" onClick={() => props.next({signature: sigCanvas.toDataURL()})}>Next</button>
            </div>
        </div>
    )
};

function App() {
    const initialState = {};
    const [state, dispatch] = useReducer(reducer, initialState);

    function hideDiv() {

    }

    return (
        <div className="App">
            <header>
                <img src={logo} />
            </header>
            <pre>{JSON.stringify(state, null, ' ')}</pre>

            <div className="content">
                {!state.started &&
                <StartButton onClick={() => dispatch({type: 'START'})} />
                }

                {state.started &&
                <div>
                  {!state.fetchedApplication &&
                    <ApplicationFetcher
                    title="Enter your application id"
                    onCancel={() => dispatch({type: 'RESET'})}
                    onFetchedApplication={(applicationData) => dispatch({type: 'FETCHED_APPLICATION', applicationData})}
                  />}

                  {state.fetchedApplication && state.correctApplication === -1 &&
                  <div>
                      <div>Confirm correct application</div>
                      <p>
                          {state.data.name}
                          Summary details here...
                      </p>
                      <ConfirmCorrectApplication
                          correct={() => dispatch({type: 'CONFIRM_CORRECT_APPLICATION'})}
                          incorrect={() => dispatch({type: 'RESET'})}
                      />
                      <StopButton onClick={() => dispatch({type: 'STOP'})} />
                  </div>
                  }

                  {state.correctApplication === true && !state.signedByApplicant &&
                  <Signature
                      title="Customer signature"
                      onBegin={() => hideDiv('div1')}
                      next={(signature) => dispatch({type: 'APPLICANT_SIGNED', signature})}
                      back={() => dispatch({type: 'RESET'})}/>
                  }

                  {state.correctApplication === true && state.signedByApplicant && !state.signedByWitness &&
                  <Signature
                      title="Witness signature"
                      next={(signature) => dispatch({type: 'WITNESS_SIGNED', signature})}
                      back={() => dispatch({type: 'RESET'})}/>
                  }

                  {state.signedByApplicant && state.signedByWitness &&
                  <SignatureSubmitter
                      title="Ready to submit signatures"
                      onCancel={() => dispatch({type: 'RESET'})}
                      onSubmitted={() => dispatch({type: 'RESET'})}
                  />
                  }
                </div>
                }
            </div>
        </div>
    );
}

export default App;
