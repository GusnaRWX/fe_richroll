export declare namespace Tax {
  interface ItpBasicDetailParams {
    componentName: string;
    country: string;
    province: string;
    city: string;
    subDistrict: string;
    citation: string;
    internalNotes: string;
    externalNotes: string;
  }

  interface ItpDtaParams {
    bank: string,
    holder: string,
    no: string,
    bankCode: string,
    branchCode: string,
    branchName: string,
    swiftCode: string,
    notes: string,
  }

  interface ItpRatesFactorUnitSubConditionParams {
    condition: string,
    subName: string,
    subAmount: string,
  }

  interface ItpRatesFactorUnitParams {
    condition: string,
    factorUnitName: string,
    subCondition: ItpRatesFactorUnitSubConditionParams[],
  }

  interface ItpRatesParams {
    type: boolean,
    deductableCondition: string,
    amount: string,
    factorUnitCondition: ItpRatesFactorUnitParams[],
  }
}