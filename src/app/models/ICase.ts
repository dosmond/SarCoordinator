import { IUser } from './IUser';

export interface ICase {
    description: string;
    equipmentUsed: string[];
    missingPersonName: string;
    reporterName: string;
    volunteers: IUser[];
    date: Date;
}