import emailjs from '@emailjs/browser';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export const isEmailjsConfigured = Boolean(serviceId && templateId && publicKey);

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

/**
 * Sends the contact form via EmailJS. Throws if the three VITE_EMAILJS_*
 * environment variables haven't been set yet — see the README for how to
 * get them from your EmailJS dashboard.
 */
export async function sendContactEmail(values: ContactFormValues) {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EMAILJS_NOT_CONFIGURED');
  }

  return emailjs.send(
    serviceId,
    templateId,
    {
      from_name: values.name,
      from_email: values.email,
      phone: values.phone,
      message: values.message,
    },
    { publicKey }
  );
}
