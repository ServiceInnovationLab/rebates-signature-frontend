
export const appReducer = (state, action) => {
    switch (action.type) {
        case 'RECEIVED_TOKEN':
            return {
                ...state,
                token: action.token,
                currentScreen: 'FETCH-APPLICATION',
            };
        case 'FETCHED_APPLICATION':
            return {
                ...state,
                currentScreen: 'CONFIRM-APPLICATION',
                application: action.application,
            };
        case 'CONFIRMED_APPLICATION':
            return {
                ...state,
                currentScreen: 'SIGN-APPLICANT',
            };
        case 'APPLICANT_SIGNED':
            return {
                ...state,
                currentScreen: 'SIGN-WITNESS',
                signatureApplicant: action.signature,
                signatureWitness: ''
            };
        case 'CANCEL_APPLICANT_SIGN':
            return {
                ...state,
                currentScreen: 'CONFIRM-APPLICATION',
                signatureApplicant: '',
                signatureWitness: '',
            };
        case 'WITNESS_SIGNED':
            return {
                ...state,
                currentScreen: 'SUBMITTING-APPLICATION',
                signatureWitness: action.signature,
                readyToSubmit: true
            };
        case 'CANCEL_WITNESS_SIGN':
            return {
                ...state,
                currentScreen: 'SIGN-APPLICANT',
                signatureApplicant: '',
                signatureWitness: ''
            };
        case 'APPLICATION_SUBMITTED':
            return {
                ...state,
                currentScreen: 'THANK-YOU',
            };
        default: throw new Error('Unhandled action type ' + action.type);
    }
};