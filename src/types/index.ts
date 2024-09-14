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

export type User = {
  id?: string;
  name: string;
  email: string;
  role: string;
  company: string;
};

export type InitialRootState = {
  totalCompanies: number;
  totalCases: number;
  totalOngoingCases: number;
  totalUsers: number;
};

export type InitialCaseState = {
  cases: any[];
};

export type InitialUsersState = {
  users: User[];
  loggedInUser: User | null;
};

export type InitialUserState = {
  name: string;
  email: string;
  role: string;
  company: string;
};
