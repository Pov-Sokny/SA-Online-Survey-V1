"use client"

import { motion } from "framer-motion"
import { Zap, Palette, BarChart3, Share2 } from "lucide-react"

const features = [
  {
    title: "Emoji Reactions",
    description: "Let users express themselves with native emoji support. It's faster and more fun than checkboxes.",
    icon: Zap,
    color: "bg-brand-green",
    textColor: "text-brand-green",
    lightColor: "bg-brand-green/10",
  },
  {
    title: "Beautiful Themes",
    description: "Ditch the boring corporate look. Choose from our gallery of playful, hand-crafted themes.",
    icon: Palette,
    color: "bg-brand-yellow",
    textColor: "text-yellow-600",
    lightColor: "bg-brand-yellow/10",
  },
  {
    title: "Real-time Insights",
    description: "Watch the feedback roll in with live dashboards that look as good as your surveys.",
    icon: BarChart3,
    color: "bg-brand-teal",
    textColor: "text-brand-teal",
    lightColor: "bg-brand-teal/10",
  },
  {
    title: "Share Anywhere",
    description: "Embed on your site, send via email, or share a link. We make it easy to reach your audience.",
    icon: Share2,
    color: "bg-purple-500",
    textColor: "text-purple-500",
    lightColor: "bg-purple-500/10",
  },
]

const container = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
    },
  },
}

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">
            Everything you need to <br /> make feedback fun
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Powerful features wrapped in a delightful package.</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                y: -10,
              }}
              className="relative group p-8 rounded-3xl border-2 border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${feature.lightColor}`}
              />

              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 text-white shadow-lg transform -rotate-3 group-hover:rotate-3 transition-transform duration-300`}
                >
                  <feature.icon size={28} strokeWidth={2.5} />
                </div>

                <h3 className="text-xl font-bold text-brand-dark mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
