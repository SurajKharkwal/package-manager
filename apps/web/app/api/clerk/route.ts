import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@workspace/db";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  //console.log("Webhook payload:", body);

  // Handle the User data
  if (eventType === "user.created") {
    const { first_name, last_name, email_addresses, image_url, phone_numbers } =
      evt.data;

    const noOfUser = await prisma.account.count();

    try {
      const clerk = await clerkClient();
      await clerk.users.updateUserMetadata(String(id), {
        publicMetadata: {
          role: noOfUser ? "MANAGER" : "ADMIN",
        },
      });
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong");
    }
    if (!email_addresses[0]?.email_address) throw new Error("Enmail not found");

    await prisma.account.create({
      data: {
        userId: id,
        name: `${first_name} ${last_name}`,
        email: email_addresses[0]?.email_address,
        mobileNo: phone_numbers.length
          ? Number(phone_numbers[0]?.phone_number)
          : null,
        imagePath: image_url,
        role: noOfUser ? "MANAGER" : "ADMIN",
      },
    });
  }

  if (eventType === "user.deleted") {
    await prisma.account.delete({
      where: {
        userId: id,
      },
    });
  }

  return new Response("Webhook received", { status: 200 });
}
