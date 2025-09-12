export function formatDate(input: string): string {
  if (input.length !== 8 || !/^\d{8}$/.test(input)) {
    throw new Error("Invalid date format. Expected YYYYMMDD.");
  }

  const year = input.substring(0, 4);
  const month = input.substring(4, 6);
  const day = input.substring(6, 8);

  return `${day}/${month}/${year}`;
}

export function formatDateTime(input: string): string {
  if (input.length !== 15 || !/^\d{8} \d{6}$/.test(input)) {
    throw new Error("Invalid datetime format. Expected YYYYMMDD HHMMSS.");
  }

  const datePart = input.substring(0, 8);
  const timePart = input.substring(9);

  const formattedDate = formatDate(datePart);
  const hours = timePart.substring(0, 2);
  const minutes = timePart.substring(2, 4);
  const seconds = timePart.substring(4, 6);

  return `${formattedDate} ${hours}:${minutes}:${seconds}`;
}