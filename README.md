# Local Buddy - Grocery eCommerce MVP

A full-stack grocery delivery application built with Flask and React.

## Features
- **User Auth**: JWT-based registration and login.
- **Product Discovery**: 50+ items with categories and search.
- **Cart Management**: Add/remove items, update quantities.
- **Smart Checkout**: Address auto-fill using browser geolocation and OpenStreetMap.
- **Payments**: Razorpay integration (Test mode) and Cash on Delivery.
- **Admin Dashboard**: Overview of orders and inventory.

## Setup Instructions

### Backend (Python/Flask)
1. Navigate to `backend/`
2. Activate virtual environment: `.\venv\Scripts\Activate.ps1`
3. Run the server: `py app.py` (Runs on http://localhost:5000)

### Frontend (React/Vite)
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev` (Runs on http://localhost:5173)

## Environment Variables
Create a `.env` file in `backend/` with:
```
SECRET_KEY=your_secret
JWT_SECRET_KEY=your_jwt_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

## Credits
- **UI Icons**: Lucide React
- **Animations**: Framer Motion
- **Images**: Unsplash
- **Styling**: Tailwind CSS
