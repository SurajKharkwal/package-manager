"use client"
import { motion } from "framer-motion"
import { CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingCards() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      billing: "forever",
      description: "Perfect for trying out Package Manager",
      features: ["Up to 100 QR codes", "Basic dashboard", "1 user account", "Email support"],
      cta: "Get Started",
      popular: false,
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
    },
  ]

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
            plan.popular ? "border-2 border-primary ring-4 ring-primary/20" : "border border-border"
          }`}
        >
          {plan.popular && (
            <div className="bg-primary text-primary-foreground text-center py-2 font-medium">Most Popular</div>
          )}
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              <span className="text-muted-foreground ml-2">/{plan.billing}</span>
            </div>
            <p className="text-muted-foreground mb-6">{plan.description}</p>
            <Button
              className={`w-full mb-6 ${plan.popular ? "bg-primary" : ""}`}
              variant={plan.popular ? "default" : "outline"}
            >
              {plan.cta}
            </Button>
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
  )
}
