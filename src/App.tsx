import React, { useState } from "react";
import * as XLSX from "xlsx";
import { CourtCase } from "./types";
import { cleanString } from "./utils";
import { Button } from "./atoms/button";

function App() {
  const [courtCases, setCourtCases] = useState<CourtCase[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const binaryStr = event.target?.result as string;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Assuming data is in the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Parse the worksheet into a JSON array
      const data = XLSX.utils.sheet_to_json(worksheet);

      // Log raw data and headers to inspect them
      console.log("Raw Data:", data);

      // Function to find the correct header key dynamically
      const findHeader = (
        row: any,
        expectedHeader: string
      ): string | undefined => {
        return Object.keys(row).find(
          (key) =>
            cleanString(key).toLowerCase() === expectedHeader.toLowerCase()
        );
      };

      // Map the data to the CourtCase type and clean the strings
      const cases: CourtCase[] = (data as any[]).map((row) => ({
        Nature: cleanString(row[findHeader(row, "Nature") ?? ""]),
        CompanyName: cleanString(row[findHeader(row, "Company Name") ?? ""]),
        Year: row[findHeader(row, "Year") ?? ""] || 0,
        CaseNumber: cleanString(row[findHeader(row, "Case Number") ?? ""]),
        CourtHouse: cleanString(row[findHeader(row, "Court House") ?? ""]),
        FacilityNumber: cleanString(
          row[findHeader(row, "Facility Number") ?? ""]
        ),
        Value: cleanString(row[findHeader(row, "Value (Rs.)") ?? ""]),
        FirstDefendantName: cleanString(
          row[findHeader(row, "1st Defendant Name -Principal Borrower") ?? ""]
        ),
        FiledOn: cleanString(row[findHeader(row, "Filed On") ?? ""]),
        SupportDate: cleanString(row[findHeader(row, "Support Date") ?? ""]),
        PreviousDate: cleanString(row[findHeader(row, "Previous Date") ?? ""]),
        PreviousStep: cleanString(row[findHeader(row, "Previous Step") ?? ""]),
        NextDate: cleanString(row[findHeader(row, "Next Date") ?? ""]),
        NextStep: cleanString(row[findHeader(row, "Next Step") ?? ""]),
        Remark: cleanString(row[findHeader(row, "Remark") ?? ""]),
      }));

      setCourtCases(cases);
      console.log("Final Output:", cases); // Logs the cleaned array of CourtCase objects
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = () => {
    console.log(courtCases);
  };

  return (
    <>
      <div>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <Button variant="outline" type="button" onClick={handleSubmit}>
          Console Data
        </Button>
        {courtCases.map((data: CourtCase, index) => (
          <p key={index}>{data.CaseNumber}</p>
        ))}
      </div>
    </>
  );
}

export default App;