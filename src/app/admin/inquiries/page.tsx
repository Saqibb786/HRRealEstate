'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/inquiries')
      .then(res => res.json())
      .then(data => {
        setInquiries(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load inquiries:", err);
        setLoading(false);
      });
  }, []);

  const handleMarkContacted = async (id: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Contacted' })
      });
      if (res.ok) {
        setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: 'Contacted' } : inq));
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      try {
        const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setInquiries(inquiries.filter(i => i.id !== id));
        }
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Lead Inquiries</h1>
        <p className="text-gray-500">Manage messages sent through the website contact forms.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          {loading ? (
             <div className="py-8 text-center text-gray-500">Loading inquiries...</div>
          ) : inquiries.length === 0 ? (
             <div className="py-8 text-center text-gray-500">No inquiries found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Name</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Contact</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Subject / Property</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Received</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id} className={`border-b border-gray-100 hover:bg-gray-50 ${inq.status === 'New' ? 'bg-indigo-50/30' : ''}`}>
                    <td className="py-4 px-4">
                       <span className={`px-2 py-1 rounded text-xs font-semibold ${inq.status === 'New' ? 'bg-accent text-white' : 'bg-gray-200 text-gray-600'}`}>
                          {inq.status}
                       </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-primary">
                       {inq.name}
                       <div className="text-xs text-gray-500 block mt-1 break-words">{inq.message?.substring(0, 50)}...</div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{inq.phone}</td>
                    <td className="py-4 px-4 text-gray-600">{inq.propertyReference || '-'}</td>
                    <td className="py-4 px-4 text-gray-500 text-sm">{new Date(inq.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-right">
                      {inq.status === 'New' && (
                         <button onClick={() => handleMarkContacted(inq.id)} className="text-green-600 hover:text-green-800 mr-3 font-medium text-sm">Mark Contacted</button>
                      )}
                      <button onClick={() => handleDelete(inq.id)} className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
