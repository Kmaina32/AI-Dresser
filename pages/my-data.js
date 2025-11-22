import { withStackFromServer } from "@stackframe/stack-next";
import db from "../../lib/db"; // Import our database pool

async function handler(req, res) {
  // The 'user' object is automatically attached to the request by the middleware.
  // If the user is not authenticated, the middleware will return a 401 Unauthorized error.
  const user = req.user;

  try {
    // Fetch clothing items that belong to the currently authenticated user.
    // This correctly uses your 'clothing_items' table schema.
    const { rows } = await db.query('SELECT id, name, category, color FROM clothing_items WHERE user_id = $1', [user.id]);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Wrap the handler with Stack's middleware to protect the route
export default withStackFromServer(handler);