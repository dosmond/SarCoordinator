
import { ICaseIds } from './ICaseIds';

export interface IVolunteer {
    name : string;
    badgeNumber: string;
    uid: string;
    role: string;
    phoneNumber: number;
    currentCounty: string;
    userDocId: string;
    cases: ICaseIds;
}
