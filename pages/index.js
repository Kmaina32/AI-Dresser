import { useUser, useSignIn } from "@stackframe/stack";
import { useRouter } from 'next/router';

export default function LandingPage() {
  const user = useUser();
  const signIn = useSignIn();
  const router = useRouter();

  const handleGetStarted = () => {
    // This function will open the Stack sign-in modal
    signIn();
  };

  // If the user is already logged in, redirect them to a dashboard page
  // or show them a different view.
  if (user) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Welcome back, {user.displayName || 'Dresser'}!</h1>
        <p>You are already logged in.</p>
        <button onClick={() => router.push('/dashboard')}>Go to Your Dashboard</button>
      </div>
    );
  }

  // If the user is not logged in, show the "Get Started" button.
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to AI-Dresser</h1>
      <p>Your personal AI-powered wardrobe assistant.</p>
      <button 
        onClick={handleGetStarted} 
        style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer' }}
      >
        Get Started
      </button>
    </div>
  );
}