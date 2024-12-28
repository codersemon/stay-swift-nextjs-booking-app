"use server";

import { signIn } from "@/auth";

export async function loginAction(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log("action log", response);

    return response;
  } catch (error) {

    console.log("action error log", error);

    return Error(error);
  }
}
