import 'whatwg-fetch';
import {usePendingFetch, useAsyncRun} from "./lib";

export const useFetchApplication = (token, onResult, deps) => {
    const task = usePendingFetch(async () => {
        let response = await fetch(`/api/v1/rebate_forms/?jwt=${token}`);
        let json = await response.json();
        let fields = json.data.attributes.fields;

        return {
            full_name: fields.full_name,
            occupation: fields.occupation,
            address: fields.location,
            ratesBill: fields.total_rates,
            noOfDependants: fields.dependants,
            spouse_or_partner: (typeof fields.spouse_or_partner !== 'undefined') ? fields.spouse_or_partner === 'yes' : false,
            total_income: fields.income.total_income,
            income_less_than_5k: fields.income_less_than_5k,
            moved_within_rating_year: (typeof fields.moved_within_rating_year !== 'undefined') ? fields.moved_within_rating_year === 'yes' : false,
            lived_in_property_1_July: (typeof fields.lived_in_property_1_July !== 'undefined') ? fields.lived_in_property_1_July === 'yes' : false,
        };
    }, deps);

    useAsyncRun(task, onResult);

    return task;
};

export const useSubmitApplication = (state, onResult, deps) => {
    const task = usePendingFetch(async () => {
        const {
            token, 
            signatureApplicant, 
            signatureWitness, 
            application, 
            witness
        } = state;

        let data = {
            "data": {
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
                        "name": witness.name,
                        "role": witness.occupation,
                        "type": "witness"
                    }
                ]
            }
        };

        let response = await fetch(`/api/v1/rebate_forms/sign`,{
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data),
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
