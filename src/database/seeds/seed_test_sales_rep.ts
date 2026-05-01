import { Knex } from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("sales_reps").del();

    const passwordHash = await bcrypt.hash("Password@123", 10);

    // Inserts seed entries
    await knex("sales_reps").insert([
        {
            rep_id: "REP001",
            name: "John Sales",
            email: "john@elitepharm.com",
            password_hash: passwordHash,
            commission_rate: 0.10,
            role: "sales_rep"
        },
        {
            rep_id: "REP002",
            name: "Sarah Representative",
            email: "sarah@elitepharm.com",
            password_hash: passwordHash,
            commission_rate: 0.15,
            role: "sales_rep"
        }
    ]);
}
