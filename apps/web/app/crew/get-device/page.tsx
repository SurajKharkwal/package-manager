"use client";

import { CameraDevice, Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { Label } from "@workspace/ui/components/label";

export default function GetDevice() {
  const [devices, setDevices] = useState<CameraDevice[] | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((availableDevices) => {
        if (availableDevices.length === 0) {
          const firstDevice = availableDevices[0];
          if (firstDevice) {
            router.push(
              `/crew/scan-qrcode?cameraId=${encodeURIComponent(firstDevice.id)}&cameraLabel=${encodeURIComponent(firstDevice.label ?? "Unknown")}`,
            );
          }
        } else if (availableDevices.length > 0) {
          setDevices(availableDevices);
        } else {
          setError("No camera devices found.");
          setDevices([]); // Prevent infinite loading
        }
      })
      .catch(() => {
        setError("Failed to access camera devices.");
        setDevices([]); // Prevent infinite loading
      });
  }, [router]);

  const handleSelectCamera = (value: string) => {
    const selectedCamera = devices?.find((device) => device.id === value);
    if (selectedCamera) {
      router.push(
        `/crew/scan-qrcode?cameraId=${encodeURIComponent(selectedCamera.id)}&cameraLabel=${encodeURIComponent(selectedCamera.label ?? "Unknown")}`,
      );
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Select a Camera</h2>

      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : devices === null ? (
        <p className="text-center text-gray-500">
          Loading available cameras...
        </p>
      ) : devices.length > 0 ? (
        <Card>
          <CardContent className="p-4">
            <RadioGroup
              onValueChange={handleSelectCamera}
              className="space-y-3"
            >
              {devices.map((device) => (
                <div key={device.id} className="flex items-center space-x-2">
                  <RadioGroupItem id={device.id} value={device.id} />
                  <Label htmlFor={device.id} className="cursor-pointer">
                    {device.label || `Camera ${device.id}`}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
