import { IUser } from './IUser';

export interface ICase {
    id : string;
    countyId: string;
    caseName: string;
    caseNumber: string;
    description: string;
    equipmentUsed: string[];
    missingPersonName: string;
    reporterName: string;
    reporterPhone: string;
    volunteers: IUser[];
    date: any;
    isOpen: boolean;
    caseStatus: string;
    days: number;
}
