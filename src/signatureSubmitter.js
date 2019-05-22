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
                let result = {
                    name: 'Jan Janssen',
                    occupationStatus: 'retired',
                    address: '191 Thorndon Quay, Wellington 6011',
                    ratesBill: 3749.52,
                    noOfDependants: 0,
                    combinedIncome: 21484.32,
                    rebateClaim: 450,
                    location: 'Tauranga City Council',
                    day: 'Monday',
                    month: 'June',
                    year: 2019,
                    witnessName: 'Brian Brake',
                    witnessTitle: 'Council Officer'
                };

                setTimeout(() => {
                    if (state.retryCount < 1) {
                        dispatch({type: 'SUBMITTING_SIGNATURES_ERROR'});
                    } else {
                        dispatch({type: 'SUBMITTED_SIGNATURES', data: result});
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
                <div className="wrap-system-msg">
                    <p className="system-msg system-msg--processing">Submitting signatures...</p>
                    <div className="sk-fading-circle">
                        <div className="sk-circle1 sk-circle"></div>
                        <div className="sk-circle2 sk-circle"></div>
                        <div className="sk-circle3 sk-circle"></div>
                        <div className="sk-circle4 sk-circle"></div>
                        <div className="sk-circle5 sk-circle"></div>
                        <div className="sk-circle6 sk-circle"></div>
                        <div className="sk-circle7 sk-circle"></div>
                        <div className="sk-circle8 sk-circle"></div>
                        <div className="sk-circle9 sk-circle"></div>
                        <div className="sk-circle10 sk-circle"></div>
                        <div className="sk-circle11 sk-circle"></div>
                        <div className="sk-circle12 sk-circle"></div>
                    </div>
                </div>
                }

                {state.signaturesSubmitted &&
                <div>
                    <div>signatures submitted</div>
                </div>
                }

                {state.submittingSignaturesError &&
                <div>
                    <p className="system-msg system-msg--error">Error while submitting signatures, please try again...</p>
                </div>
                }
            </div>
        </>
    )
};