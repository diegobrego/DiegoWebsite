/* =====================================================================
   SITE CONFIG  -  the only file you need to edit.

   - "studio", "links" and "games" control what visitors see on the home page.
   - "company" and "privacy" feed the Impressum (legal notice) and the
     Datenschutzerklaerung (privacy policy) pages.

   Leave a value as "" if it does not apply to you. Anything that is legally
   REQUIRED and still empty shows up as an orange [placeholder] on
   impressum.html, together with a "draft" banner, so you can't miss it.

   I am not a lawyer - see README.md for the legal notes.
   ===================================================================== */
window.SITE = {

  /* ---------------------------------------------------------------
     Studio: what the home page says about you
     --------------------------------------------------------------- */
  studio: {
    name: "Diego Schram Games",
    tagline: "Small, cozy pixel games made in Germany.",
    // One string per paragraph.
    about: [
      "Hi, I'm Diego! I make small, cozy pixel games and release them on Steam.",
    ],
  },

  /* ---------------------------------------------------------------
     Social / store links shown as buttons in the header.
     Empty string = icon is hidden.
     --------------------------------------------------------------- */
  links: {
    steam: "https://store.steampowered.com/developer/dissgames",
    itch: "https://mrbrego.itch.io",
    x: "https://x.com/mrbrego",
    instagram: "",
    facebook: "",
  },

  /* ---------------------------------------------------------------
     Games. Newest first. Copy a block to add a game.

       status:      "released"  ->  listed under "Out now!"
                    "coming-soon" -> listed under "Coming soon!"
       releaseDate: "YYYY-MM-DD", or any text such as "2027" or "TBA"
       image:       path to a capsule image (Steam header/capsule works well);
                    "" = card without image. Host the file in assets/Images/ -
                    do NOT point at Steam's CDN (that leaks visitor IPs to a third party).
       links:       steam / itch - empty string hides the button
     --------------------------------------------------------------- */
  games: [
    {
      title: "Progress Bar Deluxe",
      status: "released",
      releaseDate: "2025-10-17",
      image: "assets/Images/ProgressBarDeluxe.jpg",
      description:
        "Click, place and upgrade your way to the ultimate goal: filling the Main Loading Bar! " +
        "Drag smaller loading bars onto the board, unlock new bar types and find ways to fill the big one faster.",
      tags: ["Incremental", "Idler", "Cute", "Pixel Graphics"],
      links: {
        steam: "https://store.steampowered.com/app/3699690",
        itch: "",
      },
    },

    {
      title: "Micro Macro Farm",
      status: "released",
      releaseDate: "2023-12-20",
      image: "assets/Images/MicroMacroFarm.png",
      description:
        "A small, relaxing farming game designed to run while you do other things. " +
        "Plant seeds, harvest and craft products, earn money and XP, buy machines and expand your garden.",
      tags: ["Farming Sim", "Cute", "Pixel Graphics", "Relaxing"],
      links: {
        steam: "https://store.steampowered.com/app/2685810",
        itch: "https://mrbrego.itch.io/micro-macro-farm",
      },
    },

    // Example of an upcoming game - remove the comment markers and fill in:
    // {
    //   title: "My Next Game",
    //   status: "coming-soon",
    //   releaseDate: "2027",
    //   image: "assets/Images/NextGame.png",
    //   description: "One or two sentences about it.",
    //   tags: ["Puzzle", "Pixel Graphics"],
    //   links: { steam: "https://store.steampowered.com/app/XXXXXXX", itch: "" },
    // },
  ],

  /* ---------------------------------------------------------------
     Company data for the Impressum (Section 5 DDG).
     This is PUBLIC on the site - it must be a real address where you can
     receive mail (no P.O. box).
     --------------------------------------------------------------- */
  company: {
    // Name of the business as it appears in your trade registration, e.g.
    //   "Diego Schram Games"  /  "Schram Games UG (haftungsbeschraenkt)"
    legalName: "Diego Schram Games",

    // Your role: "owner" (Inhaber, sole proprietor / Einzelunternehmen),
    //            "managing-director" (Geschaeftsfuehrer, UG / GmbH),
    //            "partner" (Gesellschafter, GbR)
    role: "owner",
    ownerName: "Diego Schram",          // full first + last name

    street: "Narzissenweg 16",
    zip: "83229",
    city: "Aschau im Chiemgau",

    email: "diegobrego@gmail.com",      // REQUIRED
    // Strongly recommended: e-mail alone may not count as "direct
    // communication" under German case law. A phone number removes the doubt.
    phone: "+43 660 4792811",

    // Only if you are entered in the Handelsregister (UG, GmbH, e.K.):
    registerCourt: "",                  // e.g. "Amtsgericht Hamburg"
    registerNumber: "",                 // e.g. "HRB 123456"

    // Only if you have one. Kleinunternehmer without a USt-IdNr: leave empty.
    vatId: "",                          // USt-IdNr., e.g. "DE123456789"
    // Wirtschafts-Identifikationsnummer, if issued (format: DE123456789-00001).
    wIdNr: "DE457446565-00001",
    // true -> adds "Kleinunternehmer gem. Section 19 UStG" to the Impressum.
    // Optional; the legally important place for this is your invoices.
    smallBusinessNote: true,

    // Only if you publish journalistic/editorial content (blog, news posts):
    // person responsible under Section 18 (2) MStV, with address.
    contentResponsible: "",

    // true -> adds a "not willing to take part in consumer arbitration"
    // statement. Only legally required with more than 10 employees.
    showDisputeNotice: false,
  },

  /* ---------------------------------------------------------------
     Privacy policy settings.
     The text describes the site as it is built: no cookies, no tracking,
     no external fonts/embeds, hosted on GitHub Pages.
     IF YOU CHANGE THAT (analytics, embeds, a different host, a contact
     form, a newsletter ...) the policy must be updated too.
     --------------------------------------------------------------- */
  privacy: {
    // Optional: the data protection authority of your federal state
    // (Landesdatenschutzbeauftragte/r). Leave empty to use a generic sentence.
    supervisoryAuthority: {
      name: "Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)",
      address: "Promenade 18, 91522 Ansbach",
      url: "https://www.lda.bayern.de",
    },

    // Whoever serves the site. Update if you leave GitHub Pages.
    hosting: {
      name: "GitHub Pages (GitHub, Inc.)",
      address: "88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA",
      privacyUrl:
        "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
    },

    // ISO date; shown as "Stand / Last updated" on the privacy page.
    lastUpdated: "2026-10-05",
  },
};
