import { FileIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
 
export default function ThankYou() {
  return (
    <main className="min-h-screen bg-[#F4F7EA] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
          <FileIcon className="w-8 h-8 text-[#1A1A1A]" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-[#1A1A1A]">Thank You</h1>
        <p className="text-gray-600 mb-8">
          Your information was submitted to our team of immigration attorneys. 
          Expect an email from hello@tryalma.ai
        </p>
        <Link href="/">
          <Button 
            variant="outline" 
            className="bg-[#1A1A1A] text-white hover:bg-gray-900 border-0 h-12 px-6 rounded-xl"
          >
            Go Back to Homepage
          </Button>
        </Link>
      </div>
    </main>
  );
}