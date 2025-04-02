import { generateEntries } from "./entries";

 
export async function GET (request : Request) {
   await generateEntries()
   return new Response("Data generated successfully")
}
