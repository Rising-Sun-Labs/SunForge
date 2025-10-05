export const formatEditedFooter = (by?: string, at?: string) =>
  `Last edited by ${by ?? "username"} ${at ?? "Today at 12:20 PM Dummy Value"}`;
