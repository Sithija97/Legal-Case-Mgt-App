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
import { MODAL_TYPE } from "@/enums";
import { CourtCaseWithId } from "@/types";
import { useEffect, useState } from "react";

type IProps = {
  isOpen: boolean;
  data?: any;
  type?: MODAL_TYPE;
  onClose: () => void;
};

export const AddCaseModal = ({ isOpen, data, type, onClose }: IProps) => {
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
  const [position, setPosition] = useState("bottom");

  useEffect(() => {
    setFormData({ ...data });

    return () => {
      setFormData(initialState);
    };
  }, []);

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

        <div className="flex flex-col w-full gap-2">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Input
                type="text"
                placeholder="Case No."
                name="CaseNumber"
                value={formData.CaseNumber}
                disabled
              />
            </div>
            <div className="w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
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
                    <DropdownMenuRadioItem value="top">
                      Top
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">
                      Bottom
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">
                      Right
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <Input
                type="text"
                placeholder="Nature"
                name="Nature"
                value={formData.Nature}
                disabled
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Year"
                name="Year"
                value={formData.Year}
                disabled
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Court House"
                name="CourtHouse"
                value={formData.CourtHouse}
                disabled
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Company"
                name="CompanyName"
                value={formData.CompanyName}
                disabled
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
              // onClick={handleSubmit}
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
