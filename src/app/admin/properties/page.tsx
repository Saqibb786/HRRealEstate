"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import PropertyFormModal from "@/components/admin/PropertyFormModal";

export default function AdminPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any | null>(null);

  const fetchProperties = () => {
    setLoading(true);
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load properties:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phase.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
        if (res.ok) {
          setProperties(properties.filter((p) => p.id !== id));
        }
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  const handleOpenAdd = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (property: any) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
  };

  const handleSuccess = () => {
    fetchProperties();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Manage Properties</h1>
          <p className="text-gray-500">
            Add, edit, or remove property listings.
          </p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd}>
          + Add New Property
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search properties..."
            className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="text-sm text-gray-500">
            Showing {filteredProperties.length} properties
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-8 text-center text-gray-500">
              Loading properties...
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No properties found.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-600">
                    Title
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-600">
                    Phase
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-600">
                    Type
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((prop) => (
                  <tr
                    key={prop.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-primary">
                      {prop.title}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{prop.phase}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {prop.propertyType}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${prop.status === "Available" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-800"}`}
                      >
                        {prop.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {prop.showPricePublicly
                        ? `PKR ${(prop.price / 10000000).toFixed(2)} Cr`
                        : "Call for Price"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(prop)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(prop.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Property Form Modal */}
      <PropertyFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        editProperty={editingProperty}
      />
    </div>
  );
}
