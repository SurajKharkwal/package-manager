import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center p-8">
      <header className="text-center mb-8">
        <h3 className="text-5xl font-bold">Plans and Pricing</h3>
        <p className="text-muted-foreground">For more details, contact me.</p>
        <Link href="mailto:kharkwalsuraj13@gmail.com">Contact</Link>
      </header>
      <section className="w-full flex flex-wrap gap-8 items-center justify-center">
        <Card className="max-w-80 w-full">
          <CardHeader>
            <CardTitle>Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> Limited Database
                Access
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> Basic Support
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> Trial Period
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="mailto:kharkwalsuraj13@gmail.com">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="max-w-80 w-full">
          <CardHeader>
            <CardTitle>Monthly</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> Full Database
                Access
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> Personal Assistant
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> Priority Support
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="mailto:kharkwalsuraj13@gmail.com">Subscribe</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="max-w-80 w-full">
          <CardHeader>
            <CardTitle>Custom</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> Tailored Database
                Access
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> Dedicated Account
                Manager
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> 24/7 Premium
                Support
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="mailto:kharkwalsuraj13@gmail.com">Contact Us</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
