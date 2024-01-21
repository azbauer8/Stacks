import * as z from "zod"

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character.",
  }),
  description: z.string().optional(),
  link: z.string().url().optional(),
  visibility: z.enum(["public", "private"], {
    required_error: "You need to select a visibility type.",
  }),
  use_case: z.object({ id: z.number(), title: z.string() }).optional(),
  language: z
    .object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      link: z.string().url(),
      icon: z.string(),
      icon_path: z.string(),
      has_dark_icon: z.boolean(),
    })
    .optional(),
  framework: z
    .object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      link: z.string().url(),
      icon: z.string(),
      icon_path: z.string(),
      has_dark_icon: z.boolean(),
    })
    .optional(),
  meta_framework: z
    .object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      link: z.string().url(),
      icon: z.string(),
      icon_path: z.string(),
      has_dark_icon: z.boolean(),
    })
    .optional(),
  styling: z
    .object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      link: z.string().url(),
      icon: z.string(),
      icon_path: z.string(),
      has_dark_icon: z.boolean(),
    })
    .optional(),
  ui_library: z
    .object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      link: z.string().url(),
      icon: z.string(),
      icon_path: z.string(),
      has_dark_icon: z.boolean(),
    })
    .optional(),
  database: z
    .object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      link: z.string().url(),
      icon: z.string(),
      icon_path: z.string(),
      has_dark_icon: z.boolean(),
    })
    .optional(),
  backend_framework: z
    .object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      link: z.string().url(),
      icon: z.string(),
      icon_path: z.string(),
      has_dark_icon: z.boolean(),
    })
    .optional(),
  other_frameworks: z
    .object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      category: z.number(),
      other_library_category: z.object({
        id: z.number(),
        title: z.string(),
      }),
      link: z.string().url(),
      icon: z.string(),
      icon_path: z.string(),
      has_dark_icon: z.boolean(),
    })
    .array()
    .optional(),
})
