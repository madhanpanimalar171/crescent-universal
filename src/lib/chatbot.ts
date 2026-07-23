/**
 * Placeholder reply logic for the chat widget.
 *
 * This is intentionally simple keyword matching, not a real trained AI —
 * per your call to ship the full chat UI now and wire a real AI backend
 * (e.g. an LLM API behind your own server) in later. Swap this function's
 * internals for a real API call whenever that's ready; the widget itself
 * doesn't need to change.
 */
export function getBotReply(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (/price|cost|quote|package/.test(msg)) {
    return "Our packages are quote-based since every project's a little different — take a look at the Products page, or share a few details here and we'll follow up with a quote.";
  }
  if (/service|website|graphic|seo|hosting|qr|social/.test(msg)) {
    return "We cover website design, graphic design, hosting & domains, SEO/PPC, QR codes and social media marketing — the Services page has the full breakdown.";
  }
  if (/contact|call|phone|email|reach/.test(msg)) {
    return "You can reach us directly on the Contact page — email, phone and a quick form are all there.";
  }
  if (/hi|hello|hey/.test(msg)) {
    return "Hi there! What are you looking to build or improve online?";
  }

  return "Thanks for the message! For anything specific, the Services and Products pages have the details — or leave your contact info and our team will follow up.";
}

export const initialBotGreeting =
  "Hi! I'm the Crescent Universal assistant. Ask me about our services, packages, or how to get in touch.";
