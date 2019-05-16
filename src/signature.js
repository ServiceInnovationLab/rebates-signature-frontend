import React from 'react';
import SignatureCanvas from 'react-signature-canvas';

export const Signature = (props) => {
    let sigCanvas = null;

    return (
        <>
            <div className="controlsBackground">
                <div className="controls">
                    <button className='back' name="sign" onClick={props.back}>GO BACK</button>
                    <button
                        className='next'
                        name="sign"
                        onClick={() => props.next({signature: sigCanvas.toDataURL()})}>{props.nextButtonLabel}</button>
                </div>
            </div>

            <div className="text-content">
                <h1>{props.title}</h1>
                <h2>{props.subheading}</h2>

                <div className='signature'>
                    <div>
                        <SignatureCanvas
                            ref={(ref) => {
                                sigCanvas = ref;
                            }}
                            penColor='green'
                            canvasProps={{width: 1500, className: 'sigCanvas'}}
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
            I, <b>{props.data.name}</b> of <b>{props.data.address}</b>,
            occupation <b>{props.data.occupationStatus}</b> solemnly and sincerely declare that I believe the
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
    