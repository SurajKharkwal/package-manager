"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import DialogBox from "./dialog-box";

export default function Scanner ({cameraId, cameraLabel}: {cameraId: string, cameraLabel: string}) {
  const [ showDialog , setShowDialog ] = useState(false)
  const [ code ,setCode ] = useState("");

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scanner
      .start(
        cameraId,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setCode(decodedText)
          setShowDialog(true)
        },
        () => {},
      )
      .catch((err) => console.log(err));

    return () => {
      scanner.clear();
    };
  }, [cameraId]);
return (

      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="flex text-xl justify-between items-center">
            {cameraLabel?.toString()}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-4">
          <div id="reader" className="w-full max-w-[350px]"></div>
          <DialogBox qrcode={code} showDialog={showDialog} setShowDialog={setShowDialog}/>
        </CardContent>
      </Card>
  );
}
