import React, {useState} from 'react';
import { useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCHING_APPLICATION':
            return {
                ...state,
                fetchingApplication: true,
                fetchingApplicationError: false,
                fetchedApplication: false,
                data: {
                    ...state.data,
                    applicationId: '123'
                }
            };
        case 'FETCHING_APPLICATION_ERROR':
            return {
                ...state,
                fetchingApplication: false,
                fetchingApplicationError: true,
                fetchedApplication: false,
            };
        case 'FETCHED_APPLICATION':
            return {
                ...state,
                fetchingApplication: false,
                fetchedApplication: true,
                correctApplication: -1,
                data: {
                    ...state.data,
                    applicationId: 123,
                    name: 'jan janssen'
                }
            };
        default: throw new Error('Unhandled action type ' + action.type);
    }

    return state;
};

export const ApplicationFetcher = (props) => {
    const initialState = {
        fetchingApplication: false,
        fetchedApplication: false,
        fetchingApplicationError: false,
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    function fetchApplication() {
        dispatch({type: 'FETCHING_APPLICATION'});
        setTimeout(() => {
            dispatch({type: 'FETCHING_APPLICATION_ERROR'});
        }, 500);
    }

    function retryFetchApplication() {
        dispatch({type: 'FETCHING_APPLICATION'});
        setTimeout(() => {
            dispatch({type: 'FETCHED_APPLICATION'});
        }, 1000);
    }

    return (
        <>
            <pre>{JSON.stringify(state, null, ' ')}</pre>

            <div className="test-content">
                <h1>Rates Rebate 2018/2019</h1>
                <h2>{props.title}</h2>

                {!state.fetchedApplication && !state.fetchingApplication && !state.fetchingApplicationError &&
                <div>
                    <label>Application Id</label>
                    <input id="id" type="text" name="id" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                }

                {state.fetchingApplication &&
                <div>Fetching application...</div>
                }

                {state.fetchedApplication &&
                <div>
                    Application fetched
                    <pre>{JSON.stringify(state.data, null, ' ')}</pre>
                </div>
                }

                {state.fetchingApplicationError &&
                <div>
                    <div>Error while fetching application...</div>
                </div>
                }
            </div>

            <div className="controls">
                <button className='back' name="cancel" onClick={props.onCancel}>Cancel</button>

                {!state.fetchedApplication && !state.fetchingApplication && !state.fetchingApplicationError &&
                <button className='next' name="submit" onClick={() => fetchApplication()}>Fetch application</button>
                }

                {state.fetchingApplication &&
                <button className='next' disabled>Fetching...</button>
                }

                {state.fetchingApplicationError &&
                <button className='next' onClick={() => retryFetchApplication()}>retry</button>
                }

                {state.fetchedApplication &&
                <button className='next' name="startOver" onClick={() => props.onFetchedApplication(state.data)}>next</button>
                }
            </div>
        </>
    )
};