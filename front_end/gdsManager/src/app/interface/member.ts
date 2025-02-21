export interface Member {
    memberId: number,
    memberUsername: string,
    memberPin: number | null,
    memberGender: GenderEnum,
    cardId: number,
    memberStartdate: string,
    memberEnddate: string,
    memberVirtualnumber: number,
    memberSipnumber: string,
    memberCalloutaccount: AccountEnum,
    memberCell: string,
    memberEmail: string,
    groupId: number,
    memberEnable: boolean,
    groupName?: string,
    cardNumber?: string
}

export enum GenderEnum{
    Male = 'Male',
    Female = 'Female'
}

export enum AccountEnum{
    Auto = "Auto",
    Account1 = "Account1",
    Account2 = "Account2",
    Account3 = "Account3",
    Account4 = "Account4"
}
