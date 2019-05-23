import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PropTypes from "prop-types";

import SignatureImage from '../images/signature-noLine1.svg';

export const Signature = (props) => {
    const [ error, setError ] = useState(false);
    let sigCanvas = null;

    const onNext = () => {
        if (sigCanvas.isEmpty()) {
            setError(true);
        } else {
            setError(false);
            props.next({signature: sigCanvas.toDataURL()});
        }
    };

    return (
        <>
            <div className="controlsBackground">
                <div className="controls">
                    <button className='back' name="sign" onClick={props.back}>GO BACK</button>
                    <button
                        className='next'
                        name="sign"
                        onClick={onNext}>{props.nextButtonLabel}</button>
                </div>
            </div>

            <div className="text-content">
                <h1>{props.title}</h1>
                <p className="summary">{props.subheading}</p>

                <div className='signature'>
                    <div className="wrap-signature">
                        { error && <p className="signature-error"><span>Please sign before you proceed</span></p>}
                        <img className="sigImage" src={SignatureImage} alt="signature"></img>
                        <SignatureCanvas
                            ref={(ref) => {
                                sigCanvas = ref;
                            }}
                            penColor='#369'
                            canvasProps={{width: 'auto', height: 'auto', className: 'sigCanvas'}}
                            onBegin={() => {setError(false);
                                            document.getElementsByClassName('sigImage')[0].style.cssText="visibility: hidden; opacity: 0;transition: visibility 0s .35s, opacity .35s linear;";}}
                        />
                    </div>
                    {props.declaration === 'applicant' && <DeclarationApplicant data={props.application}/>}
                    {props.declaration === 'witness' && <DeclarationWitness data={props.witness}/>}
                </div>
            </div>
        </>
    )
};

const DeclarationApplicant = (props) => {
    return (
        <p className="signatureSection">
            I, <strong>{props.data.full_name}</strong> of <strong>{props.data.address}</strong>,
            occupation <strong>{props.data.occupation}</strong>, solemnly and sincerely declare that I believe the
            information I have given on this form is true and correct, and I make this solemn declaration
            conscientiously believing the same to be true and by virtue of the Oaths and Declarations Act 1957.
        </p>
    )
};

const DeclarationWitness = (props) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date().toLocaleDateString('en-NZ', options);

    return (
        <p className="signatureSection">
            Declared at <strong>{props.data.location}</strong> this&nbsp;
            <strong>{date}</strong> before me, <strong>{props.data.name}</strong>, <strong>{props.data.occupation}</strong>.
        </p>
    )
};

Signature.propTypes = {
    title: PropTypes.string.isRequired,
    declaration: PropTypes.string.isRequired,
    application: PropTypes.shape({
        full_name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        occupation: PropTypes.string.isRequired,
    })
};