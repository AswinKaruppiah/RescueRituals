# 🐾 RescueRituals — Events Module (Frontend)

An engaging, high-performance, and responsive **Events Module UI** built for consumer platforms. Discover, RSVP, filter, create, and manage community gatherings, animal rescue drives, sound healing rituals, and workshops with real-time cloud persistence.

---

## 🚀 Live Demo & Links

- **Live URL**: [https://rescuerituals-assignment.vercel.app/](https://rescuerituals-assignment.vercel.app/)
- **GitHub Repository**: `[Insert your GitHub repo URL here]`
- **Video Walkthrough**: `[Insert Loom walkthrough link here]`

---

## 🌟 Key Features & Scope Breakdown

### 1. 🔍 Event Browse & Discovery View (`/`)
- **Category Filter Pills**: Filter across *All*, *Animal Rescue*, *Wellness*, *Workshops*, *Eco & Nature*, *Music & Arts*, and *Community*.
- **Search Bar**: Instant real-time filtering across titles, descriptions, categories, and locations.
- **Hero Carousel Banner**: Dynamic featured gathering carousel with indicator dots, smooth navigation, and category tags.
- **Card-Level Quick RSVP**: Attend or cancel reservations directly from event cards with real-time spot updates.
- **Capacity Indicators**: Clear display of spots filled (`{attendeesCount} / {capacity}`), with a **`SLOTS FULL`** chip and disabled buttons when capacity is reached.
- **Skeleton Loaders & Empty States**: Polished loading skeletons during cloud fetch and intuitive zero-data screens.

### 2. 📄 Comprehensive Event Detail View (`/events/:id`)
- **Media Hero Banner**: Visual header with full-bleed imagery and quick back navigation.
- **Detailed Gathering Overview**: Title, category, full description, formatted date/time, and complete location details.
- **Live Attendance & Capacity Progress**: Visual capacity progress bar that dynamically fills and turns **red** when full.
- **RSVP Confirmation Modal**: Confirmation dialog before locking in reservations.
- **Share Event**: 1-click clipboard link copying with instant feedback toast notifications.
- **404 Handling**: Dedicated "Event Not Found" screen if navigating to an invalid or deleted event ID.

### 3. ✍️ Organizer & Host Portal (`/host`)
- **Host Metrics Dashboard**: Summary cards displaying *Total Hosted Events*, *Open Listings*, and *Closed Events*.
- **Create / Edit Event Modal**:
  - Event Title & Full Description
  - Date & Time pickers
  - Venue / Location address
  - Category dropdown
  - Capacity (max attendees) & Admission Pricing (Free / Paid)
  - Cover Image URL with 4 quick Unsplash presets
- **Full Cloud CRUD**: Add new gatherings or update existing listings with instant synchronization to the cloud database.
- **"I'm Coming" Attendee Portal**: Dedicated tab listing all events the current user has RSVP'd to, with 1-click cancellation.

### 4. 🎟️ RSVP & Identity System
- **Persistent User ID**: Automatically generates and stores a persistent user identifier in `localStorage` (`usr_...`).
- **Host Self-RSVP Protection**: Hosts cannot RSVP to their own listings (`You're the Host` badge is shown).
- **Slot Capacity Guard**: Prevents new RSVPs when max capacity is reached while allowing attendees to cancel their spot.

---

## ☁️ Cloud Database Architecture

The application connects to a live RESTful cloud database powered by **JSONBin.io (v3)**:

- **Environment Config**: Strictly bound via `VITE_JSONBIN_BIN_ID` and `VITE_JSONBIN_API_KEY`.
- **Granular Loading State (`mutatingId`)**: Disables and shows spinners exclusively on the active button/action without blocking the global interface.
- **Toast Feedback**: Real-time notifications for success, capacity errors, and network alerts.

---

## 🛠️ Tech Stack

- **Framework**: React 18 (SPA)
- **Build Tool**: Vite 5
- **Routing**: React Router DOM (v6)
- **Styling**: Tailwind CSS & Vanilla CSS (Dark Glassmorphism UI)
- **UI Components & Icons**: Lucide React & HeroUI (Modals)
- **Cloud Database**: JSONBin.io v3 REST API
- **State Management**: React Context API (`EventContext`) + Custom Hook (`useEvents`)

---

## 💻 Local Setup & Development

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd RescueRituals
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
VITE_JSONBIN_BIN_ID="your_jsonbin_bin_id"
VITE_JSONBIN_API_KEY="your_jsonbin_access_key"
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Production Build & Verification
```bash
npm run build
```

---

## 🌐 Deployment (Vercel / Netlify)

### Vercel Deployment:
1. Push the repository to GitHub.
2. In Vercel, click **Add New Project** and import the repository.
3. In **Environment Variables**, add:
   - `VITE_JSONBIN_BIN_ID` = `your_bin_id`
   - `VITE_JSONBIN_API_KEY` = `your_api_key`
4. Click **Deploy**.

### Netlify Deployment:
1. Select **Import from Git** in Netlify.
2. Set Build Command to `npm run build` and Publish directory to `dist`.
3. Under **Site Configuration > Environment Variables**, add your `VITE_JSONBIN_BIN_ID` and `VITE_JSONBIN_API_KEY`.
4. Deploy site.
