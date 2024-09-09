import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./App.css";

// Define the type for Excel data (adjust based on the structure of your Excel sheet)
interface ExcelRow {
  [key: string]: string | number; // Adjust based on the expected data type
}

function App() {
  const [excelData, setExcelData] = useState<ExcelRow[] | null>(null);

  // Handle file upload
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
      const data: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      console.log(data);
    };

    reader.readAsBinaryString(file);
  };

  // Handle data submit
  const handleDataSubmit = async (): Promise<void> => {
    if (!excelData) return;

    try {
      // await axios.post("/api/upload", { data: excelData });
      console.log(excelData);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data", error);
      alert("There was an error submitting the data.");
    }
  };

  return (
    <>
      <div>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        {excelData && <button onClick={handleDataSubmit}>Submit Data</button>}
      </div>
    </>
  );
}

export default App;
