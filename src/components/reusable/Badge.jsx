// src/components/reusable/Badge.jsx
export default function Badge({ children, className = "" }) {
    return (
      <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 ${className}`}>
        {children}
      </span>
    );
  }