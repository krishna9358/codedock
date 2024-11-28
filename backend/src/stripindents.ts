export function stripIndents(value: string): string; // Overloaded function signature for a single string input
export function stripIndents(strings: TemplateStringsArray, ...values: any[]): string; // Overloaded function signature for template literals
export function stripIndents(arg0: string | TemplateStringsArray, ...values: any[]) {
  // Check if the first argument is a TemplateStringsArray (used for tagged template literals)
  if (typeof arg0 !== 'string') {
    // Process the template strings and values to create a single string
    const processedString = arg0.reduce((acc, curr, i) => {
      acc += curr + (values[i] ?? ''); // Append current string and corresponding value
      return acc;
    }, '');

    return _stripIndents(processedString); // Call helper function to strip indents from the processed string
  }

  return _stripIndents(arg0); // If it's a single string, directly strip indents
}

// Helper function to remove leading/trailing whitespace and empty lines from a string
function _stripIndents(value: string) {
  return value
    .split('\n') // Split the string into lines
    .map((line) => line.trim()) // Trim whitespace from each line
    .join('\n') // Join the lines back into a single string
    .trimStart() // Remove leading whitespace from the entire string
    .replace(/[\r\n]$/, ''); // Remove trailing newlines
}