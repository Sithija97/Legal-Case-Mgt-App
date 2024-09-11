import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  _id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

const courtCaseSchema = z.object({
  id: z.string(), // Firestore document ID (assumed to be a string)
  NextDate: z.string(),
  CourtHouse: z.string(),
  Year: z.number(),
  FirstDefendantName: z.string(),
  FiledOn: z.string(),
  Nature: z.string(),
  PreviousDate: z.string(),
  Value: z.string(),
  label: z.string(),
  PreviousStep: z.string(),
  NextStep: z.string(),
  Remark: z.string(),
  CaseNumber: z.string(),
  FacilityNumber: z.string(),
  SupportDate: z.string(),
  CompanyName: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type Case = z.infer<typeof courtCaseSchema>;
