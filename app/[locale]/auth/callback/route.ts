import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/en/blog";
  const headersList = headers();
  const pathname = headersList.get("next-url") || "/en";
  const locale = pathname.split("/")[1] || "en";

  console.log("next: ", next);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching the user data: ", userError.message);
        return NextResponse.redirect(`${origin}/${locale}/error`);
      }

      const { data: existingUser } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("email", data?.user?.email)
        .limit(1)
        .single();

      if (!existingUser) {
        const { error: dbError } = await supabase.from("user_profiles").insert({
          email: data.user.email,
          username: data.user.user_metadata.user_name,
        });

        if (dbError) {
          console.error("Error inserting user data: ", dbError.message);
          return NextResponse.redirect(`${origin}/${locale}/error`);
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
