# 🩸 BloodBridge

BloodBridge is a full-stack blood donation platform that connects blood donors with recipients in need. It allows users to register as donors, manage their donation history, and securely log in and update their profiles. The project aims to streamline blood availability and make donor-recipient communication efficient.

## 📌 Features

- 🔐 **Authentication**: Donors can securely sign up, log in, and manage their accounts.
- 👤 **Donor Profile Management**: Update personal info such as blood group, location, last donation date, and availability.
- 🕓 **Donation History**: Logged-in users can view their past donations and keep track of their contribution.
- 🎯 **Smart Search**: Find donors by blood group, location, or availability.
- 🧠 **Clean UI**: Built using Radix UI and Tailwind CSS for an accessible and responsive experience.
- 💬 **Postman Tested API**: All backend routes are tested using Postman for reliability.

---

## 🛠 Tech Stack

**Frontend:**

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Radix UI

**Backend:**

- Next.js API Routes
- Prisma ORM
- PostgreSQL
- JWT for Authentication

**Tools & Utilities:**

- Postman for API testing
- Vercel for deployment
- Git & GitHub for version control

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nafiznayan/BloodBridge.git
cd BloodBridge
```

### 2. Install dependencies

npm install

### 3. Configure environment variables

Create a .env file in the root directory and add:

DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

NEXTAUTH_URL="http://localhost:3000"

NEXTAUTH_SECRET="your-secret-key-here"

JWT_SECRET="your_jwt_secret"

### 4. Set up Prisma

npx prisma generate
npx prisma migrate dev --name init

### 5. Run the development server

npm run dev
