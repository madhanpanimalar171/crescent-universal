export const siteConfig = {
  name: 'Crescent Universal',
  tagline: 'Go Global',
  description:
    'A Chennai-based web design and digital marketing studio that helps local businesses build a premium online presence and reach further than their street.',
  email: 'Sales@crescentuniversal.in',
  phones: ['+91 90800 82628', '+91 97910 54434'],
  whatsappNumber: '', // TODO: confirm which number above is on WhatsApp, then set e.g. '919080082628'
  instagramHandle: '', // TODO: add handle, e.g. 'crescentuniversal'
  // Found via a public business directory listing, not confirmed by you yet —
  // please check this is still correct before it goes live.
  address: 'No. A-11, Mogappair Industrial Estate, Chennai, Tamil Nadu 600037',
};

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Profile', path: '/profile' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Contact', path: '/contact' },
];

export type ServiceItem = {
  id: string;
  title: string;
  summary: string;
  description: string;
  points: string[];
  icon: 'website' | 'graphic' | 'hosting' | 'seo' | 'qr' | 'social';
};

export const services: ServiceItem[] = [
  {
    id: 'website-design',
    title: 'Website Design',
    summary: 'Static and dynamic websites, redesigns and ongoing maintenance.',
    description:
      'A site built to represent the business the way it deserves — whether that is a straightforward static brochure site or a fully dynamic build with a content system behind it. Existing sites get redesigned rather than patched, and every build is followed up with real maintenance instead of being left to rot.',
    points: ['Static & dynamic builds', 'Redesigns & make-overs', 'Website maintenance'],
    icon: 'website',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    summary: 'Brand visuals that carry across print and screen.',
    description:
      'The visual identity that shows up everywhere a customer looks — logo, business stationery, brochures, newsletters, catalogues and print ads — designed as one consistent system rather than one-off pieces.',
    points: ['Logo design', 'Brochures & newsletters', 'Catalogs & print ads'],
    icon: 'graphic',
  },
  {
    id: 'hosting-domains',
    title: 'Hosting & Domains',
    summary: 'The infrastructure behind a site that stays online.',
    description:
      'Domain registration, web space and business mail set up correctly the first time, then kept running — the unglamorous plumbing that decides whether a site is actually reachable when a customer goes looking for it.',
    points: ['Domain registration', 'Web space & business mail', 'Support & upkeep'],
    icon: 'hosting',
  },
  {
    id: 'seo-marketing',
    title: 'SEO & Online Marketing',
    summary: 'Getting found by the people already looking for you.',
    description:
      'Search engine optimisation and paid campaigns aimed at the searches a business is already losing today — so the phone rings from Google, not only from referrals.',
    points: ['Search engine optimisation', 'Google Ads & PPC', 'Online promotion'],
    icon: 'seo',
  },
  {
    id: 'qr-code',
    title: 'QR Code Solutions',
    summary: 'A bridge between your print materials and your website.',
    description:
      'Smart, trackable QR codes that turn packaging, menus and signage into a direct line to a catalogue, offer or contact form — print doing the job of a digital storefront.',
    points: ['Smart QR generation', 'Menus, packaging & signage', 'Trackable campaigns'],
    icon: 'qr',
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    summary: 'Consistent presence where your customers scroll daily.',
    description:
      'Profiles set up and branded properly, then kept active on a real content calendar — so the business looks like the same business on Instagram as it does on its own website.',
    points: ['Profile setup & branding', 'Content calendars', 'Ongoing management'],
    icon: 'social',
  },
];

export type Differentiator = {
  title: string;
  description: string;
  icon: 'team' | 'seo' | 'local' | 'link';
};

