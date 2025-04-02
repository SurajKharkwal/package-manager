import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";

type Props = {
  qrcode: string;
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
};

export default function DialogBox({
  qrcode,
  showDialog,
  setShowDialog,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [packageType, setPackageType] = useState<"IN" | "OUT">("IN");

  const handleSubmit = () => {
    const data = {
      code: qrcode,
      state: "pending",
      noOfItemIn: packageType === "IN" ? quantity : 0,
      noOfItemOut: packageType === "OUT" ? quantity : 0,
    };

    const storedData = JSON.parse(localStorage.getItem("scannedItems") || "[]");
    storedData.push(data);
    localStorage.setItem("scannedItems", JSON.stringify(storedData));
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scan Details</DialogTitle>
          <DialogDescription>
            Enter the number of items and select the package type.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              No of items
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <RadioGroup
            defaultValue="IN"
            onValueChange={(value) => setPackageType(value as "IN" | "OUT")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="IN" id="IN" />
              <Label htmlFor="IN">Package Received</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="OUT" id="OUT" />
              <Label htmlFor="OUT">Package Sold</Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
