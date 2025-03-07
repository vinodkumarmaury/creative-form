"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { FaGlobe, FaHeart } from 'react-icons/fa';
import { IoIosSpeedometer } from "react-icons/io";

// Update your VisaType to include "I don't know"
export type VisaType = 'O-1' | 'EB-1A' | 'EB-2 NIW' | "I don't know";

export type LeadFormData = {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  country: string;
  visas: VisaType[];
  resume: File | null;
  notes: string;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  linkedin: z.string().url('Invalid LinkedIn URL'),
  country: z.string().min(1, 'Country is required'),
  visas: z.array(z.string()).min(1, 'Please select at least one visa type'),
  resume: z.any()
    .refine((file) => file instanceof File, 'Please upload your resume')
    .refine((file) => file?.size <= MAX_FILE_SIZE, 'File size must be less than 5MB')
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      'Only PDF and Word documents are accepted'
    ),
  notes: z.string().min(1, 'Please provide some details about your case'),
});

const visaOptions: { label: string; value: VisaType }[] = [
  { label: 'O-1 Visa', value: 'O-1' },
  { label: 'EB-1A Visa', value: 'EB-1A' },
  { label: 'EB-2 NIW', value: 'EB-2 NIW' },
  { label: "I don&apos;t know", value: "I don't know" }, 
];

const countries = [
  'United States', 'Mexico', 'Canada', 'Brazil', 'France', 'Germany', 
  'United Kingdom', 'China', 'Japan', 'South Korea', 'India', 'Australia'
];

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      linkedin: '',
      country: '',
      visas: [],
      notes: '',
      resume: null,
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      // In a real application, you would upload the file and submit the form data to your API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      toast.success('Form submitted successfully!');
      setSubmitted(true);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Thank you for your application!</h2>
        <p className="text-gray-600 mb-6">We&apos;ve received your information and will be in touch shortly.</p>
        <Button 
          onClick={() => setSubmitted(false)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-xl"
        >
          Submit another application
        </Button> 
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
      <div className="flex justify-center mb-8">
        <FaGlobe className="h-16 w-16 text-blue-600" />
      </div>
      <h2 className="text-3xl font-bold mb-4 text-center">Want to understand your visa options?</h2>
      <p className="text-lg text-center mb-8">
        Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">First Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John" 
                      {...field} 
                      className="h-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Doe" 
                      {...field} 
                      className="h-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    {...field} 
                    className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">LinkedIn Profile</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://linkedin.com/in/johndoe" 
                    {...field} 
                    className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Country of Residence</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            {/* Updated icon above the label */}
            <div className="flex justify-center">
              <IoIosSpeedometer className="h-16 w-16 text-blue-600" />
            </div>
            <FormLabel className="text-sm font-medium text-gray-700 block mb-2">
              <div>Visa categories of interest?</div>
            </FormLabel>
            {visaOptions.map((option) => (
              <FormField
                key={option.value}
                control={form.control}
                name="visas"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...(field.value || []), option.value]
                            : field.value?.filter((value) => value !== option.value) || [];
                          field.onChange(updatedValue);
                        }}
                        className="h-5 w-5 rounded-md border-2 border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                      />
                    </FormControl>
                    <FormLabel className="text-base font-normal text-gray-700 cursor-pointer">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
            <FormMessage />
          </div>

          <FormField
            control={form.control}
            name="resume"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Resume / CV</FormLabel>
                <div className="mt-1">
                  <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed rounded-xl border-gray-300 cursor-pointer hover:border-gray-400 focus:outline-none">
                    <div className="space-y-1 text-center">
                      <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-blue-600 hover:underline">
                          Upload a file
                        </span>
                        <span> or drag and drop</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX up to 10MB
                      </p>
                      {value && <p className="text-sm text-green-600">{typeof value === 'string' ? value : value.name}</p>}
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                      {...field}
                    />
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">How can we help you?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your immigration goals, current situation, and any specific questions you have..."
                    className="min-h-[120px] rounded-xl border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl font-medium text-lg shadow-md transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Spinner className="mr-2 h-4 w-4 animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : "Submit Application"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

// Add this interface before your icon components 
interface IconProps extends React.SVGProps<SVGSVGElement> {}

// Fix the TypeScript errors in icon components
function DocumentIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}

function CheckIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function Spinner(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" className="opacity-25" />
    </svg>
  );
}