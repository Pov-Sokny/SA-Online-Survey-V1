"use client"

import { motion } from "framer-motion"

const avatars = [
  {
    color: "bg-brand-green",
    initials: "JD",
  },
  {
    color: "bg-brand-teal",
    initials: "AS",
  },
  {
    color: "bg-brand-yellow",
    initials: "MK",
  },
  {
    color: "bg-purple-400",
    initials: "RL",
  },
  {
    color: "bg-blue-400",
    initials: "TH",
  },
]

export function SocialProofSection() {
  return (
    <section className="py-20 px-4 bg-brand-cream border-t border-brand-dark/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{
            scale: 0.9,
            opacity: 0,
          }}
          whileInView={{
            scale: 1,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="flex flex-col items-center justify-center space-y-6"
        >
          <div className="flex -space-x-4">
            {avatars.map((avatar, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                  scale: 1.1,
                  zIndex: 10,
                }}
                className={`w-12 h-12 rounded-full border-4 border-white ${avatar.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}
              >
                {avatar.initials}
              </motion.div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs shadow-md">
              +10k
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-brand-dark">Join 10,000+ happy survey makers</h3>
            <p className="text-gray-500">From small startups to big friendly giants.</p>
          </div>

          <motion.div
            className="flex items-center gap-1 text-brand-yellow"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {"★★★★★".split("").map((star, i) => (
              <span key={i} className="text-2xl">
                {star}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
