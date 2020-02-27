import { IUser } from './IUser';

export interface ICase {
    id : string;
    caseName: string;
    description: string;
    equipmentUsed: string[];
    missingPersonName: string;
    reporterName: string;
    volunteers: IUser[];
    date: any;
    isOpen: boolean;
    caseStatus: string;
    days: number;
}
