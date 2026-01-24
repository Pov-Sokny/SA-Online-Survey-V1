"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Server, Activity } from "lucide-react"

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex gap-6 p-8 rounded-2xl bg-background/60 backdrop-blur-xl border shadow-xl"
        >
          {/* Portainer */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-col items-center gap-4"
          >
            <Server className="w-10 h-10 text-primary" />
            <Link href="https://docker-ui.supersurvey.live/" target="_blank">
              <Button size="lg" className="px-8">
                Portainer
              </Button>
            </Link>
          </motion.div>

          {/* Kuma */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-col items-center gap-4"
          >
            <Activity className="w-10 h-10 text-primary" />
            <Link href="https://kuma-monitoring.supersurvey.live" target="_blank">
              <Button size="lg" className="px-8">
                Kuma
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </ProtectedRoute>
  )
}
