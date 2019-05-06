import React from 'react';
import SignatureCanvas from 'react-signature-canvas';

export const Signature = (props) => {
    let sigCanvas = null;

    return (
        <div>
            <div className="test-content">
                <h1>Rates Rebate 2018/2019</h1>
                <h2>{props.title}</h2>

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
            <div className="controls">
                <button className='back' name="sign" onClick={props.back}>Go back</button>
                <button className='next' name="sign" onClick={() => props.next({signature: sigCanvas.toDataURL()})}>Next</button>
            </div>
        </div>
    )
};
