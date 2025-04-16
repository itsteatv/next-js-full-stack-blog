type IdentityProvider = "google" | "facebook" | "discord" | string;

interface Identity {
  provider: IdentityProvider;
}

interface LinkedStatus {
  google: boolean;
  facebook: boolean;
  discord: boolean;
}

export const getLinkedStatus = (
  identities: Identity[] | undefined | null
): LinkedStatus => {
  const linked = identities?.map((id) => id.provider) || [];
  return {
    google: linked.includes("google"),
    facebook: linked.includes("facebook"),
    discord: linked.includes("discord"),
  };
};
