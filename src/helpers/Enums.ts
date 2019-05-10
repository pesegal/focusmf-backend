import { registerEnumType } from "type-graphql";

/**
 * This file contains the defined enumerations that we will define for our data.
 */

export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

export enum EthnicOrigin {
    White = "White",
    HispanicLatino = "HispanicLatino",
    Black = "Black",
    NativeAmerica = "NativeAmerican",
    AsianPacificIslander = "AsiaPacificIslander",
    Other = "Other"   
}

export enum Education {
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
    Unmarried = "Unmarried",
    Married = "Married",
    Widowed = "Widowed",
    Divorced = "Divorced",
    Separated = "Separated"
}

export enum Employment {
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
    ImproveHabits = "ImproveHabits",
    Introspection = "Introspection",
    DailyTasks = "DailyTasks",
    CreativeWork = "CreativeWork",
    TechnicalWork = "TechnicalWork",
    ProfessionalWork = "ProfessionalWork"
}

registerEnumType(Gender, {
    name: "Gender",
    description: "User's identified gender."
})


registerEnumType(EthnicOrigin, {
    name: "EthnicOrigin",
    description: "User's identified ethnic ancestry."
})

registerEnumType(Education, {
    name: "Education",
    description: "User's identified educational achievement level."
})

registerEnumType(Household, {
    name: "Household",
    description: "User's identified household status."
})

registerEnumType(Employment, {
    name: "Employement",
    description: "User's identified level of employment."
})

registerEnumType(Usage, {
    name: "Usage",
    description: "User's identified reason for sign-up."
})