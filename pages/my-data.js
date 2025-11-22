import { withStackFromServer } from "@stackframe/stack-next";
import db from "../../lib/db"; // Import our database pool

async function handler(req, res) {
  // The 'user' object is automatically attached to the request by the middleware.
  // If the user is not authenticated, the middleware will return a 401 Unauthorized error.
  const user = req.user;

  try {
    // Example: Fetch items from a 'todos' table that belong to the logged-in user
    // This assumes you have a 'todos' table with a 'user_id' column.
    const { rows } = await db.query('SELECT * FROM todos WHERE user_id = $1', [user.id]);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Wrap the handler with Stack's middleware to protect the route
export default withStackFromServer(handler);