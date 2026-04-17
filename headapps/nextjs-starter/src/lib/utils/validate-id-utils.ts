export function toValidId(text: string) {
  const validatedId = text
    .replace(/[.\s\/]/g, ' ')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .toLowerCase();
  return validatedId;
}
