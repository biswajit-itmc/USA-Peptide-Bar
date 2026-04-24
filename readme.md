# USA Peptide Bar - Backend

Simple Node.js + TypeScript + express API with authentication and PostgreSQL + knex.


src/
│
├── config/            # App & DB config
├── database/          # DB setup
│   ├── migrations/    # Schema changes
│   ├── seeds/         # Seed data
│
├── db/                # DB connection
├── middlewares/       # Express middlewares
│
├── modules/
│   └── auth/          # Auth module
│      
│
├── routes/            # Main route handler
│   └── index.ts
│
├── utils/             # Helpers
│   ├── jwt.ts
│   ├── password.ts
│   ├── response.ts
│
├── app.ts             # Express app setup
└── server.ts          # Server entry point

This is only given to You form knowing my backend project structure.