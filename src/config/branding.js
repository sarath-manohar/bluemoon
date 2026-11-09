// ============================================================================
//  LOGO & FOOTER SETTINGS  — edit the text between the quotes, then save.
//  Leave a value as '' (empty) to use the default shown in the comment.
// ============================================================================

export const branding = {
  // ---------------------------------------------------------------- LOGO ---
  // The logo picture itself is the file  src/assets/logo/logo.svg
  // To change it: put your logo in that folder named  logo.png  (or logo.svg / logo.jpg / logo.webp)
  // and delete the old one. A square logo looks best. It also becomes the browser-tab icon.

  // true  = show the business name as text beside the logo
  // false = show only the logo picture (use this if your logo already contains the name)
  showNameNextToLogo: true,

  // -------------------------------------------------------------- FOOTER ---
  footer: {
    // Text under the logo. Default: the slogan + tagline from bluemoon-data.json
    about: '',

    // Column headings
    quickLinksHeading: 'Quick links',
    contactHeading: 'Contact',
    socialHeading: 'Follow us',

    // false = hide the "Quick links" column
    showQuickLinks: true,

    // Extra lines in the Contact column (phone numbers come from bluemoon-data.json).
    // Default address: brand.location from bluemoon-data.json
    address: '',
    email: '', // e.g. 'bluemoontours@gmail.com' — shown as a clickable email link

    // Extra social links shown after Facebook / Instagram (those come from bluemoon-data.json).
    // Example: youtube: 'https://www.youtube.com/@yourchannel'
    youtube: '',

    // Bold note in the bottom bar. Default: offerNote from bluemoon-data.json. Write 'none' to hide it.
    note: '',

    // Bottom-bar copyright. {year} and {name} are filled in automatically.
    copyright: '© {year} {name}. All rights reserved.',

    // Optional small line at the very bottom, e.g. 'Photos: Wikimedia Commons contributors'
    credits: 'Sample photos: Wikimedia Commons contributors (CC licences)',
  },
}
