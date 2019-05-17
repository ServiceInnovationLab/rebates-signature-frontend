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
        retryCount: 0,
        token: props.token,
        data: {}
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchData = async (token) => {
            dispatch({type: 'FETCHING_APPLICATION'});

            try {
                // let result = await axios.get(`/api/v1/rebate_forms/?jwt=${token}`);
                // let { data } = await result.data;
                // dispatch({type: 'FETCHED_APPLICATION', data: data});

                // console.log(data);

                // TODO need to rename fields on the screen to match the returned result
                let data = {
                    "data": {
                        "id": "1",
                        "type": "rebate_forms",
                        "attributes": {
                            "valuation_id": "XF9WADUR1MD8D41LM",
                            "token": "e5e1147a2800aa243285b856b3e84f2e15d32de08930bc2a3f1f9a2437af698177d4d1298f0ff36470c0a053fcc47afd12",
                            "rebate": "620.0",
                            "fields": {
                                "full_name": "Johnny Nullableee",
                                "income": {
                                    "applicant": {
                                        "other_superannuation": "13",
                                        "nz_superannuation": "30",
                                        "interest_dividends": "50",
                                        "wages_salery": "74",
                                        "More Extra": "6",
                                        "wages_salary": "4",
                                        "add new incommmm": "4"
                                    },
                                    "total_income": 806,
                                    "partner": {
                                        "other_superannuation": "20",
                                        "nz_superannuation": "40",
                                        "interest_dividends": "60",
                                        "wages_salery": "80",
                                        "add new incommmm": "2"
                                    },
                                    "other_income": {
                                        "applicant": {
                                            "Extra Income": "90",
                                            "More Extra": "110",
                                            "raaa": "1"
                                        },
                                        "partner": {
                                            "Extra Income": "100",
                                            "More Extra": "120",
                                            "raaa": "2"
                                        }
                                    }
                                },
                                "dependants": "5",
                                "customer_id": "1234567",
                                "location": "191 Thorndon Quay",
                                "total_rates": "500",
                                "valuation_id": "12345 123 12",
                                "email": "fake@email.co",
                                "phone_number": "123456789",
                                "spouse_or_partner": "no",
                                "dependents": "4",
                                "50%_claimed_expenses": "yes",
                                "occupation": "Tester",
                                "moved_within_rating_year": "yes",
                                "lived_in_property_1_July": "no",
                                "previous_address": "5 Pipitea Street",
                                "settlement_date": "2018-04-30",
                                "rates_rebate_recieved": "no",
                                "rates_paid": "400",
                                "rates_rebate_received": "yes"
                            }
                        }
                    },
                    "meta": {},
                    "jsonapi": {
                        "version": "1.0"
                    }
                };

                let application = {
                    name: data.data.attributes.fields.full_name,
                    occupationStatus: data.data.attributes.fields.occupation,
                    address: data.data.attributes.fields.location,
                    ratesBill: data.data.attributes.fields.rates_paid,
                    noOfDependants: data.data.attributes.fields.dependants,
                    singleIncome: data.data.attributes.fields.income.total_income,
                    combinedIncome: data.data.attributes.fields.income.total_income,
                    rebateClaim: data.data.attributes.rebate,
                    location: data.data.attributes.fields.location, // FIXME missing in response
                    day: 'Monday',// FIXME generate
                    month: 'June',// FIXME generate
                    year: 2018,// FIXME generate
                    witnessName: 'Brian Brake', // FIXME missing in response
                    witnessTitle: 'Council Officer', // FIXME missing in response
                    taxYear: '2018/2019', // FIXME generate
                    partner: data.data.attributes.fields.spouse_or_partner
                };

                dispatch({type: 'FETCHED_APPLICATION', data: application});
            } catch (error) {
                dispatch({type: 'FETCHING_APPLICATION_ERROR'});
            }
        };

        fetchData(props.token);
    }, [props.token, state.retryCount]);

    return (
        <>
            <div className="controlsBackground">
                <div className="controls">
                    {state.fetchedApplication &&
                    <button className='next'
                            name='startOver'
                            onClick={() => props.onFetchedApplication(state.data)}>NEXT</button>
                    }
                </div>
            </div>
            <div className="text-content">
                {state.fetchedApplication &&
                <>
                    <h1>Application Summary</h1>
                    <p className="summary">
                        Please check these details for your rebate claim of ${state.data.rebateClaim}
                    </p>

                    <p>My name is <strong>{state.data.witnessName}</strong> and my occupation is <strong>{state.data.occupationStatus}</strong>.
                    </p>

                    <p>My address is <strong>{state.data.address}</strong> and I lived here on 1 July {state.data.year}.
                        I have not moved within this rating year.</p>

                    <p>My {state.data.taxYear} rates bill (including water) is <strong>${state.data.ratesBill}</strong>.</p>

                    <p>I have <strong>{state.data.noOfDependants}</strong> dependant(s).</p>

                    {!state.data.partner &&
                    <p>
                        The combined income of myself and my [partner or joint home owner] living with me
                        on 1 July {state.data.year} for the {state.data.taxYear} tax year was <strong>${state.data.combinedIncome}</strong>.
                    </p>
                    }

                    {state.data.partner &&
                    <p>My income for the {state.data.taxYear} tax year was <strong>${state.data.singleIncome}</strong>.</p>
                    }
                </>
                }

                {state.fetchingApplication &&
                <div className="wrap-system-msg">
                    <p className="system-msg system-msg--processing">Fetching application...</p>
                    <div className="sk-fading-circle">
                        <div className="sk-circle1 sk-circle"></div>
                        <div className="sk-circle2 sk-circle"></div>
                        <div className="sk-circle3 sk-circle"></div>
                        <div className="sk-circle4 sk-circle"></div>
                        <div className="sk-circle5 sk-circle"></div>
                        <div className="sk-circle6 sk-circle"></div>
                        <div className="sk-circle7 sk-circle"></div>
                        <div className="sk-circle8 sk-circle"></div>
                        <div className="sk-circle9 sk-circle"></div>
                        <div className="sk-circle10 sk-circle"></div>
                        <div className="sk-circle11 sk-circle"></div>
                        <div className="sk-circle12 sk-circle"></div>
                    </div>
                </div>

                }

                {state.fetchingApplicationError &&
                <div className="wrap-system-msg">
                    <p className="system-msg system-msg--error">Error while fetching application</p>
                    <button className='next' onClick={() => dispatch({type: 'RETRY'})}>Try Again</button>
                </div>
                }
            </div>
        </>
    )
};