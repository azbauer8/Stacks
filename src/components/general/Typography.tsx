import { cva } from "class-variance-authority"

export const textVariant = cva(undefined, {
  variants: {
    variant: {
      h1: "my-5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "my-3 scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "my-3 scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "my-2 scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-4",
      blockquote: "my-6 border-l-2 border-divider pl-6 italic",
      list: "my-2 ml-6 list-disc [&>li]:mt-2",
      lead: "text-xl text-default-500",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-default-500",
      link: "text-foreground underline-offset-4 hover:underline",
    },
  },
})
