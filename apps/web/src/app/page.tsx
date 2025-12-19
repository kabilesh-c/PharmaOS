import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-yellow-light via-cream-100 to-cream-200">
      <div className="w-full max-w-lg p-8 bg-white rounded-card shadow-card text-center space-y-6">
        <div className="space-y-2">
          <div className="w-20 h-20 mx-auto bg-primary-yellow rounded-full flex items-center justify-center text-3xl font-bold text-neutral-800">
            Rx
          </div>
          <h1 className="text-4xl font-bold text-neutral-900">Pharmacy Operations</h1>
          <p className="text-neutral-600">AI-powered pharmacy management platform</p>
        </div>
        
        <div className="flex flex-col gap-4 pt-4">
          <Link 
            href="/login"
            className="w-full py-4 px-6 bg-primary-yellow hover:bg-primary-yellow-dark text-neutral-900 font-semibold rounded-button transition-colors"
          >
            Log In
          </Link>
          <Link 
            href="/signup"
            className="w-full py-4 px-6 border-2 border-neutral-300 hover:border-neutral-400 text-neutral-900 font-semibold rounded-button transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
