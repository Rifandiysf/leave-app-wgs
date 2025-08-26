A full-stack web application designed to manage employee leave requests, featuring distinct roles
  for regular employees and administrators.

  Key Features

   - User Authentication: Secure login system for employees and admins.
   - Dual User Roles:
       - Admin: Can manage employee data, view all leave requests, manage leave quotas (mandatory and
         special), and view dashboards.
       - Employee: Can apply for leave, view their leave history, check their remaining leave balance,
         and view company information.
   - Leave Management:
       - Apply for different types of leave.
       - Admins can approve or reject leave requests.
       - Automatic tracking of leave balances.
   - Dashboard: Visual representation of leave data and statistics.

  Tech Stack

   - Backend:
       - Node.js
       - Express.js
       - Prisma (ORM)
       - PostgreSQL (or any other SQL database compatible with Prisma)
   - Frontend:
       - Next.js
       - React
       - TypeScript
       - Tailwind CSS

  Installation and Setup

  Follow these steps to run the project locally.

  Prerequisites

   - Node.js (https://nodejs.org/) (v18 or later)
   - NPM (https://www.npmjs.com/) or Yarn (https://yarnpkg.com/)
   - Git (https://git-scm.com/)
   - PostgreSQL (https://www.postgresql.org/download/) (or another database)

  ---

  1. Backend Setup

  First, set up the server which handles the application logic and API.

   1 # 1. Navigate to the server directory
   2 cd server
   3
   4 # 2. Copy the example environment file
   5 cp .env.example .env

  3. Configure Environment Variables

  Open the newly created .env file and fill in the required variables, especially the DATABASE_URL.

  Example DATABASE_URL for PostgreSQL:
  POSTGRESQL_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

    1 # 4. Install dependencies
    2 npm install
    3
    4 # 5. Apply database migrations
    5 npx prisma migrate dev
    6
    7 # 6. (Optional) Seed the database with initial data
    8 # Check package.json for the exact seed script, it might be npm run seed
    9 npx prisma db seed
   10
   11 # 7. Start the backend server
   12 npm run dev

  The server should now be running on the port specified in your .env file (e.g.,
  http://localhost:3001).

  ---

  2. Frontend Setup

  Next, set up the client-side application.

   1 # 1. Open a new terminal and navigate to the client directory
   2 cd client
   3
   4 # 2. Copy the example environment file
   5 cp .env.example .env

  3. Configure Environment Variables

  Open the .env file and set the NEXT_PUBLIC_API_URL to point to your running backend server.

  NEXT_PUBLIC_API_URL=http://localhost:3001/api

   1 # 4. Install dependencies
   2 npm install
   3 
   4 # 5. Start the frontend development server
   5 npm run dev
   testing