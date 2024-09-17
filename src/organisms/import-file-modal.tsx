import React from "react";
import * as XLSX from "xlsx";
import { Button } from "../atoms/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../atoms/dialog";
import { CourtCase } from "@/types";
import { cleanString } from "@/utils";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useAppDispatch } from "@/store/store";
import { fetchCasesFromFirestore } from "@/pages";
import { Input } from "@/atoms/input";

type IProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ImportFileModal = ({ isOpen, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const [courtCases, setCourtCases] = React.useState<CourtCase[]>([]);

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
        label: cleanString(row[findHeader(row, "label") ?? ""]),
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

  const handleSubmit = async () => {
    // Firestore collection reference
    const courtCasesCollectionRef = collection(db, "courtCases");

    try {
      toast({
        title: "Uploading documents...",
        description: format(new Date(), "EEEE, MMMM do, yyyy 'at' h:mm a"),
        duration: 6000,
      });

      // Use `Promise.all` to ensure all cases are added before showing the toast
      await Promise.all(
        courtCases.map(async (item: CourtCase) => {
          await addDoc(courtCasesCollectionRef, item);
        })
      );

      toast({
        title: "Documents successfully written.",
        description: format(new Date(), "EEEE, MMMM do, yyyy 'at' h:mm a"),
        duration: 1500,
      });

      // Fetch the latest cases from Firestore
      fetchCasesFromFirestore(dispatch);

      // Close the modal (if that's the intent)
      onClose();
    } catch (error) {
      console.log("Error writing document: ", error);
      toast({
        variant: "destructive",
        title: "Sorry, an error occurred!",
        description: `Error: ${error}`,
        duration: 1500,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md xl:max-w-fit">
        <DialogHeader>
          <DialogTitle>Import Files</DialogTitle>
          <DialogDescription>
            Easily upload and manage your data by importing files directly into
            the system for seamless processing.
          </DialogDescription>
        </DialogHeader>

        <div className="grid w-full max-w-md items-center gap-1.5">
          <Input
            id="file"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
        </div>

        {/* <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} /> */}

        <DialogFooter className="sm:justify-start">
          <Button
            type="submit"
            variant="default"
            className="ml-auto bg-blue-800 hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Import
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={onClose}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
