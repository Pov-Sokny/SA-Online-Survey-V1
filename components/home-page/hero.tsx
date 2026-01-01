import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-6 pt-20 pb-24 md:pt-32 md:pb-32">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border text-xs font-medium mb-8">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Announcing $20M in Seed & Series A Funding
        <ArrowUpRight className="w-3 h-3" />
      </div>
      <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-6 max-w-4xl text-pretty">
        Fixed Income Trading for Wealth Platforms
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed text-balance">
        Quickly deploy our suite of fixed income APIs designed for retail. Our industry-leading APIs power fixed income
        investing for firms representing $3T+ in assets.
      </p>
      <Button variant="default" className="rounded-full px-8 py-7 h-auto text-base flex items-center gap-2 group">
        Request Access
        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Button>
    </section>
  )
}
