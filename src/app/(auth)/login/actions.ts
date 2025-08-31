"use server";
import { ID, PASSWORD } from "@/validate/login-validate";
import { z } from "zod";

/** login schema */
const loginSchema = z.object({
  id: z
    .string()
    .min(ID.min.value, { message: ID.min.message })
    .max(ID.max.value, { message: ID.max.message })
    .regex(ID.regex.value, { message: ID.regex.message })
    .trim(),

  password: z
    .string()
    .min(PASSWORD.min.value, { message: PASSWORD.min.message })
    .max(PASSWORD.max.value, { message: PASSWORD.max.message })
    .regex(PASSWORD.regex.value, { message: PASSWORD.regex.message })
    .trim(),
});

export async function login(_: any, formData: FormData) {
  const data = {
    id: formData.get("id"),
    password: formData.get("password"),
  };

  // 실패 시 메시지를 꺼내 쓰기 쉽게 safeParse 사용
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    return { errors: fieldErrors };
  }

  return null;
}
