import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class DataService {

    constructor() { }

    dynamicData() {
        return of({
            "Jan": {
                "adultmale": "900",
                "adultfemale": "1000.23",
                "childmale": "1000.23",
                "childfemale": "1000.23"
            },
            "Feb": {
                "adultmale": "700",
                "adultfemale": "1000.23",
                "childmale": "1000.23",
                "childfemale": "1000.23"
            },
            "Mar": {
                "adultmale": "600",
                "adultfemale": "1000.23",
                "childmale": "1000.23",
                "childfemale": "1000.23"
            },
            "Apr": {
                "adultmale": "900",
                "adultfemale": "1000.23",
                "childmale": "1000.23",
                "childfemale": "1000.23"
            },
            "May": {
                "adultmale": "900",
                "adultfemale": "1000.23",
                "childmale": "1000.23",
                "childfemale": "1000.23"
            }

        });
    }


    dynamicDataYearly() {
        return of({
            "2017": {
                "adultmale": "1200",
                "adultfemale": "900",
                "childmale": "1000",
                "childfemale": "700"
            },
            "2018": {
                "adultmale": "700",
                "adultfemale": "1000.23",
                "childmale": "1000.23",
                "childfemale": "1000.23"
            },
            "2019": {
                "adultmale": "600",
                "adultfemale": "1000.23",
                "childmale": "1000.23",
                "childfemale": "1000.23"
            },
            "2020": {
                "adultmale": "900",
                "adultfemale": "1000.23",
                "childmale": "1000.23",
                "childfemale": "1000.23"
            }

        });
    }

}