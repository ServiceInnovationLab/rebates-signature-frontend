import React from 'react';
import { useReducer, useEffect } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
    switch (action.type) {
        case 'RETRY':
            return {
                ...state,
                fetch: ++state.fetch,
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
        default: throw new Error('Unhandled action type ' + action.type);
    }
};

export const ApplicationSummary = (props) => {
    const initialState = {
        fetchingApplication: false,
        fetchedApplication: false,
        fetchingApplicationError: false,
        token: props.token,
        fetch: 0,
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
                
                dispatch({type: 'FETCHED_APPLICATION', data: result});
              } catch(error) {
                dispatch({type: 'FETCHING_APPLICATION_ERROR'});
              }
        };

        fetchData();
    }, [state.fetch]);

    return (
        <>
            <div className="controlsBackground">
                <div className="controls">
                    {state.fetchingApplication &&
                    <button className='next' disabled>FETCHING...</button>
                    }

                    {state.fetchingApplicationError &&
                    <button className='next' onClick={() => dispatch({type: 'RETRY'})}>RETRY</button>
                    }

                    {state.fetchedApplication &&
                    <button className='next' name="startOver" onClick={() => props.onFetchedApplication(state.data)}>NEXT</button>
                    }
                </div>
            </div>
            <div className="text-content">
                <h1>Application Summary</h1>
                <h2>{props.title}{state.data.rebateClaim}</h2>

                {state.fetchingApplication &&
                <div>Fetching application...</div>
                }

                {state.fetchedApplication &&
                <div>
                    Application fetched
                    <p>My name is <b>{state.data.name}</b> and my occupation is <b>{state.data.occupationStatus}</b>.</p>

                    <p>My address is <b>{state.data.address}</b> and I lived here on 1 July 2018. 
                    I have not moved within this rating year.</p>

                    <p>My 2018/2019 rates bill (including water) is <b>${state.data.ratesBill}</b>.</p>

                    <p>I have <b>{state.data.noOfDependants}</b> dependant(s).</p>

                    <p>The combined income of myself and my [partner or joint home owner] living with me
                     on 1 July 2018 for the 2017/2018 tax year was <b>${state.data.combinedIncome}</b>.</p>
                </div>
                }

                {state.fetchingApplicationError &&
                <div>
                    <div>Error while fetching application...</div>
                </div>
                }
            </div>
        </>
    )
};