import { IUser } from './IUser';
import { ICase } from './ICase';

export interface ICounty{
    name: string;
    volunteers: IUser[];
    cases: ICase[];
}