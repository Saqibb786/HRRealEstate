"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface PropertyFormData {
  title: string;
  description: string;
  phase: string;
  propertyType: string;
  listingType: string;
  sizeValue: string;
  sizeUnit: string;
  bedrooms: number | "";
  bathrooms: number | "";
  status: string;
  featured: boolean;
  showPricePublicly: boolean;
  price: number | "";
}

interface PropertyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editProperty?: any | null;
}

const initialFormData: PropertyFormData = {
  title: "",
  description: "",
  phase: "",
  propertyType: "",
  listingType: "",
  sizeValue: "",
  sizeUnit: "Marla",
  bedrooms: "",
  bathrooms: "",
  status: "Available",
  featured: false,
  showPricePublicly: false,
  price: "",
};

const phaseOptions = [
  { label: "Select Phase", value: "" },
  { label: "DHA Phase 1", value: "DHA Phase 1" },
  { label: "DHA Phase 2", value: "DHA Phase 2" },
  { label: "DHA Phase 3", value: "DHA Phase 3" },
  { label: "DHA Phase 4", value: "DHA Phase 4" },
  { label: "DHA Phase 5", value: "DHA Phase 5" },
  { label: "DHA Phase 6", value: "DHA Phase 6" },
  { label: "DHA Phase 7", value: "DHA Phase 7" },
  { label: "DHA Phase 8", value: "DHA Phase 8" },
  { label: "DHA Phase 9 (Prism)", value: "DHA Phase 9 (Prism)" },
  { label: "DHA Phase 10", value: "DHA Phase 10" },
  { label: "DHA Phase 11 (Rahbar)", value: "DHA Phase 11 (Rahbar)" },
  { label: "DHA Phase 12 (EME)", value: "DHA Phase 12 (EME)" },
  { label: "DHA Phase 13", value: "DHA Phase 13" },
];

const propertyTypeOptions = [
  { label: "Select Type", value: "" },
  { label: "House", value: "House" },
  { label: "Plot", value: "Plot" },
  { label: "Commercial", value: "Commercial" },
];

const listingTypeOptions = [
  { label: "Select Listing Type", value: "" },
  { label: "Buy", value: "Buy" },
  { label: "Sell", value: "Sell" },
  { label: "Rent", value: "Rent" },
];

const statusOptions = [
  { label: "Available", value: "Available" },
  { label: "Sold", value: "Sold" },
  { label: "Rented", value: "Rented" },
];

const sizeUnitOptions = [
  { label: "Marla", value: "Marla" },
  { label: "Kanal", value: "Kanal" },
  { label: "Sq. Ft.", value: "Sq. Ft." },
  { label: "Sq. Yd.", value: "Sq. Yd." },
];

const amenityOptions = [
  "Swimming Pool",
  "Garden",
  "Garage",
  "Servant Quarter",
  "Lawn",
  "Security System",
  "Central Heating",
  "Central Air Conditioning",
  "Solar Panels",
  "Gym / Home Gym",
  "Terrace / Rooftop",
  "Basement",
  "Study Room",
  "Laundry Room",
  "CCTV Cameras",
];

