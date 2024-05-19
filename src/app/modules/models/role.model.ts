export enum RoleName {
    TECHER, PRINCIPAL, DEVELOPER 
    }
 


export class Role {
      
    name: RoleName;
    isPrincipal:boolean;
    enterWorking:Date;
    constructor(
        name: RoleName,
        isPrincipal:boolean,
        enterWorking:Date
    ) {
       
        this.name = name;
        this.isPrincipal=isPrincipal;
        this.enterWorking=enterWorking;
    }
}
