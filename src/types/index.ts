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

export type CasesCountByLabel = {
  CHC: number;
  DNMA: number;
  MC_Matters: number;
  Ongoing: number;
  Outstation: number;
  Settled: number;
  Withdrawn: number;
};

export type InitialRootState = {
  totalCompanies: number;
  totalCases: number;
  totalOngoingCases: number;
  totalUsers: number;
  totalOngoingCasesData: CourtCaseWithId[] | any;
  casesCountByLabel: CasesCountByLabel | any;
  isDashboardDataLoading: boolean;
  isDashboardDataError: string | null;
};

export type InitialCaseState = {
  cases: any[];
  selectedCase: CourtCaseWithId | null;
  isCasesDataLoading: boolean;
  isCasesDataError: string | null;
};

export type InitialUsersState = {
  users: User[];
  loggedInUser: User | null;
  selectedUser: User | null;
  isUsersDataLoading: boolean;
  isUsersDataError: string | null;
};

export type InitialUserState = {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
};
