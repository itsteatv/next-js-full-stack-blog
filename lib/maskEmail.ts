export const maskEmail = (email: string) => {
  return email.replace(/(.{2}).+(.{2}@.+)/, "$1***$2");
};
