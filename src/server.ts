import { app } from "./app.js";
import { env } from "./config/env.js";

const start = () => {
  try {
    const server = app.listen(env.port, () => {
      console.log(`🚀 Server is running on http://localhost:${env.port}`);
    });

    // Error handling for port in use
    server.on('error', (e: any) => {
      if (e.code === 'EADDRINUSE') {
        console.error(`❌ Port ${env.port} is already in use!`);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error("💥 Failed to start server:", error);
    process.exit(1);
  }
};

start();