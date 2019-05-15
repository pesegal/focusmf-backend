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
    HispanicLatino = "Hispanic Latino",
    Black = "Black",
    NativeAmerica = "Native American",
    AsianPacificIslander = "Asian / Pacific Islander",
    Other = "Other"
}

export enum Education {
    LessThanHighSchool = "Less Than High School",
    HighSchoolDiploma = "High School Diploma",
    NoDegree = "No Degree",
    AssociatesDegree = "Associates Degres",
    BachelorsDegree = "Batchelors Degree",
    MastersDegree = "Masters Degree",
    DoctoralDegree = "Doctoral Degree",
    ProfessionalDegree = "Professional Degree"
}

export enum Household {
    Unmarried = "Unmarried",
    Married = "Married",
    Widowed = "Widowed",
    Divorced = "Divorced",
    Separated = "Separated"
}

export enum Employment {
    EmployedFull = "Employed Full",
    EmployedPart = "Employed Part",
    EmployedSelf = "Employed Self",
    Unemployed = "Unemployed",
    Homemaker = "Homemaker",
    Student = "Student",
    Military = "Military",
    Retired = "Retired"
}

export enum Usage {
    ImproveHabits = "Improve Habits",
    Introspection = "Introspection",
    DailyTasks = "Daily Tasks",
    CreativeWork = "Creative Work",
    TechnicalWork = "Technical Work",
    ProfessionalWork = "Professional Work"
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
