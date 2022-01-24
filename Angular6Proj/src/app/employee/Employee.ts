import {Skills} from './Skills';

export interface Employee{
	id:number;
	fullName:string;
	email:string;
	skills:Skills[];
}