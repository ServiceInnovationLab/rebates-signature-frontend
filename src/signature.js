import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

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
                        { error && <p className="signature-error">Please sign before you proceed</p>}

                        <SignatureCanvas
                            ref={(ref) => {
                                sigCanvas = ref;
                            }}
                            penColor='green'
                            canvasProps={{width: '750px', height: '240px', className: 'sigCanvas'}}
                            onBegin={() => setError(false)}
                        />
                    </div>
                    {props.declaration === 'applicant' && <DeclarationApplicant data={props.data}/>}
                    {props.declaration === 'witness' && <DeclarationWitness data={props.data}/>}
                </div>
            </div>
        </>
    )
};

const DeclarationApplicant = (props) => {
    return (
        <p className="signatureSection">
            I, <strong>{props.data.name}</strong> of <strong>{props.data.address}</strong>,
            occupation <strong>{props.data.occupationStatus}</strong> solemnly and sincerely declare that I believe the
            information
            I have given on this form is true and correct, and I make this solemn declaration conscientiously believing
            the
            same to be true and virtue of the Oaths and Declarations Act 1957.
        </p>
    )
}

const DeclarationWitness = (props) => {
    return (
        <p className="signatureSection">
            Declared at <b>{props.data.location}</b> this <b>{props.data.day}</b> of <b>{props.data.month}</b> <b>{props.data.year}</b> before me, <b>{props.data.witnessName}</b> <b>({props.data.witnessTitle})</b>.
        </p>
    )
}
