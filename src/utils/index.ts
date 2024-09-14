export const cleanString = (value: any): string => {
  if (typeof value === "string") {
    return value.replace(/[\r\n]+/g, "").trim();
  }
  return value?.toString() || "N/A"; // Fallback to "N/A" if the value is undefined
};

export const formatName = (word: string) => {
  const formattedWord = word.charAt(0) + word.slice(1).toLowerCase();
  return formattedWord;
};

export const formatId = (name: string, id: string): string => {
  // Extract the last 4 characters of the ID
  const lastFourChars = id.slice(-2);
  // Format and return the desired string
  return `${name}-${lastFourChars}`;
};

export const getInitials = (name: string): string => {
  console.log("name :", name);
  return name;
};
