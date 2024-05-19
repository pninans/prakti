import { Role } from "./role.model";

export enum Type {
    MALE, FEMALE
    }   
          
   export class Employee {
       id:number;
       firstName: string;
       lastName: string;
       typeEmployee: Type;
       tz:string;
       startWork:Date;
       birthDate:Date;
       roles:Role[];
       constructor(
           id:number,
           firstName: string,
           lastName: string,
           typeEmployee: Type,
           tz: string ,
           startWork:Date,
           birthDate:Date,
           roles:Role[] 
       ) {
           this.id=id;
           this.firstName = firstName;
           this.lastName = lastName;
           this.typeEmployee = typeEmployee;
           this.tz = tz;
           this.startWork=startWork;
           this.birthDate=birthDate;
           this.roles=roles;
       }
   }
   