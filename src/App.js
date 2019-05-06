import React from 'react';
import { useReducer } from 'react';

import './App.css';
import {reducer} from './AppReducer';
import {SignatureSubmitter} from "./signatureSubmitter";
import {ApplicationFetcher} from "./applicationFetcher";

import {Signature} from "./signature";
import logo from './images/footer-logo-govt.png';

const StartButton = (props) => {
    return (
        <button onClick={props.onClick}>Start</button>
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

                  {state.fetchedApplication && !state.signedByApplicant &&
                  <Signature
                      title="Customer signature"
                      onBegin={() => hideDiv('div1')}
                      next={(data) => dispatch({type: 'APPLICANT_SIGNED', signature: data.signature})}
                      back={() => dispatch({type: 'CANCEL_APPLICANT_SIGN'})}/>
                  }
                  {state.fetchedApplication && state.signedByApplicant && !state.signedByWitness &&
                  <Signature
                      title="Witness signature"
                      next={(data) => dispatch({type: 'WITNESS_SIGNED', signature: data.signature})}
                      back={() => dispatch({type: 'CANCEL_WITNESS_SIGN'})}/>
                  }

                  {state.signedByApplicant && state.signedByWitness &&
                  <SignatureSubmitter
                      title="Ready to submit signatures"
                      onCancel={() => dispatch({type: 'CANCEL_SUBMIT_NOTICE'})}
                      onSubmitted={() => dispatch({type: 'RESET'})}
                  />}
                </div>
                }
            </div>
        </div>
    );
}

export default App;
