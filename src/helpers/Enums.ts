import { registerEnumType } from "type-graphql";

/**
 * This file contains the defined enumerations that we will define for our data.
 */

export enum Gender {
    Undefined = "",
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

export enum EthnicOrigin {
    Undefined = "",
    White = "White",
    HispanicLatino = "HispanicLatino",
    Black = "Black",
    NativeAmerica = "NativeAmerican",
    AsianPacificIslander = "AsiaPacificIslander",
    Other = "Other"   
}

export enum Education {
    Undefined = "",
    LessThenHighSchool = "LessThenHighSchool",
    HighSchoolDiploma = "HighSchoolDiploma",
    NoDegree = "NoDegree",
    AssociatesDegree = "AssociatesDegres",
    BachelorsDegree = "BatchelorsDegree",
    MastersDegree = "MastersDegree",
    DoctoralDegree = "DoctoralDegree",
    ProfessionalDegree = "ProfessionalDegree"
}

export enum Household {
    Undefined = "",
    Unmarried = "Unmarried",
    Married = "Married",
    Widowed = "Widowed",
    Divorced = "Divorced",
    Separated = "Separated"
}

export enum Employment {
    Undefined = "",
    EmployedFull = "EmployedFull",
    EmployedPart = "EmployedPart",
    EmployedSelf = "EmployedSelf",
    Unemployed = "Unemployed",
    Homemaker = "Homemaker",
    Student = "Student",
    Military = "Military",
    Retired = "Retired"
}

export enum Usage {
    Undefined = "",
    ImproveHabits = "ImproveHabits",
    Introspection = "Introspection",
    DailyTasks = "DailyTasks",
    CreativeWork = "CreativeWork",
    TechnicalWork = "TechnicalWork",
    ProfessionalWork = "ProfessionalWork"
}

registerEnumType(Gender, {
    name: "Gender"
})


registerEnumType(EthnicOrigin, {
    name: "Ethnic Origin"
})

registerEnumType(Education, {
    name: "Education"
})

registerEnumType(Household, {
    name: "Household Status"
})

registerEnumType(Employment, {
    name: "Employement Level"
})

registerEnumType(Usage, {
    name: "Primary Usage Reason"
})