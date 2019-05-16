import React from 'react';
import {useReducer, useEffect} from 'react';
import axios from 'axios';

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
                    singleIncome: 1050,
                    combinedIncome: 21484.32,
                    rebateClaim: 450,
                    location: 'Tauranga City Council',
                    day: 'Monday', // Pulled through from current day
                    month: 'June', // Pulled through from current month
                    year: 2018, // Pulled through from current year
                    witnessName: 'Brian Brake',
                    witnessTitle: 'Council Officer',
                    taxYear: '2018/2019', // Pulled through from current tax year,
                    partner: true
                };  
                dispatch({type: 'FETCHED_APPLICATION', data: result});
              } catch(error) {
                dispatch({type: 'FETCHING_APPLICATION_ERROR'});
            }
        };
        fetchData();
    }, [state.retryCount]);

    return (
        <>
            <div className="controlsBackground">
                <div className="controls">
                    {state.fetchingApplicationError &&
                    <button className='next' onClick={() => dispatch({type: 'RETRY'})}>RETRY</button>
                    }

                    {state.fetchedApplication &&
                    <button className='next' name="startOver"
                            onClick={() => props.onFetchedApplication(state.data)}>NEXT</button>
                    }
                </div>
            </div>
            <div className="text-content">
                {state.fetchedApplication &&
                <div>
                    <p>My name is <strong>{state.data.name}</strong> and my occupation is <strong>{state.data.occupationStatus}</strong>.</p>

                    <p>My address is <strong>{state.data.address}</strong> and I lived here on 1 July {state.data.year}. 
                    I have not moved within this rating year.</p>

                    <p>My {state.data.taxYear} rates bill (including water) is <strong>${state.data.ratesBill}</strong>.</p>

                    <p>I have <strong>{state.data.noOfDependants}</strong> dependant(s).</p>
                    
                    {!state.data.partner &&
                    <p>The combined income of myself and my [partner or joint home owner] living with me
                     on 1 July {state.data.year} for the {state.data.taxYear} tax year was <strong>${state.data.combinedIncome}</strong>.</p>
                    }
                    
                    {state.data.partner &&
                    <p>My income for the {state.data.taxYear} tax year was <strong>${state.data.singleIncome}</strong>.</p>
                    }
                </div>
                }

                {state.fetchingApplication &&
                <p className="system-msg system-msg--processing">Fetching application...</p>

                }

                {state.fetchingApplicationError &&
                    <p className="system-msg system-msg--error">Error while fetching application...</p>
                }
            </div>
        </>
    )
};