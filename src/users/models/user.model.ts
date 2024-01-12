import { z } from "zod";

const RoleEnum = z.enum(["user", "admin"], {
  errorMap: (issue, ctx) => {
    return { message: "Role solo puede ser 'user' o 'admin'" };
  },
});

export const userSchema = z.object({
  username: z.string({
    required_error: "User es requerido",
    invalid_type_error: "User debe ser un string",
  }),
  password: z
    .string({
      required_error: "Email es requerido",
      invalid_type_error: "Email debe ser un string",
    })
    .min(6, "Password debe tener almenos 6 caracteres"),
  role: RoleEnum.optional().default("user"),
});

export const userSchemaLogin = z.object({
  username: z.string({
    required_error: "User es requerido",
    invalid_type_error: "User debe ser un string",
  }),
  password: z
    .string({
      required_error: "Email es requerido",
      invalid_type_error: "Email debe ser un string",
    })
    .min(6, "Password debe tener almenos 6 caracteres"),
});
export type UserParams = z.infer<typeof userSchema>;
export type UserParamsLogin = z.infer<typeof userSchemaLogin>;
export type User = UserParams & { id: number };