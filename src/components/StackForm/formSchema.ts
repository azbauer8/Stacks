import * as z from "zod"

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character.",
  }),
  description: z.string().optional(),
  link: z.string().url().optional(),
  visibility: z.enum(["public", "private"]),
  use_case: z.number().optional(),
  language: z.number().optional(),
  framework: z.number().optional(),
  meta_framework: z.number().optional(),
  styling: z.number().optional(),
  ui_library: z.number().optional(),
  database: z.number().optional(),
  backend_framework: z.number().optional(),
  other_libraries: z.number().array().optional(),
})
