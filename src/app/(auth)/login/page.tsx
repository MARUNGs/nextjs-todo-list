/**
 * 로그인 화면
 */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useActionState } from "react";
import { useEffect } from "react";
import { login } from "./actions";
import { ID, PASSWORD } from "@/validate/login-validate";
import Link from "next/link";

export type LoginFormValues = {
  id: string;
  password: string;
};

export default function Login() {
  const form = useForm<LoginFormValues>({
    defaultValues: { id: "", password: "" },
    mode: "onSubmit",
  });

  const [state, action] = useActionState(login, null);

  // 서버 반환된 에러를 react-hook-form에 설정
  useEffect(() => {
    if (state?.errors) {
      Object.entries(state.errors).forEach(([field, errors]) => {
        if (errors && Array.isArray(errors)) {
          const error = { type: "server", message: errors[0] };
          form.setError(field as keyof LoginFormValues, error);
        }
      });
    } else {
      const formValues = form.getValues();
      const keys = Object.keys(formValues);
      keys.map((key) => form.clearErrors(key as keyof LoginFormValues));
    }
  }, [state, form]);

  return (
    <div className="flex flex-col justify-center items-center  min-h-screen ">
      <h1 className="font-bold text-2xl mb-10">SK MEMO</h1>
      <div className="flex items-center justify-center p-4">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>환영합니다!</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form action={action} className="grid gap-4">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>아이디</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          name="id"
                          placeholder="아이디"
                          maxLength={ID.max.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          name="password"
                          type="password"
                          placeholder="비밀번호"
                          maxLength={PASSWORD.max.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Link href={"/join"}>아이디 찾기</Link>
                  <span className="ml-2 mr-2">|</span>
                  <Link href={"/join"}>비밀번호 찾기</Link>
                  <span className="ml-2 mr-2">|</span>
                  <Link href={"/join"}>회원가입</Link>
                </div>

                <Button type="submit">로그인</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
