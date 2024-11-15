"use server";

interface UpdateUserInfoParams {
  given_name: string;
  family_name: string;
  picture: string;
  is_suspended: boolean;
  is_password_reset_requested: boolean;
  provided_id: string;
}

interface UpdateUserResponse {
  id: string;
  email: string;
  given_name: string;
  family_name: string;
  picture?: string;
  is_suspended: boolean;
  is_password_reset_requested: boolean;
}

export async function updateUserInfo({
  given_name,
  family_name,
  picture,
  is_suspended,
  is_password_reset_requested,
  provided_id,
}: UpdateUserInfoParams): Promise<UpdateUserResponse> {
  console.log(provided_id);

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

  const endpoint = `${subdomain}/api/v1/user?id=${provided_id}`;

  const body = JSON.stringify({
    provided_id,
    given_name,
    family_name,
    picture,
    is_suspended,
    is_password_reset_requested,
  });

  console.log(body);

  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body,
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error("Failed to update user data.");
  }

  const data: UpdateUserResponse = await response.json();
  return data;
}
