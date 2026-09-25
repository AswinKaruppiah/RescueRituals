# 🐾 RescueRituals — Events Module (Frontend)

An engaging, high-performance **Events Module UI** built for consumer platforms. Discover, RSVP, filter, create, and manage community gatherings, animal rescue drives, sound healing rituals, and developer workshops.

---

## 🚀 Live Demo & Deployment

- **Live URL**: *(Deploy to Vercel / Netlify with 1 click)*
- **GitHub Repository**: `d:\Personal_WS\Assignments\RescueRituals`
- **Video Walkthrough**: *(Loom walkthrough covering UI/UX, state management, and architecture)*

---

## ✨ Features & Scope Breakdown

### 1. 🔍 Event Browse & Discovery View (`/`)
- **Category Filter Pills**: Filter across *Animal Rescue & Welfare*, *Wellness & Rituals*, *Workshops & Tech*, *Eco & Nature*, *Music & Arts*, and *Community & Social*.
- **Multi-parameter Search Bar**: Instant real-time search across event titles, topics, city, descriptions, and tags.
- **Format Toggle**: Filter by *In-Person*, *Virtual Livestream*, or *All Formats*.
- **Date Presets**: Quick filter tabs for *Today*, *This Week*, *This Weekend*, *Upcoming*, and *Anytime*.
- **Custom Sorting**: Sort by earliest date, latest date, popularity, or spots remaining.
- **Featured Spotlights**: Highlighted hero carousel for flagship community events.

### 2. 📄 Comprehensive Event Detail View (`/events/:id`)
- **Media Hero & Badges**: High-res imagery, format badge, category tag, and pricing indicator.
- **Interactive Sticky RSVP Box**: Live spots counter, capacity progress bar, and 1-click status switcher (*Going*, *Interested*, *Cancelled*).
- **Date & Calendar Integration**: One-click **Export to Calendar (`.ics`)** compatible with Google Calendar, Apple Calendar, and Outlook.
- **Agenda & Schedule Timeline**: Formatted chronological schedule for multi-session workshops.
- **Verified Host / Organizer Card**: Host bio, verified status badge, and organizer contact details.
- **Live Attendee Avatars**: Real-time list of who is attending.
- **Quick Share & Link Copy**: Instant clipboard sharing with feedback notifications.

### 3. ✍️ Create & Edit Event Form (`/create` & `/edit/:id`)
- **Full CRUD Support**: Create new listings or update existing events with immediate UI updates.
- **Form Fields**:
  - Event Title & Short Catchy Tagline
  - Category selector & Format toggle (In-Person venue vs. Virtual streaming link)
  - Full multi-line description
  - Date, Start Time, and End Time
  - Venue name, street address, and city (or Virtual meeting link)
  - 6 One-Click Unsplash cover presets + custom image URL support
  - Capacity (max spots), entry pricing, and custom tags
- **Live Preview Tab**: Interactive preview allowing organizers to inspect their event before publishing.
- **Validation**: Form error checks for required fields.

### 4. 🎟️ Interactive RSVP & Attendee System
- **Quick RSVP Modal**: Modal with attendee name, email, dietary/custom note, and instant calendar download.
- **Optimistic State Updates**: Zero-latency UI updates to attendee counts and spots remaining.
- **My RSVPs Dashboard (`/my-rsvps`)**: Dedicated view of confirmed reservations and saved bookmarks.

---

## 🛠️ Tech Stack

- **Framework**: React 18 (TypeScript)
- **Styling**: Tailwind CSS (with custom glassmorphism, responsive grids, and subtle glow effects)
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Data & Persistence**: `EventService` layer simulating an asynchronous REST backend API with `localStorage` persistence and rich seed data.
- **Build Tool**: Vite 5

---

## 💻 Local Setup & Development

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd RescueRituals
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🌐 Deploying to Vercel / Netlify

### Option A: Vercel
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Framework Preset: **Vite**.
5. Click **Deploy**.

### Option B: Netlify
1. Go to [Netlify](https://netlify.com) and select **"Import from Git"**.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy Site**.
