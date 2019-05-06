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

const FetchApplicationButton = (props) => {
    return (
        <button onClick={props.onClick}>Fetch</button>
    )
};

const StopButton = (props) => {
    return (
        <button onClick={props.onClick}>Stop</button>
    )
};

const IdField = (props) => {
    const  [id, setId] = useState('');

    return (
        <div>
            <label>Application Id</label>
            <input id="id" type="text" name="id" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
    );
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
        <div>
            <pre>{JSON.stringify(state, null, ' ')}</pre>

            <div className="test-content">
                <h1>Rates Rebate 2018/2019</h1>
                <h2>{props.title}</h2>

                {state.fetchingApplication &&
                <div>Fetching application...</div>
                }

                {!state.fetchedApplication && !state.fetchingApplication && !state.fetchingApplicationError &&
                <div>
                    <IdField />
                    <FetchApplicationButton onClick={() => fetchApplication()} />
                    <StopButton onClick={props.onCancel} />
                </div>
                }

                {state.fetchedApplication &&
                <div>
                    <div>Application fetched</div>
                    <button name="startOver" onClick={() => props.onFetchedApplication(state.data)}>next</button>
                </div>
                }

                {state.fetchingApplicationError &&
                <div>
                    <div>Error while fetching application...</div>
                    <button onClick={() => retryFetchApplication()}>retry</button>
                </div>
                }
            </div>
            <div className="test-controls">
                <button name="submit" onClick={props.onFetchedApplication}>Submit signatures</button>
                <button name="cancel" onClick={props.onCancel}>Cancel</button>
            </div>
        </div>
    )
};