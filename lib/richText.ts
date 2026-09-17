/** Strips HTML tags for use in plain-text contexts (meta descriptions, previews). */
export function stripHtml(html: string): string {
  return html
    .replace(/<(br|div|p)[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
