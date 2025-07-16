// this cant use transaction() on order.actions
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import * as schema from "./schema";
// const sql = neon(process.env.POSTGRES_URL!);

// const db = drizzle(sql, { schema });

// export default db;
// ---
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";
import ws from "ws"; // Import the ws package

// Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

// Initialize Pool with your database URL
const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

// Create Drizzle instance with WebSocket-based client
const db = drizzle({ client: pool, schema });

export default db;
