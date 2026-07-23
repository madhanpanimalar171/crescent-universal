/**
 * reCAPTCHA utilities
 */

export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

export const isRecaptchaConfigured = Boolean(RECAPTCHA_SITE_KEY);

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export interface ContactFormPayload extends ContactFormValues {
  recaptchaToken: string | null;
}

/**
 * Submit the contact form through the backend. The backend will verify
 * the reCAPTCHA v2 checkbox token before sending.
 */
export async function submitContactForm(
  payload: ContactFormPayload
): Promise<{ success: boolean; message: string }> {
  const backendUrlRaw =
    import.meta.env.VITE_BACKEND_URL?.trim() || window.location.origin || 'http://localhost:3000';
  const backendUrl = backendUrlRaw.replace(/\/+$/, '');
  const endpoint = new URL('/api/contact', backendUrl).toString();

  console.log('Contact form backend URL:', backendUrl);
  console.log('Contact form endpoint:', endpoint);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit contact form');
    }

    return {
      success: true,
      message: result.message || 'Message sent successfully.',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    throw new Error(errorMessage);
  }
}
