import {useReducer, useEffect} from 'react';

import 'whatwg-fetch';

const initialState = {
    started: false,
    pending: false,
    error: null,
    start: null,
    result: null,
};

const reducer = (task, action) => {
    switch (action.type) {
        case 'init':
            return initialState;
        case 'ready':
            return {
                ...task,
                start: action.start,
            };
        case 'start':
            return {
                ...task,
                started: true,
                pending: true,
                error: false,
            };
        case 'result':
            return {
                ...task,
                pending: false,
                result: action.result,
            };
        case 'error':
            return {
                ...task,
                pending: false,
                error: action.error,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const usePendingFetch = (func, deps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let mounted = true;

        const start = async () => {
            try {
                if (deps[0]) {
                    dispatch({type: 'start'});
                    let result = await func();
                    if (mounted) {
                        dispatch({type: 'result', result});
                    }
                }
            } catch (error) {
                dispatch({type: 'error', error});
            }
        };

        if (deps[0]) {
            dispatch({type: 'ready', start});
        }

        return () => {
            dispatch({ type: 'init' });
            mounted = false;
        };
    }, deps);

    return state;
};

export const useAsyncRun = (asyncTask, onResult) => {
    const start = asyncTask && asyncTask.start;
    const result = asyncTask && asyncTask.result;

    useEffect(() => {
        if (start) {
            start();
        }

        return () => {
        };
    }, [start]);

    useEffect(() => {
        if (result) {
            onResult(result);
        }
    }, [result]);
};

export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
};
