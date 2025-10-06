"use client"

import { motion } from "framer-motion"
import { Cloud, Sun } from "lucide-react"

export function WeatherLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="relative w-32 h-32">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute inset-0"
        >
          <Sun className="w-full h-full text-yellow-400" />
        </motion.div>
        <motion.div
          animate={{
            x: [0, 20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <Cloud className="w-full h-full text-blue-300" />
        </motion.div>
      </div>
      <motion.p
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="text-lg font-medium text-foreground"
      >
        Loading weather data...
      </motion.p>
    </div>
  )
}
