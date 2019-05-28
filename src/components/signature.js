import React, { useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PropTypes from "prop-types";

export const Signature = (props) => {
    const [ error, setError ] = useState(false);
    let sigCanvas = null;

    const onNext = () => {
        if (sigCanvas.isEmpty()) {
            setError(true);
            document.querySelector('.signature').className = 'signature error';
        } else {
            setError(false);
            props.next({signature: sigCanvas.toDataURL()});
        }
    };

    // resize canvas after window resize
    useEffect(() => {
        if (sigCanvas) {
            window.addEventListener('resize', resizeCanvas);
        }

        return () => {
          window.removeEventListener('resize', resizeCanvas);
          console.log(' destroy');
        };
    }, [sigCanvas]);

    // resize canvas on initial load
    useEffect(() => resizeCanvas(), [sigCanvas]);

    function resizeCanvas() {
        console.log(' resize', sigCanvas);
        if (sigCanvas) {
            let element = document.querySelector('.wrap-signature-canvas');
            console.log(sigCanvas.getCanvas());
            let canvas = sigCanvas.getCanvas();
            canvas.setAttribute('width', 1);
            canvas.setAttribute('height', 1);

            canvas.setAttribute('width', element.offsetWidth);
            canvas.setAttribute('height', (element.offsetWidth * 0.33));
            console.log(element.offsetHeight, element.offsetWidth);

            showBackgroundImage();
        }
    }

    function hideBackgroundImage() {
        setError(false);
        document.getElementsByClassName(
            'sigBgImage')[0].style.cssText="visibility: hidden; opacity: 0;transition: visibility 0s .35s, opacity .35s linear;";
        document.querySelector('.signature').className = 'signature';
    }

    function showBackgroundImage() {
        setError(false);
        document.getElementsByClassName(
            'sigBgImage')[0].style.cssText="visibility: default; opacity: 1;transition: visibility 0s .35s, opacity .35s linear";
        document.querySelector('.signature').className = 'signature';
    }

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
                    <div className="wrap-signature-canvas">
                        { error && <p className="signature__error-msg"><span>Please sign before you proceed</span></p>}
                        <span className="sigBgImage"></span>
                        <SignatureCanvas
                            ref={(ref) => {
                                sigCanvas = ref;
                            }}
                            penColor='#369'
                            canvasProps={{width: '1', height: '1', className: 'sigCanvas'}}
                            onBegin={() => hideBackgroundImage()}
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