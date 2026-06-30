import React, { useState } from "react";
import { RiPencilFill } from "react-icons/ri";

export const FieldRow = ({ label, initialValue, editable, type = "text" }) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const isPassword = type === "password";
  const displayValue = isPassword ? "•".repeat( value.length-7) : value;
  return (
    <div className="bg-neutral-800/60 rounded-lg px-4 py-2.5 flex items-center justify-between">
      <div className="flex-1">
        <p className="text-neutral-400 text-xs">{label}</p>
        {isEditing ? (
          <input
            
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            className="bg-transparent text-white text-sm font-medium outline-none border-b border-blue-500 w-full"
          />
        ) : (
          <p className="text-white text-sm font-medium">
            {displayValue}
          </p>
        )}
      </div>

      {editable && (
        <button
          type="button"
          aria-label={`Edit ${value}`}
          onClick={() => setIsEditing(true)}
        >
          <RiPencilFill className="w-4 h-4 text-white" />
        </button>
      )}
    </div>
  );
};
