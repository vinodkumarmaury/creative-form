"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar } from '@/components/ui/avatar';
import { Lead } from '@/app/types';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Mock data
const mockLeads: Lead[] = [
  { 
    id: '1',
    firstName: 'Jorge',
    lastName: 'Ruiz',
    email: 'jorge@example.com',
    linkedin: 'https://linkedin.com/in/jorge',
    visas: ['O-1'],
    resumeUrl: '/resumes/jorge.pdf',
    notes: 'Interested in O-1 visa',
    status: 'PENDING',
    createdAt: '2024-02-02T14:45:00Z',
    country: 'Mexico'
  },
  {
    id: '2',
    firstName: 'Bahar',
    lastName: 'Zamir',
    email: 'bahar@example.com',
    linkedin: 'https://linkedin.com/in/bahar',
    visas: ['EB-1A'],
    resumeUrl: '/resumes/bahar.pdf',
    notes: 'Looking for EB-1A options',
    status: 'PENDING',
    createdAt: '2024-02-02T14:45:00Z',
    country: 'Mexico'
  },
  {
    id: '3',
    firstName: 'Mary',
    lastName: 'Lopez',
    email: 'mary@example.com',
    linkedin: 'https://linkedin.com/in/mary',
    visas: ['O-1'],
    resumeUrl: '/resumes/mary.pdf',
    notes: 'Interested in O-1 visa',
    status: 'PENDING',
    createdAt: '2024-02-02T14:45:00Z',
    country: 'Brazil'
  },
  {
    id: '4',
    firstName: 'Li',
    lastName: 'Zijin',
    email: 'li@example.com',
    linkedin: 'https://linkedin.com/in/li',
    visas: ['EB-2 NIW'],
    resumeUrl: '/resumes/li.pdf',
    notes: 'Exploring EB-2 NIW options',
    status: 'REACHED_OUT',
    createdAt: '2024-02-02T14:45:00Z',
    country: 'South Korea'
  },
  {
    id: '5',
    firstName: 'Mark',
    lastName: 'Antonov',
    email: 'mark@example.com',
    linkedin: 'https://linkedin.com/in/mark',
    visas: ['O-1'],
    resumeUrl: '/resumes/mark.pdf',
    notes: 'Interested in O-1 visa',
    status: 'PENDING',
    createdAt: '2024-02-02T14:45:00Z',
    country: 'Russia'
  },
  {
    id: '6',
    firstName: 'Jane',
    lastName: 'Ma',
    email: 'jane@example.com',
    linkedin: 'https://linkedin.com/in/jane',
    visas: ['EB-1A'],
    resumeUrl: '/resumes/jane.pdf',
    notes: 'Looking for EB-1A options',
    status: 'PENDING',
    createdAt: '2024-02-02T14:45:00Z',
    country: 'Mexico'
  },
  {
    id: '7',
    firstName: 'Anand',
    lastName: 'Jain',
    email: 'anand@example.com',
    linkedin: 'https://linkedin.com/in/anand',
    visas: ['O-1'],
    resumeUrl: '/resumes/anand.pdf',
    notes: 'Interested in O-1 visa',
    status: 'REACHED_OUT',
    createdAt: '2024-02-02T14:45:00Z',
    country: 'Mexico'
  },
  {
    id: '8',
    firstName: 'Anna',
    lastName: 'Voronova',
    email: 'anna@example.com',
    linkedin: 'https://linkedin.com/in/anna',
    visas: ['EB-2 NIW'],
    resumeUrl: '/resumes/anna.pdf',
    notes: 'Exploring EB-2 NIW options',
    status: 'PENDING',
    createdAt: '2024-02-02T14:45:00Z',
    country: 'France'
  }
];

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const itemsPerPage = 8;

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    const matchesSearch = 
      `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  const handleStatusChange = async (leadId: string) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: lead.status === 'PENDING' ? 'REACHED_OUT' : 'PENDING' }
        : lead
    ));
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const closeLeadDetails = () => {
    setSelectedLead(null);
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Leads</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="REACHED_OUT">Reached Out</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Submitted</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Country</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedLeads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-gray-50 cursor-pointer" 
                  onClick={() => handleLeadClick(lead)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.firstName} {lead.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(lead.createdAt), 'MM/dd/yyyy, h:mm a')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.status === 'PENDING' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {lead.status === 'PENDING' ? 'Pending' : 'Reached Out'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(lead.id);
                      }}
                      className="text-sm"
                    >
                      {lead.status === 'PENDING' ? 'Mark as Reached Out' : 'Mark as Pending'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-end px-6 py-3 border-t border-gray-200">
            <nav className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="min-w-[32px]"
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedLead.firstName} {selectedLead.lastName}</h2>
              <Button variant="ghost" size="icon" onClick={closeLeadDetails}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p><strong>Email:</strong> {selectedLead.email}</p>
            <p><strong>LinkedIn:</strong> <a href={selectedLead.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500">{selectedLead.linkedin}</a></p>
            <p><strong>Visas:</strong> {selectedLead.visas.join(', ')}</p>
            <p><strong>Notes:</strong> {selectedLead.notes}</p>
            <p><strong>Resume:</strong> <a href={selectedLead.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Resume</a></p>
          </div>
        </div>
      )}
    </div>
  );
}