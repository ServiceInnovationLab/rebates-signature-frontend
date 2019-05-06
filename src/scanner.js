import React from 'react';
import QrReader from 'react-qr-reader';
// import QrReader from 'react-qr-scanner'

export const Scanner = (props) => {

    const handleScan = data => {
        if (data) {
            props.onScan(data);
        }
    };

    const handleError = err => {
        props.onScan(err);
    };

    return (
        <div>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={(data) => handleScan(data)}
                style={{ width: '100%', maxWidth: '500px' }}
                facingMode="rear"
            />
        </div>
    );
}