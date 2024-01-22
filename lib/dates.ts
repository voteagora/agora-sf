// Input is a string of the form: https://sfgov.s3.us-east-1.amazonaws.com/meetings/2024-01-18-Government Audit and Oversight Committee.json
// Output is a string of the form: January 18, 2024
export function extractAndFormatDate(url: string): string | null {
  // Regular expression to extract the date in YYYY-MM-DD format
  const dateRegex = /(\d{4}-\d{2}-\d{2})/;
  const match = url.match(dateRegex);

  if (match) {
    const dateString = match[0];
    const date = new Date(dateString);

    // Check if the date is valid
    if (!isNaN(date.getTime())) {
      // Options for formatting the date
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    }
  }

  return null;
}
