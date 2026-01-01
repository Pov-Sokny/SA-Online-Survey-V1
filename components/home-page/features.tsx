import { Card } from "@/components/ui/card"
import { Shield, Zap, Layout } from "lucide-react"

const features = [
  {
    title: "Automated Execution",
    description: "Streamline fixed income trading with automated execution workflows built for modern platforms.",
    icon: <Zap className="w-12 h-12 text-primary/40" />,
  },
  {
    title: "Risk Management",
    description: "Create custom risk policies, monitor open orders, and take control of your fixed income exposure.",
    icon: <Shield className="w-12 h-12 text-primary/40" />,
  },
  {
    title: "Custom Strategies",
    description:
      "Build ladders, automate reinvestment & rebalancing, and deliver personalized fixed income portfolios.",
    icon: <Layout className="w-12 h-12 text-primary/40" />,
  },
]

export function Features() {
  return (
    <section className="px-6 pb-32 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="p-8 border-none bg-card hover:bg-card/80 transition-colors flex flex-col items-start gap-8 group"
          >
            <div className="w-full aspect-[4/3] bg-muted/40 rounded-2xl flex items-center justify-center p-8 group-hover:scale-[1.02] transition-transform">
              {feature.icon}
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
