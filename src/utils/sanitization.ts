// utils/sanitization.ts (or lib/sanitization.ts)
import DOMPurify from "isomorphic-dompurify";

/**
 * Recursively sanitize data to prevent XSS attacks
 * @param data - Data to sanitize (can be string, array, object, or primitive)
 * @param depth - Current recursion depth (used to prevent stack overflow)
 * @returns Sanitized data
 */
export const sanitizeData = (data: any, depth: number = 0): any => {
  // ✅ SECURITY: Prevent stack overflow from deeply nested objects !
  const MAX_DEPTH = 50;

  if (depth > MAX_DEPTH) {
    console.warn(`Max sanitization depth (${MAX_DEPTH}) exceeded`);
    return null;
  }

  // Sanitize strings
  if (typeof data === "string") {
    return DOMPurify.sanitize(data, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
    });
  }

  // Recursively sanitize arrays
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item, depth + 1));
  }

  // Recursively sanitize objects
  if (data && typeof data === "object") {
    return Object.keys(data).reduce((acc, key) => {
      // ✅ SECURITY: Prevent prototype pollution
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        console.warn(`Skipping dangerous key: ${key}`);
        return acc;
      }
      acc[key] = sanitizeData(data[key], depth + 1);
      return acc;
    }, {} as any);
  }

  // Return primitives as-is (numbers, booleans, null, undefined)
  return data;
};

/**
 * Type guard to check if data contains any strings that need sanitization
 */
export const needsSanitization = (data: any): boolean => {
  if (typeof data === "string") return true;
  if (Array.isArray(data)) return data.some(needsSanitization);
  if (data && typeof data === "object") {
    return Object.values(data).some(needsSanitization);
  }
  return false;
};
