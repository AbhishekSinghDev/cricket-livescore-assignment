"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { adminLoginFormSchema } from "@/lib/form-schemas";
import { TStatus } from "@/types";
import { axiosInstance } from "@/lib";
import { TLoginResponse } from "@/types/response";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { LoadingButton } from "../ui/loading-button";
import { setAuthTokens } from "@/utils";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [status, setStatus] = useState<TStatus>("idle");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof adminLoginFormSchema>>({
    resolver: zodResolver(adminLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof adminLoginFormSchema>) => {
    const { email, password } = values;

    try {
      setStatus("loading");
      const { data } = await axiosInstance.post<TLoginResponse<boolean>>(
        "/auth/login",
        {
          email,
          password,
        }
      );

      if (data.success) {
        const successResponse = data as TLoginResponse<true>;

        if (successResponse.data?.user) {
          toast.success(successResponse.message);

          setAuthTokens(
            successResponse.data.user.accessToken,
            successResponse.data.user.refreshToken
          );
          setStatus("success");

          router.push("/admin");
        }
      } else {
        const failedResponse = data as TLoginResponse<false>;

        if (failedResponse.errors.fieldErrors.email.length > 0) {
          form.setError("email", {
            type: "manual",
            message: failedResponse.errors.fieldErrors.email[0],
          });
        }

        toast.error(failedResponse.message);
        setStatus("error");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error.response?.data as
          | TLoginResponse<false>
          | undefined;

        toast.error(errorResponse?.message ?? "An unexpected error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }

      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handlePasswordVisiblity = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Admin Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg: someone@provider.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            {...field}
                          />
                          <span
                            onClick={handlePasswordVisiblity}
                            className="cursor-pointer"
                          >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {status === "loading" ? (
                <LoadingButton loading>Verifying...</LoadingButton>
              ) : (
                <Button type="submit" className="w-full">
                  Login
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
