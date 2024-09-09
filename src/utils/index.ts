export const cleanString = (value: any): string => {
  if (typeof value === "string") {
    return value.replace(/[\r\n]+/g, "").trim();
  }
  return value?.toString() || "N/A"; // Fallback to "N/A" if the value is undefined
};
