"use client";
import { useEffect, useState } from "react";
import { DataTable } from "./ui/data-table";
import { Button } from "@workspace/ui/components/button";
import { ArrowRightLeft } from "lucide-react";
import { sumbitAllEntries } from "@/actions/submit-qrcode";

export type ItemType = {
  code: string;
  noOfItemIn: number;
  noOfItemOut: number;
  status: "pending" | "processing" | "success" | "failed";
};

export default function Page() {
  const [data, setData] = useState<ItemType[]>([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("scannedItems") || "[]");
    setData(storedData);
  }, []);
  const handleSubmitAll = async () => {
    const newData = (await sumbitAllEntries(data)) as ItemType[];
    setData(newData);
    localStorage.setItem("scannedItems", JSON.stringify([]));
  };

  const removeItem = (code: string) => {
    const newData = data.filter((item) => item.code !== code);
    setData(newData);
    localStorage.setItem("scannedItems", JSON.stringify(newData));
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">QR Code Entries</h2>
          <p className="text-muted-foreground">
            Create and manage QR code entries from the crew side before
            submitting them to the database.
          </p>
        </div>
        <Button onClick={handleSubmitAll} disabled={!data.length}>
          <ArrowRightLeft /> Submit All
        </Button>
      </div>
      <DataTable data={data} removeItem={removeItem} />
    </div>
  );
}
