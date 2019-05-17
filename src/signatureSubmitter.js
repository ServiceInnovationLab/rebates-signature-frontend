import React from 'react';
import {useReducer, useEffect} from 'react';
import axios from 'axios';

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
        retryCount: 0,
        token: props.token,
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const submitData = async (token) => {
            dispatch({type: 'SUBMITTING_SIGNATURES'});

            try {
                let data = props.data;
                let request = {
                    "token": `${token}`,
                    "signatures": [
                        {
                            "image": data.signatureApplicant,
                            "name": data.name,
                            "role": data.occupationStatus,
                            "type": "applicant"
                        },
                        {
                            "image": data.signatureWitness,
                            "name": data.witnessName,
                            "role": data.witnessTitle,
                            "type": "witness"
                        }
                    ]
                };

                let result = await axios.post(`/api/v1/rebate_forms/sign`, request);
                let { response } = await result.data;
                dispatch({type: 'SUBMITTED_SIGNATURES'});
                props.onSubmitted();

                console.log(response);
            } catch (error) {
                dispatch({type: 'SUBMITTING_SIGNATURES_ERROR'});
            }
        };

        submitData(props.token);
    }, [props.token, state.retryCount]);

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