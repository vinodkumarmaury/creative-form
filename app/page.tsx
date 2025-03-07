import Link from 'next/link';
import Image from 'next/image';
import LeadForm from '@/components/LeadForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#191918]">
      <div className="max-w-4xl mx-auto px-4 py-12 bg-red-100 rounded-2xl shadow-sm">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold">alama</h1>
          <p className="mt-4 text-xl text-gray-700">
            Get An Assessment Of Your Immigration Case
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <LeadForm />
        </div>
      </div>
    </main>
  );
}