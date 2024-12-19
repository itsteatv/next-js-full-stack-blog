"use server";

type UserDeleteAccountParams = {
  provided_id: string;
};

interface UpdateUserResponse {
  code: string;
  message?: string;
}

import { cookies } from "next/headers";

export async function userDeleteAccount({
  provided_id,
}: UserDeleteAccountParams): Promise<UpdateUserResponse> {
  console.log(provided_id);

  const cookieStore = cookies();

  const subdomain = process.env.KIND_API_DOMAIN;
  const accessToken = process.env.KINDE_API_ACCESS_TOKEN;
  const audience = process.env.KINDE_API_AUDIENCE;

  if (!subdomain) {
    throw new Error("Environment variable KIND_API_DOMAIN is missing");
  }

  if (!accessToken) {
    throw new Error("Environment variable KINDE_API_ACCESS_TOKEN is missing");
  }

  if (!audience) {
    throw new Error("Environment variable KINDE_API_AUDIENCE is missing");
  }
  
  const allCookies = await cookieStore.getAll();
  allCookies.forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });

  const endpoint = `${subdomain}/api/v1/user?id=${provided_id}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Error details:", errorDetails);
    throw new Error("Failed to update user data.");
  }

  const data: UpdateUserResponse = await response.json();
  return data;
}
