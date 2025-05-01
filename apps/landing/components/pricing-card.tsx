"use client";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function PricingCards() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      billing: "forever",
      description: "Perfect for trying out Inventory Manager",
      features: ["Read Only privlages", "Access to few Pages only"],
      cta: "Get Started",
      popular: false,
      url: "https://pck-mgr-web.vercel.app/manager/dashboard",
    },
    {
      name: "Pro",
      price: "$29",
      billing: "per month",
      description: "Ideal for small to medium businesses",
      features: [
        "Unlimited QR codes",
        "Advanced dashboard",
        "Up to 10 user accounts",
        "Team management",
        "Priority email support",
        "API access",
      ],
      cta: "Start Free Trial",
      popular: true,
      url: "mailto:kharkwalsuraj13@gmail.com",
    },
    {
      name: "Enterprise",
      price: "$99",
      billing: "per month",
      description: "For large organizations with complex needs",
      features: [
        "Everything in Pro",
        "Unlimited user accounts",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "Advanced security features",
      ],
      cta: "Contact Sales",
      popular: false,
      url: "mailto:kharkwalsuraj13@gmail.com",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`bg-card rounded-xl shadow-lg overflow-hidden ${
            plan.popular
              ? "border-2 border-primary ring-4 ring-primary/20"
              : "border border-border"
          }`}
        >
          {plan.popular && (
            <div className="bg-primary text-primary-foreground text-center py-2 font-medium">
              Most Popular
            </div>
          )}
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              <span className="text-muted-foreground ml-2">
                /{plan.billing}
              </span>
            </div>
            <p className="text-muted-foreground mb-6">{plan.description}</p>
            <Link
              href={plan.url}
              className={cn(
                buttonVariants({ variant: "default" }),
                `w-full mb-6 ${plan.popular ? "bg-primary" : ""}`,
              )}
            >
              {plan.cta}
            </Link>
            <ul className="space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
