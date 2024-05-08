import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine(
    (file) => !file || file.size < 1024 * 1024 * 2,
    "File must be of less than 2MB",
  );

const numericReqSchema = z
  .string()
  .min(1, "Salary is required")
  .regex(/^\d+$/, "Must be a number");

const applicationSchema = z
  .object({
    applicationEmail: z.string().email().max(100).optional().or(z.literal("")),
    applicationUrl: z.string().url().max(100).optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or URL is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: z
      .string()
      .min(1, "Location is required")
      .refine((location) => locationTypes.includes(location)),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) => !data.location || data.locationType === "Remote" || data.location,
    { message: "Location is required for On-site Jobs", path: ["location"] },
  );

export const createJobSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(100),
    type: z
      .string()
      .min(1, "Job type is required")
      .refine((value) => jobTypes.includes(value), "Invalid Job Type"),
    companyName: z.string().min(1, "Company name is required").max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(500).optional(),
    salary: numericReqSchema.max(9, "Number can't be longer than 9 digits"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
