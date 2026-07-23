interface IconProps {
  className?: string;
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12.04 2.5c-5.26 0-9.54 4.28-9.54 9.54 0 1.68.44 3.3 1.28 4.73L2.5 21.5l4.87-1.24a9.5 9.5 0 0 0 4.67 1.22h.01c5.26 0 9.54-4.28 9.54-9.54 0-2.55-.99-4.94-2.79-6.74a9.47 9.47 0 0 0-6.76-2.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 7.6c-.2-.45-.4-.46-.6-.47h-.5c-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.19 0 1.29.94 2.53 1.07 2.71.13.18 1.83 2.9 4.5 4 2.23.91 2.68.73 3.16.68.48-.04 1.55-.63 1.77-1.24.22-.6.22-1.13.15-1.24-.07-.11-.24-.18-.5-.31-.26-.13-1.55-.77-1.79-.86-.24-.09-.42-.13-.59.13-.18.26-.68.86-.83 1.04-.15.18-.31.2-.57.07-.26-.13-1.09-.4-2.08-1.29-.77-.68-1.28-1.53-1.44-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.31.4-.47.13-.15.17-.26.26-.44.09-.18.04-.33-.02-.46-.07-.13-.58-1.44-.81-1.96Z"
        fill="currentColor"
      />
    </svg>
  );
}
