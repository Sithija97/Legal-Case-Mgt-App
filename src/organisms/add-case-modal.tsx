import { Button } from "@/atoms/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/atoms/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/atoms/dropdown-menu";
import { Input } from "@/atoms/input";
import { Label } from "@/atoms/label";
import { db } from "@/config/firebase";
import { Labels } from "@/data/data";
import { MODAL_TYPE } from "@/enums";
import { toast } from "@/hooks/use-toast";
import { fetchCasesFromFirestore } from "@/pages";
import { useAppDispatch } from "@/store/store";
import { CourtCaseWithId } from "@/types";
import { format } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

type IProps = {
  isOpen: boolean;
  data?: any;
  type?: MODAL_TYPE;
  onClose: () => void;
};

export const AddCaseModal = ({ isOpen, data, type, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const initialState: CourtCaseWithId = {
    id: "",
    Nature: "",
    label: "",
    CompanyName: "",
    Year: 0,
    CaseNumber: "",
    CourtHouse: "",
    FacilityNumber: "",
    Value: "",
    FirstDefendantName: "",
    FiledOn: "",
    SupportDate: "",
    PreviousDate: "",
    PreviousStep: "",
    NextDate: "",
    NextStep: "",
    Remark: "",
  };

  const [formData, setFormData] = useState<CourtCaseWithId>(initialState);
  const [position, setPosition] = useState<string>(Labels[0]);

  useEffect(() => {
    setFormData({ ...data });
    setPosition(data.label);

    return () => {
      setFormData(initialState);
      setPosition(Labels[0]);
    };
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!formData.id) return; // Ensure the form has a valid ID before updating

    // Update the formData with the selected label
    const updatedFormData = {
      ...formData,
      label: position, // Use the updated label value
    };

    try {
      const caseRef = doc(db, "courtCases", updatedFormData.id);

      await updateDoc(caseRef, {
        label: updatedFormData.label,
        SupportDate: updatedFormData.SupportDate,
        PreviousDate: updatedFormData.PreviousDate,
        NextDate: updatedFormData.NextDate,
        PreviousStep: updatedFormData.PreviousStep,
        NextStep: updatedFormData.NextStep,
        Remark: updatedFormData.Remark,
      });

      fetchCasesFromFirestore(dispatch);

      toast({
        title: "Case updated successfully.",
        description: format(new Date(), "EEEE, MMMM do, yyyy 'at' h:mm a"),
        duration: 1500,
      });
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating case:", error);
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
          <DialogTitle>
            {type === MODAL_TYPE.EDIT ? "Edit Case" : "Add Case"}
          </DialogTitle>
          <DialogDescription>
            Create new user profiles by entering their details and assigning
            system access.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col w-full gap-2 space-y-1">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="caseNumber" className="text-xs">
                Case No.
              </Label>
              <Input
                id="caseNumber"
                type="text"
                placeholder="Case No."
                name="CaseNumber"
                value={formData.CaseNumber}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="facilityNumber" className="text-xs">
                Facility No.
              </Label>
              <Input
                id="facilityNumber"
                type="text"
                placeholder="Facility No."
                name="FacilityNumber"
                value={formData.FacilityNumber}
                disabled
              />
            </div>
            <div className="w-full mt-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full text-xs">
                    Select Label
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    {Labels.map((label, index) => (
                      <DropdownMenuRadioItem key={index} value={label}>
                        {label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <Label htmlFor="nature" className="text-xs">
                Nature
              </Label>
              <Input
                id="nature"
                type="text"
                placeholder="Nature"
                name="Nature"
                value={formData.Nature}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="year" className="text-xs">
                Year
              </Label>
              <Input
                id="year"
                type="text"
                placeholder="Year"
                name="Year"
                value={formData.Year}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="court" className="text-xs">
                Court
              </Label>
              <Input
                id="court"
                type="text"
                placeholder="Court House"
                name="CourtHouse"
                value={formData.CourtHouse}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="company" className="text-xs">
                Company
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="Company"
                name="CompanyName"
                value={formData.CompanyName}
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="supportDate" className="text-xs">
                Support Date
              </Label>
              <Input
                id="supportDate"
                type="text"
                placeholder="Support Date"
                name="SupportDate"
                value={formData.SupportDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="previousDate" className="text-xs">
                Previous Date
              </Label>
              <Input
                id="previousDate"
                type="text"
                placeholder="Previous Date"
                name="PreviousDate"
                value={formData.PreviousDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="nextDate" className="text-xs">
                Next Date
              </Label>
              <Input
                id="nextDate"
                type="text"
                placeholder="Next Date"
                name="NextDate"
                value={formData.NextDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid gap-3">
            <div>
              <Label htmlFor="previousStep" className="text-xs">
                Previous Step
              </Label>
              <Input
                id="previousStep"
                type="text"
                placeholder="Previous Step"
                name="PreviousStep"
                value={formData.PreviousStep}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="nextStep" className="text-xs">
                Next Step
              </Label>
              <Input
                id="nextStep"
                type="text"
                placeholder="Next Step"
                name="NextStep"
                value={formData.NextStep}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="remarks" className="text-xs">
                Remarks
              </Label>
              <Input
                id="remarks"
                type="text"
                placeholder="Next Date"
                name="Remark"
                value={formData.Remark}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          {type === MODAL_TYPE.EDIT ? (
            <Button
              type="submit"
              variant="default"
              className="ml-auto bg-blue-800 hover:bg-blue-700"
              onClick={handleUpdate}
            >
              Update
            </Button>
          ) : (
            <Button
              type="submit"
              variant="default"
              className="ml-auto bg-blue-800 hover:bg-blue-700"
              // onClick={handleSubmit}
            >
              Add
            </Button>
          )}
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
