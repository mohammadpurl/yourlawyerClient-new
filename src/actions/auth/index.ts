"use server";

import { signInSchema } from "@/app/(auth)/signin/types/signin.schema";
import { OperationResult } from "@/types/operation-result";
import { redirect } from "next/navigation";
import { serverActionWrapper } from "../server-action-wrapper";
import { createData } from "@/core/http-service/http-service";
import { SignIn } from "@/app/(auth)/signin/types/signin.types";
import {
  SendAuthCode,
  VerifyUserModel,
} from "@/app/(auth)/verify/_types/verify-user.type";
import { Problem } from "@/types/http-errors.interface";
import { AuthroizeError, signIn, signOut } from "@/auth";
import { getSession } from "next-auth/react";

export async function signInAction(
  formState: OperationResult<any> | null,
  formData: FormData
) {
  const mobile = formData.get("mobile") as string;
  // const validatedData = signInSchema.safeParse({
  //     mobile,
  // });

  // if (!validatedData.success) {
  //     return {
  //         message: "خطا در فرمت موبایل",
  //     };
  // } else {
  return serverActionWrapper(
    async () =>
      await createData<SignIn, any>("/auth/get-otp", {
        mobile,
      })
  );
  // }
}

export async function sendAuthCode(
  formState: OperationResult<string> | null,
  mobile: string
) {
  return serverActionWrapper(
    async () =>
      await createData<SendAuthCode, string>("/auth/get-otp", {
        mobile,
      })
  );
}

export async function verify(
  prevState: OperationResult<void> | undefined,
  model: VerifyUserModel
) {
  try {
    await signIn("credentials", {
      mobile: model.mobile,
      code: model.code,
      redirect: false,
    });
    return {
      isSuccess: true,
    } satisfies OperationResult<void>;
  } catch (error) {
    console.log("error is"+error)
    if (error instanceof AuthroizeError) {
      return {
        isSuccess: false,
        error: error.problem!,
      } satisfies OperationResult<void>;
    }
    throw new Error("");
  }
}
export async function logout(prevState: OperationResult<void> | undefined) {
  try {
    await signOut({ redirect: false });
    console.log("lmplmplmp");

    return {
      isSuccess: true,
    } satisfies OperationResult<void>;
  } catch (error) {
    throw new Error("");
  }
}
