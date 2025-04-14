# 🎬 Cinema Booking Demo App

This is a full-stack cinema booking system developed for demo purposes using **Laravel (Backend)** and **React Native (Frontend via Expo)**. It demonstrates key booking features including real-time seat locking with polling, user flows from movie selection to ticket confirmation, and an API testing setup using **Bruno**.

---

## 🧰 Tech Stack

| Layer     | Technology            |
|-----------|------------------------|
| Frontend  | React Native (Expo)   |
| Backend   | Laravel 12            |
| Database  | MySQL / MariaDB       |
| API Tool  | Bruno (as Swagger UI alternative) |
| Real-time | Polling (every 5s)    |
| Scheduling | Laravel Scheduler (via `php artisan schedule:work`) |

---

## 📂 Project Structure

```
/backend          -> Laravel source code
/mobile-app       -> React Native mobile app (using Expo)
```

---

## 🔧 Backend Setup (Laravel)

1. Clone the repo and install dependencies:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

2. Update `.env` with your database credentials.

3. Run migrations and seeders:

```bash
php artisan migrate --seed
```

4. Start the Laravel server:

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

---

### 🔁 Real-time Seat Lock Demo (Scheduler)

To simulate real-time locked seats every minute (max 10):

```bash
php artisan schedule:work
```

This uses a scheduler that **randomly locks 1 seat every minute** for demo purposes. Locked seats expire in 5 minutes.

---

## 📱 Frontend Setup (React Native Expo)

1. Navigate to the mobile app folder and install dependencies:

```bash
cd mobile-app
npm install
```

2. Start the app:

```bash
npx expo start
```

3. **Scan QR Code using Expo Go app** on your mobile phone to open the app.

Make sure the API base URL in your app points to your Laravel backend (e.g. via `lib/api.js`).

---

## 🧪 API Testing with Bruno

Instead of Swagger, Bruno is used to organize API requests.

Located in:

```
/mobile-bruno/
```

**To test APIs:**

- Open Bruno and load the `.bru` files (`Get Seats.bru`, `Get Movies.bru`, etc.)
- Hit the endpoints to test lock/unlock and booking flow

---

## ✅ Locking Logic Summary

- Seat is locked via `POST /api/seats/lock`
- Locked seats expire automatically after 5 minutes
- Polling every 5 seconds on the frontend reflects updated seat states
- Locking is session-based (`locked_by`, `locked_at`)

---

## 📌 Testing the Scenario

To simulate:

> _“User 1 first accessed the seating plan screen, seat A3 was vacant and as User 2 starts booking on seat A3, User 1’s seating plan will show A3 as being locked...”_

### Steps:

1. Start Laravel with `php artisan serve --host=0.0.0.0 --port=8000`
2. Run scheduler with `php artisan schedule:work`
3. Launch the Expo app (mobile-app)
4. Navigate to the seat selection screen
5. Wait and observe that seats are gradually locked in real-time every minute (up to 10)

---

## 🧑‍💻 Contributors

- Backend & API: Laravel 12
- Mobile Frontend: React Native (Expo)
- Docs & Testing: Bruno API Collection

---

## 🚀 Deployment Notes

- Consider using Laravel Queue for async operations
- For production real-time, consider upgrading to WebSockets or Pusher
- All endpoints follow RESTful conventions
- Stateless API design used