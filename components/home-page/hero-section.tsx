"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Heart, ThumbsUp, Smile } from "lucide-react"

const floatingEmojis = [
  {
    Icon: Heart,
    color: "text-brand-green",
    delay: 0,
    x: -120,
    y: -80,
    rotate: -10,
  },
  {
    Icon: Star,
    color: "text-brand-yellow",
    delay: 0.5,
    x: 140,
    y: -60,
    rotate: 15,
  },
  {
    Icon: ThumbsUp,
    color: "text-brand-teal",
    delay: 1,
    x: -100,
    y: 100,
    rotate: -5,
  },
  {
    Icon: Smile,
    color: "text-purple-400",
    delay: 1.5,
    x: 120,
    y: 80,
    rotate: 10,
  },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-yellow/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-green/20 rounded-full blur-3xl" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-brand-teal/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="inline-block mb-6 px-4 py-1.5 bg-white rounded-full shadow-sm border border-gray-100"
        >
          <span className="text-sm font-bold text-brand-green">Making feedback fun again</span>
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="text-5xl md:text-7xl font-bold text-brand-dark tracking-tight mb-6 leading-tight"
        >
          Surveys that people <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-teal">
            actually want to take
          </span>
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Ditch the boring forms. Create beautiful, conversational surveys that feel like a friendly chat. Get better
          data with a smile.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="shadow-lg shadow-brand-green/30">
            Start for free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="bg-white">
            View examples
          </Button>
        </motion.div>

        {/* Illustration Area */}
        <div className="mt-20 relative max-w-4xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="relative bg-white rounded-4xl shadow-2xl p-8 md:p-12 border-4 border-brand-dark/5 aspect-[16/9] flex items-center justify-center overflow-hidden"
          >
            {/* Abstract UI Representation */}
            <div className="w-full max-w-md space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-green flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-4 bg-gray-100 rounded-full w-1/2" />
                </div>
              </div>
              <div className="flex justify-end items-start gap-4">
                <div className="flex-1 space-y-2 flex flex-col items-end">
                  <div className="h-12 bg-brand-yellow/20 rounded-2xl w-2/3 flex items-center px-4">
                    <span className="text-brand-dark font-medium">I love the new design!</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-teal flex-shrink-0" />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-green flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-12 bg-gray-50 rounded-2xl w-full border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                    Type your answer...
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Emojis */}
            {floatingEmojis.map((item, index) => (
              <motion.div
                key={index}
                className={`absolute p-4 bg-white rounded-2xl shadow-xl ${item.color}`}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                }}
                animate={{
                  x: item.x,
                  y: item.y,
                  opacity: 1,
                  rotate: [item.rotate - 5, item.rotate + 5, item.rotate - 5],
                  y: [item.y - 10, item.y + 10, item.y - 10],
                }}
                transition={{
                  opacity: {
                    duration: 0.5,
                    delay: item.delay + 0.5,
                  },
                  x: {
                    duration: 0.5,
                    delay: item.delay + 0.5,
                  },
                  y: {
                    duration: 0.5,
                    delay: item.delay + 0.5,
                  },
                  rotate: {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                  default: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  zIndex: 20,
                }}
              >
                <item.Icon size={32} strokeWidth={2.5} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
