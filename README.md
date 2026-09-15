# Leafy Interior Ghana

Next.js e-commerce site for a faux plants, flower pots, and figurine decor store based in Accra,
Ghana. Firestore for data, Firebase Auth for a single admin login, Cloudinary for product images,
Zustand for cart state, Framer Motion for the fly-to-cart animation, and a WhatsApp deep link
instead of a payment gateway at checkout.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables** — copy `.env.example` to `.env.local` and fill in:
   - Your Firebase project's web config (`NEXT_PUBLIC_FIREBASE_*`)
   - `NEXT_PUBLIC_ADMIN_UID` — the single Firebase Auth UID allowed into `/admin`
   - Your Cloudinary `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and an **unsigned** upload preset as
     `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
   - `NEXT_PUBLIC_STORE_WHATSAPP_NUMBER` — digits only, with country code (e.g. `233555000111`)

3. **Firebase project**
   - Enable **Firestore** and **Authentication → Email/Password**.
   - Create one admin user under Authentication, copy their UID into `NEXT_PUBLIC_ADMIN_UID`.
   - In `firestore.rules`, replace `REPLACE_WITH_ADMIN_UID` with that same UID, then deploy:
     ```bash
     firebase deploy --only firestore:rules
     ```

4. **Cloudinary**
   - Create an unsigned upload preset (Settings → Upload → Upload presets → Add upload preset,
     set Signing Mode to "Unsigned"). Product images upload directly from the browser in
     `/admin` using this preset.

5. **Run the app**

   ```bash
   npm run dev
   ```

   Visit `/admin` to sign in and add your first categories and products — the storefront reads
   directly from Firestore, so nothing appears on the home/shop pages until products exist there.

## Data model

- `categories` — `{ name, slug, type: "plant" | "pot" | "figurine-home" | "figurine-office", coverImageUrl }`
- `products` — `{ name, slug, categoryId, description, basePrice, images[], featured, inStock, variants[], allowsPotAddon, colorOptions[], sizeOptions[] }`
  - Flower pots are just `products` under a category with `type: "pot"` (conventionally slugged
    `flower-pots`) — their `colorOptions`/`sizeOptions` power the "Add a pot?" step on any product
    with `allowsPotAddon: true`.

## Checkout flow

Cart state lives in `localStorage` (Zustand) — there's no server-side order record. `/checkout`
collects the customer's name/phone/address/landmark, then `/checkout/confirm` builds an itemized
message and opens `wa.me/<store number>` with it pre-filled.
