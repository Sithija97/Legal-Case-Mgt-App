export type CourtCase = {
  Nature: string;
  label: string;
  CompanyName: string;
  Year: number;
  CaseNumber: string;
  CourtHouse: string;
  FacilityNumber: string;
  Value: string;
  FirstDefendantName: string;
  FiledOn: string;
  SupportDate: string;
  PreviousDate: string;
  PreviousStep: string;
  NextDate: string;
  NextStep: string;
  Remark: string;
};

export type CourtCaseWithId = CourtCase & { id: string };

export type InitialCaseState = {
  cases: any[];
};
