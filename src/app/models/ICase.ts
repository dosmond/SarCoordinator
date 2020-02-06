import { IUser } from './IUser';

export interface ICase {
    caseId : string;
    description: string;
    equipmentUsed: string[];
    missingPersonName: string;
    reporterName: string;
    volunteers: IUser[];
    date: string;
    isOpen: boolean;
    status: string;
}