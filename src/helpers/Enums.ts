import { registerEnumType } from "type-graphql";

/**
 * This file contains the defined enumerations that we will define for our data.
 */

enum Gender {
    Male,
    Female,
    Other
}

enum EthicOrigin {
    White,
    HispanicLatino,
    Black,
    NativeAmerica,
    AsianPacIslander,
    Other    
}

enum Education {
    LessThenHighSchool,
    HighSchoolDiploma,
    NoDegree,
    AssociatesDegree,
    BachelorsDegree,
    MastersDegree,
    DoctoralDegree,
    ProfessionalDegree
}

enum Household {
    Unmarried,
    Married,
    Widowed,
    Divorced,
    Separated
}

enum Employment {
    EmployedFull,
    EmployedPart,
    EmployedSelf,
    Unemployed,
    Homemaker,
    Student,
    Military,
    Retired
}

enum Usage {
    ImproveHabits,
    Introspection,
    DailyTasks,
    CreativeWork,
    TechnicalWork,
    ProfessionalWork
}

registerEnumType(Gender, {
    name: "Gender"
})


registerEnumType(EthicOrigin, {
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