import { adminAuth, adminDb } from '../../lib/firebaseAdmin';

async function handler(req, res) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authorization.split('Bearer ')[1];

  try {
    // Verify the ID token sent from the client
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Fetch data from Firestore for the authenticated user
    const clothingItemsRef = adminDb.collection('clothing_items');
    const snapshot = await clothingItemsRef.where('userId', '==', uid).get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(items);
  } catch (error) {
    console.error("API route error:", error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

export default handler;