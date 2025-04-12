"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const FetchUserProfile = ({ username }: { username: string }) => {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log(profile);

  useEffect(() => {
    if (username) {
      fetchProfile();
    }
  }, [username]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("username", username)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      console.log("Fetched profile:", data);
      setProfile(data);
    }
    setLoading(false);
  };

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Profile not found</p>;

  return (
    <div>
      <p>@{profile.username ? profile.username : "Username Not Available"}</p>
      <p>
        {profile.first_name ? profile.first_name : "First Name Not Available"}
      </p>{" "}
      <p>{profile.last_name ? profile.last_name : "Last Name Not Available"}</p>{" "}
    </div>
  );
};

export default FetchUserProfile;
