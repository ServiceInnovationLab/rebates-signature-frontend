
export const reducer = (state, action) => {
    console.log(state, action);

    switch (action.type) {
        case 'START':
            return {
                ...state,
                started: true,
                fetchedApplication: false,
                signedByApplicant: false,
                signedByWitness: false,
                data: {
                    applicationId: '',
                    name: '',
                    signatureApplicant: '',
                    signatureWitness: ''
                }
            };
        case 'FETCHED_APPLICATION':
            return {
                ...state,
                fetchedApplication: true,
                signedByApplicant: false,
                signedByWitness: false,
                data: {
                    ...state.data,
                    applicationId: action.applicationData.applicationId,
                    name: action.applicationData.name,
                }
            };
        case 'APPLICANT_SIGNED':
            return {
                ...state,
                signedByApplicant: true,
                signedByWitness: false,
                data: {
                    ...state.data,
                    signatureApplicant: action.signature,
                    signatureWitness: ''
                }
            };
        case 'CANCEL_APPLICANT_SIGN':
            return {
                ...state,
                fetchedApplication: false,
                signedByApplicant: false,
                signedByWitness: false,
                data: {
                    ...state.data,
                    signatureApplicant: '',
                    signatureWitness: ''
                }
            };
        case 'WITNESS_SIGNED':
            return {
                ...state,
                signedByApplicant: true,
                signedByWitness: true,
                data: {
                    ...state.data,
                    signatureWitness: action.signature
                }
            };
        case 'CANCEL_WITNESS_SIGN':
            return {
                ...state,
                fetchedApplication: true,
                signedByApplicant: false,
                signedByWitness: false,
                data: {
                    ...state.data,
                    signatureApplicant: '',
                    signatureWitness: ''
                }
            };
        case 'CANCEL_SUBMIT_NOTICE':
            return {
                ...state,
                fetchedApplication: true,
                signedByApplicant: true,
                signedByWitness: false,
                data: {
                    ...state.data,
                    signatureWitness: ''
                }
            };
        case 'RESET':
            return {
                ...state,
                started: false,
                fetchedApplication: false,
                signedByApplicant: false,
                signedByWitness: false,
                data: {}
            };
        default: throw new Error('Unhandled action type ' + action.type);
    }

    return state;
};