
export const reducer = (state, action) => {
    switch (action.type) {
        case 'RECEIVED_TOKEN':
            return {
                ...state,
                token: action.token,
            }
        case 'FETCHED_APPLICATION':
            return {
                ...state,
                currentScreen: 'SIGN-APPLICANT',
                data: {
                    ...state.data,
                    ...action.applicationData
                }
            };
        case 'APPLICANT_SIGNED':
            return {
                ...state,
                currentScreen: 'SIGN-WITNESS',
                data: {
                    ...state.data,
                    signatureApplicant: action.signature,
                    signatureWitness: ''
                }
            };
        case 'CANCEL_APPLICANT_SIGN':
            return {
                ...state,
                currentScreen: 'FETCH-APPLICATION',
                data: {
                    ...state.data,
                    signatureApplicant: '',
                    signatureWitness: ''
                }
            };
        case 'WITNESS_SIGNED':
            return {
                ...state,
                data: {
                    ...state.data,
                    signatureWitness: action.signature
                }
            };
        case 'CANCEL_WITNESS_SIGN':
            return {
                ...state,
                currentScreen: 'SIGN-APPLICANT',
                data: {
                    ...state.data,
                    signatureApplicant: '',
                    signatureWitness: ''
                }
            };
        case 'APPLICATION_SUBMIT_FAILED':
        return {
            ...state,
            data: {
                ...state.data,
                signatureApplicant: action.signature,
                signatureWitness: ''
            }
        }
        case 'APPLICATION_SUBMITTED':
        return {
            ...state,
            currentScreen: 'THANK-YOU',
            data: {
                ...state.data,
                signatureWitness: action.signature
            }
        };
        default: throw new Error('Unhandled action type ' + action.type);
    }
};