/**
 * Sanitizes a string to prevent XSS attacks
 * Removes HTML tags and encodes special characters
 */
export function sanitizeDisplayName(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Encode HTML entities
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Remove any remaining script-like patterns
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    // Trim and limit length
    .trim()
    .slice(0, 100);
}

/**
 * Decodes a sanitized string for safe display (reverses encoding)
 * Only use this when you're sure the source is already sanitized
 */
export function decodeDisplayName(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
}
