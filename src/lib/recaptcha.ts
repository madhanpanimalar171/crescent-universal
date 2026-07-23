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
  const currentOrigin = window.location.origin;
  const isLocalhost = currentOrigin.startsWith('http://localhost') || currentOrigin.startsWith('http://127.0.0.1');
  const configuredBackendUrl = import.meta.env.VITE_BACKEND_URL?.trim();
  let backendUrlRaw = configuredBackendUrl || (isLocalhost ? currentOrigin : '');

  if (!backendUrlRaw) {
    const errorMessage =
      'Missing VITE_BACKEND_URL. The contact form frontend requires VITE_BACKEND_URL to point to the deployed backend URL.';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (/^\/\//.test(backendUrlRaw)) {
    backendUrlRaw = `https:${backendUrlRaw}`;
  } else if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(backendUrlRaw)) {
    backendUrlRaw = `https://${backendUrlRaw}`;
    console.warn(
      'VITE_BACKEND_URL does not include a protocol. Assuming HTTPS. Set VITE_BACKEND_URL to https://your-backend-url.onrender.com'
    );
  }

  const backendUrl = backendUrlRaw.replace(/\/+$/, '');
  const endpoint = new URL('/api/contact', backendUrl).toString();

  console.log('Contact form backend URL:', backendUrl);
  console.log('Contact form endpoint:', endpoint);
  console.log('Contact form backendUrlRaw:', backendUrlRaw);
  console.log('Contact form window.location.origin:', window.location.origin);

  try {
    console.log('Before API call');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    console.log('After API call');
    console.log('API response status:', response.status, response.statusText, response.url);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit contact form');
    }

    return {
      success: true,
      message: result.message || 'Message sent successfully.',
    };
  } catch (error) {
    console.error('Contact form API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    throw new Error(errorMessage);
  }
}
