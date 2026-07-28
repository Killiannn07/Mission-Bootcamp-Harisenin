import { z } from "zod";

export const createContentSchema = z.object({
    title: z.string().min(1, "Title is required"),

    description: z.string().optional(),

    image: z.string().url("Image must be a valid URL"),

    year: z
        .number()
        .int()
        .min(1900)
        .max(new Date().getFullYear() + 5),

    ageRating: z.string(),

    rating: z
        .number()
        .min(0)
        .max(10),

    duration: z.number().positive(),

    type: z.enum(["movie", "series"]),

    badge: z.string().nullable().optional(),

    topTen: z.boolean(),

    newRelease: z.boolean(),

    genres: z.array(z.string())
});