export default function PropertyFormModal({
  isOpen,
  onClose,
  onSuccess,
  editProperty,
}: PropertyFormModalProps) {
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditMode = !!editProperty;

  useEffect(() => {
    if (editProperty) {
      setFormData({
        title: editProperty.title || "",
        description: editProperty.description || "",
        phase: editProperty.phase || "",
        propertyType: editProperty.propertyType || "",
        listingType: editProperty.listingType || "",
        sizeValue: (() => {
          const s = editProperty.size || "";
          const match = s.match(/^([\d.]+)\s*(.*)$/);
          return match ? match[1] : s;
        })(),
        sizeUnit: (() => {
          const s = editProperty.size || "";
          const match = s.match(/^[\d.]+\s*(.+)$/);
          return match ? match[1].trim() : "Marla";
        })(),
        bedrooms: editProperty.bedrooms ?? "",
        bathrooms: editProperty.bathrooms ?? "",
        status: editProperty.status || "Available",
        featured: editProperty.featured || false,
        showPricePublicly: editProperty.showPricePublicly || false,
        price: editProperty.price ?? "",
      });
      // Parse existing images
      try {
        const parsed = JSON.parse(editProperty.images || "[]");
        if (Array.isArray(parsed)) {
          setExistingImages(parsed);
        }
      } catch {
        setExistingImages([]);
      }
      // Parse existing amenities
      try {
        const parsedAmenities = JSON.parse(editProperty.amenities || "[]");
        if (Array.isArray(parsedAmenities)) {
          setSelectedAmenities(parsedAmenities);
        }
      } catch {
        setSelectedAmenities([]);
      }
    } else {
      setFormData(initialFormData);
      setExistingImages([]);
      setSelectedAmenities([]);
    }
    setImageFiles([]);
    setImagePreviews([]);
    setError("");
  }, [editProperty, isOpen]);

  if (!isOpen) return null;

  const handleImageSelect = (files: FileList | null) => {
    if (!files) return;
    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    setImageFiles((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveNewImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleImageSelect(e.dataTransfer.files);
  };

  const uploadImages = async (): Promise<string[]> => {
    if (imageFiles.length === 0) return [];

    setUploadingImages(true);
    const formDataUpload = new FormData();
    imageFiles.forEach((file) => {
      formDataUpload.append("images", file);
    });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!res.ok) {
        throw new Error("Failed to upload images");
      }

      const data = await res.json();
      return data.paths || [];
    } catch (err) {
      throw new Error("Image upload failed. Please try again.");
    } finally {
      setUploadingImages(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "bedrooms" || name === "bathrooms") {
      const num =
        value === "" ? "" : Math.max(0, Math.min(99, parseInt(value, 10) || 0));
      setFormData((prev) => ({
        ...prev,
        [name]: num,
      }));
    } else if (name === "price") {
      const num = value === "" ? "" : Math.max(0, parseFloat(value) || 0);
      setFormData((prev) => ({
        ...prev,
        [name]: num,
      }));
    } else if (name === "title") {
      // Max 120 chars, no HTML tags
      const sanitized = value.replace(/<[^>]*>/g, "").slice(0, 120);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
    } else if (name === "description") {
      // Max 2000 chars, no HTML tags
      const sanitized = value.replace(/<[^>]*>/g, "").slice(0, 2000);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
    } else if (name === "sizeValue") {
      // Only allow numbers and one decimal, max 99999
      const cleaned = value.replace(/[^0-9.]/g, "");
      // Prevent multiple decimals
      const parts = cleaned.split(".");
      const sanitized =
        parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : cleaned;
      if (
        sanitized === "" ||
        (parseFloat(sanitized) >= 0 && parseFloat(sanitized) <= 99999)
      ) {
        setFormData((prev) => ({ ...prev, [name]: sanitized }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate required fields
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.phase ||
      !formData.propertyType ||
      !formData.listingType ||
      !formData.sizeValue.trim()
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Validate title length
    if (formData.title.trim().length < 5) {
      setError("Title must be at least 5 characters long.");
      setLoading(false);
      return;
    }

    // Validate description length
    if (formData.description.trim().length < 10) {
      setError("Description must be at least 10 characters long.");
      setLoading(false);
      return;
    }

    // Validate size is a valid positive number
    const sizeNum = parseFloat(formData.sizeValue);
    if (isNaN(sizeNum) || sizeNum <= 0) {
      setError("Please enter a valid size value.");
      setLoading(false);
      return;
    }

    // Validate price if entered
    if (
      formData.price !== "" &&
      (typeof formData.price !== "number" || formData.price < 0)
    ) {
      setError("Please enter a valid price.");
      setLoading(false);
      return;
    }

    // Validate bedrooms/bathrooms for House type
    if (formData.propertyType === "House") {
      if (
        formData.bedrooms !== "" &&
        (typeof formData.bedrooms !== "number" ||
          formData.bedrooms < 0 ||
          formData.bedrooms > 99)
      ) {
        setError("Bedrooms must be between 0 and 99.");
        setLoading(false);
        return;
      }
      if (
        formData.bathrooms !== "" &&
        (typeof formData.bathrooms !== "number" ||
          formData.bathrooms < 0 ||
          formData.bathrooms > 99)
      ) {
        setError("Bathrooms must be between 0 and 99.");
        setLoading(false);
        return;
      }
    }

    try {
      // Upload new images first
      let newImagePaths: string[] = [];
      if (imageFiles.length > 0) {
        newImagePaths = await uploadImages();
      }

      // Combine existing images with newly uploaded ones, fall back to placeholder
      let allImages = [...existingImages, ...newImagePaths];
      if (allImages.length === 0) {
        allImages = ["/images/property-placeholder.svg"];
      }

      const payload = {
        ...formData,
        size: `${formData.sizeValue} ${formData.sizeUnit}`,
        sizeValue: undefined,
        sizeUnit: undefined,
        bedrooms:
          formData.propertyType === "House" && formData.bedrooms !== ""
            ? formData.bedrooms
            : null,
        bathrooms:
          formData.propertyType === "House" && formData.bathrooms !== ""
            ? formData.bathrooms
            : null,
        price: formData.price === "" ? null : formData.price,
        images: JSON.stringify(allImages),
        amenities:
          formData.propertyType === "House"
            ? JSON.stringify(selectedAmenities)
            : JSON.stringify([]),
      };

      const url = isEditMode
        ? `/api/properties/${editProperty.id}`
        : "/api/properties";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto border border-gray-100">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-xl z-10">
          <h2 className="text-xl font-bold text-primary">
            {isEditMode ? "Edit Property" : "Add New Property"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200">
              {error}
            </div>
          )}

          {/* Title */}
          <Input
            label="Property Title *"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. 10 Marla House in DHA Phase 5"
            required
            maxLength={120}
          />

          {/* Description */}
          <Textarea
            label="Description *"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed description of the property..."
            required
            maxLength={2000}
          />

          {/* Phase, Property Type, Listing Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Phase *"
              name="phase"
              value={formData.phase}
              onChange={handleChange}
              options={phaseOptions}
              required
            />
            <Select
              label="Property Type *"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              options={propertyTypeOptions}
              required
            />
            <Select
              label="Listing Type *"
              name="listingType"
              value={formData.listingType}
              onChange={handleChange}
              options={listingTypeOptions}
              required
            />
          </div>

          {/* Size, Bedrooms, Bathrooms */}
          <div
            className={`grid grid-cols-1 ${formData.propertyType === "House" ? "md:grid-cols-3" : ""} gap-4`}
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Size *
              </label>
              <div className="flex gap-2">
                <input
                  name="sizeValue"
                  type="text"
                  inputMode="decimal"
                  value={formData.sizeValue}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  required
                  className="flex-1 min-w-0 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors duration-200 placeholder:text-gray-400"
                />
                <select
                  name="sizeUnit"
                  value={formData.sizeUnit}
                  onChange={handleChange}
                  className="w-28 px-3 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors duration-200 text-sm font-medium"
                >
                  {sizeUnitOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {formData.propertyType === "House" && (
              <>
                <Input
                  label="Bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="e.g. 3"
                  min={0}
                  max={99}
                />
                <Input
                  label="Bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  min={0}
                  max={99}
                />
              </>
            )}
          </div>

          {/* Amenities (House only) */}
          {formData.propertyType === "House" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Amenities{" "}
                <span className="text-gray-400 font-normal">
                  (select all that apply)
                </span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAmenitiesOpen(!amenitiesOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white hover:border-primary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <span
                    className={
                      selectedAmenities.length === 0
                        ? "text-gray-400"
                        : "text-gray-800"
                    }
                  >
                    {selectedAmenities.length === 0
                      ? "Select amenities..."
                      : `${selectedAmenities.length} amenit${selectedAmenities.length === 1 ? "y" : "ies"} selected`}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-gray-400 transition-transform duration-200 ${amenitiesOpen ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {amenitiesOpen && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                    {amenityOptions.map((amenity) => {
                      const isSelected = selectedAmenities.includes(amenity);
                      return (
                        <label
                          key={amenity}
                          className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors text-sm ${
                            isSelected ? "bg-primary/5" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              setSelectedAmenities((prev) =>
                                isSelected
                                  ? prev.filter((a) => a !== amenity)
                                  : [...prev, amenity],
                              );
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span
                            className={
                              isSelected
                                ? "font-medium text-primary"
                                : "text-gray-700"
                            }
                          >
                            {amenity}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
              {/* Selected tags */}
              {selectedAmenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAmenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedAmenities((prev) =>
                            prev.filter((a) => a !== amenity),
                          )
                        }
                        className="hover:text-red-500 transition-colors ml-0.5"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Price, Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Price (PKR)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 25000000"
              min={0}
            />
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Property Images{" "}
              <span className="text-gray-400 font-normal">
                (optional — placeholder used if none)
              </span>
            </label>

            {/* Existing images (edit mode) */}
            {existingImages.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Current Images</p>
                <div className="flex flex-wrap gap-3">
                  {existingImages.map((src, idx) => (
                    <div
                      key={`existing-${idx}`}
                      className="relative group w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`Property ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(idx)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-lg"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New image previews */}
            {imagePreviews.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">
                  New Images to Upload
                </p>
                <div className="flex flex-wrap gap-3">
                  {imagePreviews.map((src, idx) => (
                    <div
                      key={`new-${idx}`}
                      className="relative group w-24 h-24 rounded-lg overflow-hidden border-2 border-accent/30 shadow-sm"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`New ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveNewImage(idx)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-lg"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Drop zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
                isDragOver
                  ? "border-accent bg-accent/5"
                  : "border-gray-300 hover:border-primary/40 hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-center mb-2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">
                {isDragOver
                  ? "Drop images here"
                  : "Click or drag & drop images here"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supports JPG, PNG, WebP
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageSelect(e.target.files)}
                className="hidden"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">
                Featured Property
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="showPricePublicly"
                checked={formData.showPricePublicly}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">
                Show Price Publicly
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || uploadingImages}
            >
              {loading
                ? uploadingImages
                  ? "Uploading Images..."
                  : isEditMode
                    ? "Updating..."
                    : "Creating..."
                : isEditMode
                  ? "Update Property"
                  : "Create Property"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