export const differentiators: Differentiator[] = [
  {
    title: 'One team, not five vendors',
    description:
      'Design, development, hosting and marketing sit under one roof, so nobody points fingers at "the other vendor" when something needs fixing.',
    icon: 'team',
  },
  {
    title: 'Built to be found, not just seen',
    description:
      'SEO fundamentals are part of the build from day one, not an afterthought bolted on after launch.',
    icon: 'seo',
  },
  {
    title: 'Chennai-based, always reachable',
    description:
      'A local team on local time — a phone call or visit away, not a ticket queue in another timezone.',
    icon: 'local',
  },
  {
    title: 'Print and digital, connected',
    description:
      'Brochures, QR codes and social profiles are designed to point back to the same website, so every channel reinforces the others.',
    icon: 'link',
  },
];

export type ProcessStep = {
  title: string;
  description: string;
  icon: 'discover' | 'design' | 'develop' | 'launch' | 'support';
};

export const processSteps: ProcessStep[] = [
  { title: 'Discover', description: 'Understand the business, the audience and what "success" should look like.', icon: 'discover' },
  { title: 'Design', description: 'A visual direction built for this brand specifically, reviewed before a line of code is written.', icon: 'design' },
  { title: 'Develop', description: 'The site gets built, tested on real devices, and connected to hosting and domains.', icon: 'develop' },
  { title: 'Launch', description: 'Goes live with SEO fundamentals, analytics and social profiles already in place.', icon: 'launch' },
  { title: 'Support', description: 'Ongoing maintenance, updates and marketing — the relationship continues after launch.', icon: 'support' },
];

export const stats = [
  { value: '6', label: 'Core services under one roof' },
  { value: '100%', label: 'Mobile-responsive builds' },
  { value: '360°', label: 'Design to hosting to marketing' },
  { value: '24/7', label: 'Support & upkeep' },
];

export type ProductPackage = {
  id: string;
  name: string;
  tagline: string;
  bestFor: string;
  features: string[];
  featured?: boolean;
};

export const productPackages: ProductPackage[] = [
  {
    id: 'starter',
    name: 'Starter Site',
    tagline: 'A clean digital front door for a new or small business.',
    bestFor: 'New businesses, solo professionals, single-location shops',
    features: ['Up to 5 pages', 'Mobile-responsive design', 'Contact form', 'Basic on-page SEO'],
  },
  {
    id: 'business',
    name: 'Business Growth',
    tagline: 'For businesses ready to be found and to convert.',
    bestFor: 'Established businesses that need to rank and convert online',
    features: [
      'Up to 12 pages',
      'Dynamic content & CMS',
      'SEO & Google Business setup',
      'Social media integration',
    ],
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Presence',
    tagline: 'A full digital system for an established brand.',
    bestFor: 'Multi-location or multi-brand businesses with ongoing campaigns',
    features: [
      'Unlimited pages',
      'Custom features & integrations',
      'Ongoing marketing & PPC',
      'Priority support',
    ],
  },
];

export type AddOn = {
  name: string;
  description: string;
};

export const addOns: AddOn[] = [
  { name: 'Logo & brand kit', description: 'A logo, colour palette and type system if you\u2019re starting fresh.' },
  { name: 'QR code campaign', description: 'Trackable QR codes for packaging, menus or in-store signage.' },
  { name: 'Social media setup', description: 'Branded Instagram/Facebook profiles with a starter content calendar.' },
  { name: 'Extra pages', description: 'Additional pages beyond a package\u2019s base allowance, added as needed.' },
];

// Pricing is quote-based rather than fixed — every package ends in "Get a Custom
// Quote" rather than a listed price. Swap to fixed prices here if you'd rather
// show numbers up front.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// Placeholder testimonials — swap these for real client quotes before launch.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Our old site never showed up on Google. Within weeks of the redesign, people started finding us by searching, not just by word of mouth.",
    name: 'Retail Business Owner',
    role: 'Chennai',
  },
  {
    quote:
      'They handled the website and the social pages together, so everything finally looks like one brand instead of three.',
    name: 'Boutique Owner',
    role: 'Local Client',
  },
  {
    quote:
      'The QR codes on our packaging link straight to our catalogue. Simple idea, but it changed how customers reach us.',
    name: 'Manufacturing Client',
    role: 'Tamil Nadu',
  },
];
