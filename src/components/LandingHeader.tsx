"use client"

import clsx from "clsx"
import { motion, MotionProps } from "framer-motion"
import Balance from "react-wrap-balancer"

function LandingHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={clsx(
        "mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

function MotionLandingHeader({
  className,
  children,
  ...props
}: MotionProps & React.HTMLAttributes<HTMLDivElement>) {
  const blurAnimation = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  }
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.75 }}
      variants={blurAnimation}
      className={clsx(
        "mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function LandingTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={clsx(
        "text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]",
        className
      )}
      {...props}
    />
  )
}

function LandingDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Balance
      className={clsx(
        "max-w-[750px] text-center text-lg text-default-500 sm:text-xl",
        className
      )}
      {...props}
    />
  )
}

function LandingActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "flex w-full items-center justify-center space-x-4 py-4 md:pb-10",
        className
      )}
      {...props}
    />
  )
}

export {
  MotionLandingHeader,
  LandingHeader,
  LandingTitle,
  LandingDescription,
  LandingActions,
}
