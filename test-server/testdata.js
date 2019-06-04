
module.exports.application = {
    "data": {
        "id": "1",
        "type": "rebate_forms",
        "attributes": {
            "valuation_id": "XF9WADUR1MD8D41LM",
            "token": "",
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
                    "total_income": 1234567,
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

module.exports.postResponse = {
    "data": [
        {
            "id": "62",
            "type": "signatures",
            "attributes": {
                "name": "namerrr",
                "role": "the best",
                "image": "imageeo"
            },
            "relationships": {
                "signature_type": {
                    "meta": {
                        "included": false
                    }
                }
            }
        },
        {
            "id": "63",
            "type": "signatures",
            "attributes": {
                "name": "n2amerrr",
                "role": "t2he best",
                "image": "i2mageeo"
            },
            "relationships": {
                "signature_type": {
                    "meta": {
                        "included": false
                    }
                }
            }
        }
    ],
    "meta": {},
    "jsonapi": {
        "version": "1.0"
    }
};