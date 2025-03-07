"use client";

import { LogOut } from 'lucide-react'; // Import the LogOut icon

export default function SettingsPage() {
  // Add a handleSignOut function
  const handleSignOut = () => {
    // Add your sign out logic here
    console.log("Signing out...");
    // Redirect to login page or clear auth state
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <p className="text-gray-600 mb-8">Manage your account settings and preferences.</p>
          
          {/* Sign out button */}
          <div className="border-t pt-6 mt-6">
            <button 
              onClick={handleSignOut}
              className="flex items-center px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div> 
  );
}