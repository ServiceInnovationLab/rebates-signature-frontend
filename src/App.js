import React from 'react';
import { useState, useReducer } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import './App.css';
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
                signaturesSubmitted: false,
                data: {
                    applicationId: '',
                    name: '',
                    signatureApplicant: '',
                    signatureWitness: ''
                }
            };
        case 'FETCHING_APPLICATION':
            return {
                ...state,
                fetchingApplication: true,
                fetchingApplicationError: false,
                fetchedApplication: false,
                data: {
                    ...state.data,
                    applicationId: '123'
                }
            };
        case 'FETCHING_APPLICATION_ERROR':
            return {
                ...state,
                fetchingApplication: false,
                fetchingApplicationError: true,
                fetchedApplication: false,
            };
        case 'FETCHED_APPLICATION':
            return {
                ...state,
                fetchingApplication: false,
                fetchedApplication: true,
                correctApplication: -1,
                data: {
                    ...state.data,
                    applicationId: 123,
                    name: 'jan janssen'
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
        case 'SUBMITTING_SIGNATURES':
            return {
                ...state,
                submittingSignatures: true,
            };
        case 'SUBMITTING_SIGNATURES_ERROR':
            return {
                ...state,
                submittingSignatures: false,
                submittingSignaturesError: true,
            };
        case 'RESET':
            return {
                ...state,
                started: false,
                fetchedApplication: false,
                correctApplication: false,
                signedByApplicant: false,
                signedByWitness: false,
                signaturesSubmitted: false,
                data: {}
            };
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

const FetchApplicationButton = (props) => {
    return (
        <button onClick={props.onClick}>Fetch</button>
    )
};

const IdField = (props) => {
    const  [id, setId] = useState('');

    return (
        <div>
            <label>Application Id</label>
            <input id="id" type="text" name="id" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
    );
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
            <div className="pre-canvas">
                <SignatureCanvas
                    ref={(ref) => { sigCanvas = ref; }}
                    penColor='green'
                    canvasProps={{className: 'sigCanvas'}}
                />
                </div>
        </div>
    )
};

const SubmitSignatures = (props) => {
    return (
        <div>
            <button name="submit" onClick={props.onSubmit}>Submit signatures</button>
            <button name="cancel" onClick={props.onCancelSubmit}>Cancel submit signatures</button>
        </div>
    )
};

function App() {
    const initialState = {};
    const [state, dispatch] = useReducer(reducer, initialState);

    function fetchApplication() {
        dispatch({type: 'FETCHING_APPLICATION'});
        setTimeout(() => {
            dispatch({type: 'FETCHING_APPLICATION_ERROR'});
        }, 500);
    }

    function retryFetchApplication() {
        dispatch({type: 'FETCHING_APPLICATION'});
        setTimeout(() => {
            dispatch({type: 'FETCHED_APPLICATION'});
        }, 1000);
    }

    function submitSignatures() {
        dispatch({type: 'SUBMITTING_SIGNATURES'});
        setTimeout(() => {
            dispatch({type: 'SUBMITTING_SIGNATURES_ERROR'});
        }, 1000);
    }

    function retrySubmitSignatures() {
        dispatch({type: 'SUBMITTING_SIGNATURES'});
        setTimeout(() => {
            dispatch({type: 'RESET'});
        }, 1000);
    }

    function hideDiv(id) {

    }

    let sigCanvas = null;

    return (
        <div className="App">
            <header>
                <img src={logo} />
            </header>
            <pre>{JSON.stringify(state, null, ' ')}</pre>
            <div className="test-content">
                <h1>Rates Rebate 2018/2019</h1>
                <h2>Customer signature</h2>

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
                <button className='back' name="sign" onClick={() => dispatch({type: 'RESET'})}>Go back</button>
                <button className='next' name="sign" onClick={() => dispatch({type: 'APPLICANT_SIGNED', signature: sigCanvas.toDataURL()})}>Next</button>
            </div>

            <div className="content" style={{display: 'none'}}>
                <h1>Rates Rebate 2018/2019</h1>
                <h2>Application summary</h2>
                  { state.started ?
                      <div></div>
                      :
                      <StartButton onClick={() => dispatch({type: 'START'})} />
                  }

                  {
                      state.started ?
                          <div>
                              { !state.fetchedApplication && !state.fetchingApplication && !state.fetchingApplicationError ?
                                  <div>
                                      <IdField/>
                                      <FetchApplicationButton onClick={() => fetchApplication()} />
                                      <StopButton onClick={() => dispatch({type: 'RESET'})} />
                                  </div>
                                  :
                                  <div></div>
                              }

                              { state.fetchingApplicationError ?
                                  <div>
                                    <div>Error while fetching application...</div>
                                      <button onClick={() => retryFetchApplication()}>retry</button>
                                  </div>
                                  :
                                  <div></div>
                              }

                              { state.fetchingApplication ?
                                  <div>Fetching application...</div>
                                  :
                                  <div></div>
                              }

                              { state.fetchedApplication && state.correctApplication === -1 ?
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
                                  :
                                  <div></div>
                              }

                              { state.correctApplication === true ?
                                  <div>
                                      { state.signedByApplicant ?
                                          <div>
                                              { !state.signedByWitness ?
                                                  <div>

                                                      <Signature
                                                          sign={(signature) => dispatch({type: 'WITNESS_SIGNED', signature})}
                                                          cancel={() => dispatch({type: 'RESET'})}/>
                                                  </div>
                                                  :
                                                  <div></div>
                                              }
                                          </div>
                                          :
                                          <div>
                                              <p>
                                                  Customer signature
                                              </p>
                                              <div>
                                                  I, {state.data.name}, solemnly and sincerely declare that I believe
                                                  the information I have given on this form is true and correct, and I make this solemn declaration
                                                  conscientiously believing the same to be true and virtue of the Oaths and Declarations Act 1957.
                                              </div>
                                              <div id="div1">
                                                  Signature of ratepayer to be signed in the presence of an authorized person
                                              </div>
                                              <Signature
                                                  onBegin={() => hideDiv('div1')}
                                                  sign={(signature) => dispatch({type: 'APPLICANT_SIGNED', signature})}
                                                  cancel={() => dispatch({type: 'RESET'})}/>
                                          </div>
                                      }

                                      { state.signedByApplicant
                                            && state.signedByWitness
                                            && !state.signaturesSubmitted
                                            && !state.submittingSignatures
                                            && !state.submittingSignaturesError ?
                                          <div>
                                              <div>ready to submit signatures</div>
                                              <SubmitSignatures
                                                  onSubmit={() => submitSignatures()}
                                                  onCancelSubmit={() => dispatch({type: 'RESET'})}
                                              />
                                          </div>
                                          :
                                          <div></div>
                                      }

                                      { state.submittingSignatures ?
                                          <div>Submitting signatures...</div>
                                          :
                                          <div></div>
                                      }

                                      { state.submittingSignaturesError && !state.submittingSignatures ?
                                          <div>
                                              <div>Error while submitting signatures...</div>
                                              <button onClick={() => retrySubmitSignatures()}>retry</button>
                                          </div>
                                          :
                                          <div></div>
                                      }

                                      { state.signedByApplicant && state.signedByWitness && state.signaturesSubmitted ?
                                          <div>
                                              <div>signatures submitted</div>
                                              <button name="startOver" onClick={() => dispatch({type: 'RESET'})}>start over</button>
                                          </div>
                                          :
                                          <div></div>
                                      }
                                  </div>
                                  :
                                  <div></div>
                              }
                          </div>
                          :
                          <div></div>
                  }


            </div>
        </div>
    );
}

export default App;
