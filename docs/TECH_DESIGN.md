## Overview

This project is a personal landing page (single-user CMS) with editable content, durable storage, and a clean user experience. It was completed in a 90-minute self-recorded session, using AI as a pair programming assistant in "ask mode" to accelerate specific tasks.

---

## Architecture

### Stack

- **Next.js App Router** for routing and server-side logic
- **TypeScript** across the stack
- **Turso (SQLite)** for lightweight, local, durable persistence
- **Drizzle ORM** for schema-first database interaction
- **React Hook Form + Yup** for form handling and validation
- **TailwindCSS** for styling
- **react-hot-toast** for clean user feedback and UX polish

---

## Routes

### `/`

- Displays profile fields in a clean card layout
- Pulls data from Turso via Drizzle using a `GET` API route
- Read-only

### `/edit`

- Displays a form prefilled with current profile data
- Uses React Hook Form + Yup for validation
- Submits via `POST` to update the database
- Shows toast messages for success and error states

---

## Data Flow

1. On app start, `GET /api/profile` pulls the current profile from Turso.
2. Data is displayed on the root route (`/`) as a read-only card.
3. On `/edit`, the form is pre-filled using the same API.
4. Submitting the form sends a `POST` to `/api/profile`.
5. The backend validates data using Yup and Drizzle ORM.
6. Upon success, the user is redirected back to `/` with updated content.

---

## Database

Stored via Turso (SQLite), with a single table: `profile`

| Field    | Type | Notes                         |
| -------- | ---- | ----------------------------- |
| name     | text | Full name                     |
| location | text | Geographic location           |
| imageUrl | text | Link to avatar or profile pic |
| headline | text | Short professional tagline    |
| bio      | text | Multi-line about me section   |

Defined in:

- `src/db/schema.sql`
- `src/db/schema.ts`

---

## Tradeoffs & Considerations

- **Chose Turso** for fast local setup and SQLite durability
- **Used RHF over custom form state** for faster integration and clearer validation
- **Chose Yup over Zod** for familiarity and speed, though both are valid
- Could extend to support multiple users or auth in a real product

---

## Closing

This implementation was designed to reflect how I work: with care, clarity, and speed. My focus was delivering a clean, working MVP that reflects strong architectural thinking and thoughtful decisions under time constraints.
