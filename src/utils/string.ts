/**
 * String formatting and manipulation utilities.
 */

/**
 * Capitalise the first letter of a string.
 *
 * @example
 * capitalize("hello world") // "Hello world"
 */
export function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Convert a string to Title Case.
 *
 * @example
 * toTitleCase("hello world") // "Hello World"
 */
export function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

/**
 * Convert a camelCase or PascalCase string to kebab-case.
 *
 * @example
 * toKebabCase("myVariableName") // "my-variable-name"
 */
export function toKebabCase(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/**
 * Truncate a string to `maxLength` and append an ellipsis when trimmed.
 *
 * @example
 * truncate("Hello, world!", 8) // "Hello, w…"
 */
export function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength)}…`;
}

/**
 * Return `true` for non-empty strings after trimming whitespace.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Generate a simple random alphanumeric ID string.
 * Not cryptographically secure — use only for UI keys.
 *
 * @example
 * randomId() // "k3f9a2"
 */
export function randomId(length = 6): string {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length);
}
