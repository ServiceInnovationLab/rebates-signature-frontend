import React from 'react';
import {useReducer, useEffect} from 'react';
import axios from 'axios';

import {Preloader} from './preloader';

const reducer = (state, action) => {
    switch (action.type) {
        case 'RETRY':
            return {
                ...state,
                retryCount: ++state.retryCount,
            };
        case 'FETCHING_APPLICATION':
            return {
                ...state,
                fetchingApplication: true,
                fetchingApplicationError: false,
                fetchedApplication: false,
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
                data: action.data
            };
        default:
            throw new Error('Unhandled action type ' + action.type);
    }
};

export const ApplicationSummary = (props) => {
    const initialState = {
        fetchingApplication: false,
        fetchedApplication: false,
        fetchingApplicationError: false,
        token: props.token,
        retryCount: 0,
        data: {}
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: 'FETCHING_APPLICATION'});

            try {
                // TODO ask Micha for a valid endpoint, request and response object
                // const result = await axios(
                //     // Need to check in with Mischa what the right address is.
                //     `http://pancake-lb-518327613.ap-southeast-2.elb.amazonaws.com/admin/sign?t=${state.token}`,
                // );

                let result = {
                    name: 'Jan Janssen',
                    occupationStatus: 'retired',
                    address: '191 Thorndon Quay, Wellington 6011',
                    ratesBill: 3749.52,
                    noOfDependants: 0,
                    combinedIncome: 21484.32,
                    rebateClaim: 450,
                    location: 'Tauranga City Council',
                    day: 'Monday',
                    month: 'June',
                    year: 2019,
                    witnessName: 'Brian Brake',
                    witnessTitle: 'Council Officer'
                };

                setTimeout(() => {
                    if (state.retryCount < 1) {
                        dispatch({type: 'FETCHING_APPLICATION_ERROR'});
                    } else {
                        dispatch({type: 'FETCHED_APPLICATION', data: result});
                    }
                }, 1000);
            } catch (error) {
                dispatch({type: 'FETCHING_APPLICATION_ERROR'});
            }
        };

        fetchData();
    }, [state.retryCount]);

    return (
        <>
            {state.fetchingApplication && <Preloader />}

            {state.fetchingApplicationError &&
                <div className="text-content fade-in">
                    <p className="system-msg system-msg--error">
                        Unfortunately an error occurred while retrieving this application, please try again.
                    </p>
                  <button className='next' onClick={() => dispatch({type: 'RETRY'})}>RETRY</button>
                </div>
            }

            {state.fetchedApplication &&
            <div className="text-content fade-in">
                <h1>Application Summary</h1>
                <h2>{props.title}{state.data.rebateClaim}</h2>

                <p>My name is <strong>{state.data.name}</strong> and my occupation is <strong>{state.data.occupationStatus}</strong>.
                </p>

                <p>My address is <strong>{state.data.address}</strong> and I lived here on 1 July 2018.
                    I have not moved within this rating year.</p>

                <p>My 2018/2019 rates bill (including water) is <strong>${state.data.ratesBill}</strong>.</p>

                <p>I have <strong>{state.data.noOfDependants === 0 ? 'no' : state.data.noOfDependants}</strong> dependant(s).</p>

                <p>The combined income of myself and my [partner or joint home owner] living with me
                    on 1 July 2018 for the 2017/2018 tax year was <strong>${state.data.combinedIncome}</strong>.</p>

                <button className='next' name="startOver"
                        onClick={() => props.onFetchedApplication(state.data)}>CONFIRM</button>
            </div>}
        </>
    )
};