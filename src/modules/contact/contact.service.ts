import { db } from "../../db/knex.js"; // apne path ke hisaab se adjust kar lena

export const saveMessage = async (data: any) => {
  return db("contact_messages").insert(data);
};

export const getAllMessages = async () => {
  return db("contact_messages")
    .select("*")
    .orderBy("created_at", "desc");
};