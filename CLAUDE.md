# Apex Tile & Remodeling — Website

Static HTML marketing site + lead generation system for a San Antonio tile, remodeling,
and home improvement contracting company. 4 pages. Lead capture via GoHighLevel (GHL) webhook.

## Pages

| File | Purpose |
|------|----------|
| `index.html` | Main landing page — hero, services, stats, why-us, how-it-works, reviews, service areas, CTA, footer, 3-step quote modal |
| `faq.html` | FAQ accordion page (12 questions across 5 categories) |
| `privacy.html` | Privacy policy + SMS consent disclosure |
| `thank-you.html` | Post-submission confirmation page with "what happens next" checklist |

## Quote / Lead Flow

1. Visitor clicks "Get a Free Estimate" (nav, hero, cards, CTA, sticky bar)
2. 3-step modal opens:
   - **Step 1:** Select service type → select project size → select timeline → dynamic price estimate
   - **Step 2:** Preferred date/time for on-site visit, project address, project notes
   - **Step 3:** Contact info (first name, last name, phone, email) → submit
3. On submit: POST to GHL webhook → success state shown in modal

## GHL Webhook

The webhook POST URL is defined as `WEBHOOK` constant in `index.html` `<script>`.
Replace `YOUR_GHL_WEBHOOK_URL` with the real webhook URL.

Payload sent:
```json
{
  "firstName": "...",
  "lastName": "...",
  "phone": "...",
  "email": "...",
  "service": "...",
  "serviceType": "...",
  "projectSize": "...",
  "timeline": "...",
  "date": "...",
  "preferredDate": "...",
  "time": "...",
  "preferredTime": "...",
  "address": "...",
  "serviceAddress": "...",
  "notes": "...",
  "projectDetails": "...",
  "estimatedPrice": "...",
  "source": "website-estimate-form",
  "submittedAt": "ISO timestamp"
}
```

Note: Both legacy field names (`service`, `date`, `time`, `address`, `notes`) and
descriptive names are sent for flexible GHL field mapping.

## Anti-Spam (implemented)

- **Honeypot field** (`#website` input, hidden via CSS) — bots fill it in; form silently rejects submission
- **localStorage rate limiting** — prevents re-submission from same browser within 60 seconds

## Estimate Logic

Service base price ranges:
| Service | Base Range |
|---------|------------|
| Tile Installation | $500 – $900 |
| Bathroom Remodel | $3,500 – $6,000 |
| Kitchen Remodel | $5,000 – $12,000 |
| Flooring | $800 – $2,000 |
| Home Addition | $10,000 – $30,000 |
| Commercial | Custom Quote |

Project size multipliers: Small 0.75×, Medium 1.0×, Large 1.6×, Full Home 2.4×, Commercial → Custom.

## Business Info (update to real values before launch)

- **Company:** Apex Tile & Remodeling
- **Phone:** `(210) 555-0200` — replace with real number
- **Email:** `info@apextileremodeling.com` — replace with real email
- **Webhook:** Replace `YOUR_GHL_WEBHOOK_URL` in `index.html`

## Schema.org

`index.html` contains a `LocalBusiness` JSON-LD block with types
`HomeAndConstructionBusiness` and `GeneralContractor`. Update:
- `telephone`, `email`, `url` — real values
- `aggregateRating.reviewCount` — real review count when available

## Analytics

No GA4 tag is included by default. To add Google Analytics 4:
1. Get your Measurement ID (G-XXXXXXXXXX) from the GA4 dashboard
2. Add the GA4 script tag to `<head>` in `index.html` (and optionally other pages)

## Deployment

Pure static HTML — no build step. Deploy to GitHub Pages, Netlify, or Vercel.
All 4 HTML files sit at the repo root.

## Known Post-MVP Items

- Replace phone, email, and webhook URL with real values
- Add Google Analytics 4 tag
- Update Schema.org `reviewCount` with real data
- Consider embedding Google Reviews widget for live testimonials
- Stats (800+ projects, 4.9★, 12+ years) are hardcoded — update when real data available
- No professional photography — uses emoji icons only
- No service area subpages
- No real-time scheduling / availability calendar
- No payment / deposit collection (Stripe not integrated)
- Consider proxying the webhook through a Netlify/Vercel serverless function to hide URL
