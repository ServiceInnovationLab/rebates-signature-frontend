import React from 'react';
import { useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SUBMITTING_SIGNATURES':
            return {
                ...state,
                submittingSignatures: true,
                submittingSignaturesError: false,
                signaturesSubmitted: false,
            };
        case 'SUBMITTING_SIGNATURES_ERROR':
            return {
                ...state,
                submittingSignatures: false,
                submittingSignaturesError: true,
                signaturesSubmitted: false,
            };
        case 'SUBMITTED_SIGNATURES':
            return {
                ...state,
                submittingSignatures: false,
                submittingSignaturesError: false,
                signaturesSubmitted: true
            };
        default: throw new Error('Unhandled action type ' + action.type);
    }

    return state;
};

export const SignatureSubmitter = (props) => {
    const initialState = {
        submittingSignatures: false,
        signaturesSubmitted: false,
        submittingSignaturesError: false,
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    function submitSignatures() {
        dispatch({type: 'SUBMITTING_SIGNATURES'});
        setTimeout(() => {
            dispatch({type: 'SUBMITTING_SIGNATURES_ERROR'});
        }, 1000);
    }

    function retrySubmitSignatures() {
        dispatch({type: 'SUBMITTING_SIGNATURES'});
        setTimeout(() => {
            dispatch({type: 'SUBMITTED_SIGNATURES'});
        }, 1000);
    }

    return (
        <div>
            <pre>{JSON.stringify(state, null, ' ')}</pre>

            <div className="test-content">
                <h1>Rates Rebate 2018/2019</h1>
                <h2>{props.title}</h2>

                {state.submittingSignatures &&
                <div>Submitting signatures...</div>
                }

                {state.signaturesSubmitted &&
                <div>
                    <div>signatures submitted</div>
                </div>
                }

                {state.submittingSignaturesError &&
                <div>
                    <div>Error while submitting signatures...</div>
                </div>
                }
            </div>

            <div className="controls">
                <button className='back' name="cancel" onClick={props.onCancel}>Cancel submit signatures</button>

                {!state.signaturesSubmitted && !state.submittingSignatures && !state.submittingSignaturesError &&
                <button className='next' name="submit" onClick={() => submitSignatures()}>Submit signatures</button>
                }

                {state.submittingSignatures &&
                <button className='next' name="submit" disabled>Submitting...</button>
                }

                {state.submittingSignaturesError &&
                <button className='next' onClick={() => retrySubmitSignatures()}>retry</button>
                }

                {state.signaturesSubmitted &&
                <button className='next' name="startOver" onClick={props.onSubmitted}>Next</button>
                }
            </div>
        </div>
    )
};