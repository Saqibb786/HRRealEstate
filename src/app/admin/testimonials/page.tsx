'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load testimonials:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setTestimonials(testimonials.filter(t => t.id !== id));
        }
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Manage Testimonials</h1>
          <p className="text-gray-500">Add or remove client reviews displayed on the home page.</p>
        </div>
        <Button variant="primary">+ Add Testimonial</Button>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          {loading ? (
             <div className="py-8 text-center text-gray-500">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
             <div className="py-8 text-center text-gray-500">No testimonials found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-600 w-1/4">Client Name</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 w-1/2">Message Preview</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 w-1/4">Date Added</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((review) => (
                  <tr key={review.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-primary">{review.name}</td>
                    <td className="py-3 px-4 text-gray-600 italic">"{review.message ? review.message.substring(0, 100) + '...' : ''}"</td>
                    <td className="py-3 px-4 text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => handleDelete(review.id)} className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
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
