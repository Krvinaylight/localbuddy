# 🚀 Deployment Guide (Local Buddy)

Follow these steps to take your website live!

## 1. Backend & Database (Render)
We recommend **Render** for hosting the Python backend.

### Steps:
1.  **Push to GitHub**: Make sure your code is on a private/public GitHub repo.
2.  **Create Web Service**: In Render, select **"Web Service"** and connect your GitHub repo.
3.  **Environment**: Choose **Python** as the runtime.
4.  **Build Command**: `pip install -r requirements.txt`
5.  **Start Command**: `gunicorn app:app`
6.  **Add Database**: In Render, create a **PostgreSQL** database. 
7.  **Environment Variables**: Set `SQLALCHEMY_DATABASE_URI` to your Render Database URL.
8.  **Other Envs**: Set `SECRET_KEY`, `JWT_SECRET_KEY`, `RAZORPAY_KEY_ID`, and `RAZORPAY_KEY_SECRET`.

## 2. Frontend (Vercel)
We recommend **Vercel** for the React frontend.

### Steps:
1.  **Update API URL**: Open `frontend/src/services/api.js` and change the `baseURL` to your **Render Backend URL**.
2.  **Push to GitHub**: Commit and push this change.
3.  **Connect to Vercel**: In Vercel dashboard, click **"Add New Project"** and select your repo.
4.  **Framework**: It should auto-detect **Vite**.
5.  **Build Command**: `npm run build`
6.  **Output Directory**: `dist`
7.  **Deploy**: Click Deploy! Your site will be live at `something.vercel.app`.

## 3. Important Notes
- **CORS**: Ensure your backend `CORS(app)` allows your Vercel URL.
- **SSL**: Both Render and Vercel provide free SSL (HTTPS), which is required for Razorpay.
- **Seeding**: Once the backend is live, you can run `python seed.py` (locally pointing to the remote DB) to populate your live site.
