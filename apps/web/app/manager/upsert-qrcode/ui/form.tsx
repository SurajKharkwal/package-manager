"use client";

import { Button } from "@workspace/ui/components/button";
import { QRCodeCanvas } from "qrcode.react";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { useState } from "react";
import { toast } from "sonner";
import { upsertQrcode } from "@/actions/upsert-qrcode";
import { FormProvider, useForm } from "react-hook-form";

const Spinner = () => (
  <div className="w-5 h-5 border-2 border-muted border-t-black animate-spin rounded-full"></div>
);

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name too short" })
    .max(20, { message: "Exceeds 20 characters" }),
  costPrice: z.coerce
    .number()
    .min(0, { message: "Cost price must be a positive number" }),
  sellingPrice: z.coerce
    .number()
    .min(0, { message: "Selling price must be a positive number" }),
  description: z
    .string()
    .min(5, { message: "Description too short" })
    .max(200, { message: "Exceeds 200 characters" }),
});

type FormType = z.infer<typeof formSchema>;
export default function QrcodeForm({
  code = "",
  name = "",
  description = "",
  costPrice = 0,
  sellingPrice = 0,
}) {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: { name, description, costPrice, sellingPrice },
  });

  const [qrCode, setQrCode] = useState<string>(code);

  async function onSubmit(values: FormType) {
    const result = await upsertQrcode(code, values);
    setQrCode(result.code);
    toast("Qrcode was" + code ? "updated" : "generated", {
      description: new Date().toUTCString(),
    });
  }

  return (
    <div className="w-full container h-full grid xl:grid-cols-2 p-4">
      <section className="md:p-4">
        <h1 className="text-3xl font-bold py-4">
          {code ? "Update Qrcode" : "Generate Qrcode"}
        </h1>

        <FormProvider {...form}>
          <form
            className="flex flex-col gap-8 md:m-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be displayed on the QR code label.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cost & Selling Price */}
            <section className="flex space-x-3">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="costPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter cost price..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The price at which the product was purchased.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="sellingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selling Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter selling price..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The price at which you want to sell the product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-28 text-xl"
                      placeholder="Enter product description..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a short but clear description of the product. This
                    will help users understand the product before scanning the
                    QR code.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="mx-auto md:mr-auto max-md:mb-4 flex items-center gap-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Spinner />
                  Loading...
                </>
              ) : form.formState.isSubmitSuccessful ? (
                "Submitted!"
              ) : code !== "" ? (
                "Update Qrcode"
              ) : (
                "Generate Qrcode"
              )}
            </Button>
          </form>
        </FormProvider>
      </section>

      {/* QR Code Placeholder */}
      <aside className="flex items-center flex-col md:py-28">
        <div className="border-dashed aspect-square w-96 border-2 flex items-center justify-center rounded-2xl">
          {qrCode ? (
            <QRCodeCanvas value={qrCode} size={256} className="p-4" />
          ) : (
            <span className="text-center w-60 text-xl">
              QR Code will be generated once you fill the form
            </span>
          )}
        </div>

        {qrCode && (
          <Button
            className="m-6"
            onClick={() => {
              const canvas = document.querySelector("canvas");
              if (canvas) {
                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = "qrcode.png";
                link.click();
              }
            }}
          >
            Download QR Code
          </Button>
        )}
      </aside>
    </div>
  );
}
