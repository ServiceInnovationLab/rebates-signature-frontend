import React from 'react';
import {useReducer, useEffect} from 'react';

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
        case 'RETRY':
            return {
                ...state,
                retryCount: ++state.retryCount
            };
        default:
            throw new Error('Unhandled action type ' + action.type);
    }
};

export const SignatureSubmitter = (props) => {
    const initialState = {
        submittingSignatures: false,
        signaturesSubmitted: false,
        submittingSignaturesError: false,
        retryCount: 0
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const submitData = async () => {
            dispatch({type: 'SUBMITTING_SIGNATURES'});

            try {
                setTimeout(() => {
                    if (state.retryCount < 1) {
                        dispatch({type: 'SUBMITTING_SIGNATURES_ERROR'});
                    } else {
                        dispatch({type: 'SUBMITTED_SIGNATURES'});
                        props.onSubmitted();
                    }
                }, 2000);
            } catch (error) {
                dispatch({type: 'SUBMITTING_SIGNATURES_ERROR'});
            }
        };

        submitData();
    }, [props, state.retryCount]);

    return (
        <>
            <div className="controlsBackground">
                <div className="controls">
                    {state.submittingSignaturesError &&
                    <button className='next' onClick={() => dispatch({type: 'RETRY'})}>RETRY</button>
                    }
                </div>
            </div>

            <div className="text-content">
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
                    <div>Error while submitting signatures, please try again...</div>
                </div>
                }
            </div>
        </>
    )
};