import 'whatwg-fetch';
import {usePendingFetch, useAsyncRun} from "./lib";

export const useFetchApplication = (token, onResult, deps) => {
    const task = usePendingFetch(async () => {
        let response = await fetch(`http://localhost:3001/api/v1/rebate_forms/?jwt=${token}`);
        let json = await response.json();

        return {
            full_name: json.data.attributes.fields.full_name,
            occupation: json.data.attributes.fields.occupation,
            address: json.data.attributes.fields.location,
            ratingYear: 'TODO RATING YEAR',
            taxYear: 'TODO TAX YEAR',
            ratesBill: json.data.attributes.fields.total_rates,
            noOfDependants: json.data.attributes.fields.dependants,
            spouse_or_partner: json.data.attributes.fields.spouse_or_partner === 'yes',
            total_income: json.data.attributes.fields.income.total_income,
            rebateClaim: 'TODO REBATE CLAIM',
            moved_within_rating_year: json.data.attributes.fields.moved_within_rating_year === 'yes',
            witnessName: 'TODO WITNESS NAME',
            witnessLocation: 'TODO WITNESS LOCATION',
            witnessOccupation: 'TODO WITNESS OCCUPATION'
        };
    }, deps);

    useAsyncRun(task, onResult);

    return task;
};

export const useSubmitApplication = (state, onResult, deps) => {
    const task = usePendingFetch(async () => {
        const {token, signatureApplicant, signatureWitness, application} = state;

        let data = {
            "token": `${token}`,
            "signatures": [
                {
                    "image": signatureApplicant,
                    "name": application.full_name,
                    "role": application.occupation,
                    "type": "applicant"
                },
                {
                    "image": signatureWitness,
                    "name": application.witnessName,
                    "role": application.witnessOccupation,
                    "type": "witness"
                }
            ]
        };

        let response = await fetch(`http://localhost:3001/api/v1/rebate_forms/?jwt=${token}`,{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        });

        return await response.json();
    }, deps);

    useAsyncRun(task, onResult);

    return task;
};