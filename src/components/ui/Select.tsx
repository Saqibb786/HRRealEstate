import React from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, fullWidth = true, className = '', ...props }, ref) => {
    const containerClasses = ['flex flex-col gap-1.5', fullWidth ? 'w-full' : '', className]
      .filter(Boolean)
      .join(' ');

    const fieldClasses = `w-full px-4 py-3 rounded-lg border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 transition-colors duration-200 placeholder:text-gray-400 ${
      error 
        ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' 
        : 'border-gray-300 focus:ring-primary/40 focus:border-primary'
    }`;

    return (
      <div className={containerClasses}>
        {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
        <select
          ref={ref}
          className={fieldClasses}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
