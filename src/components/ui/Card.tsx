import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden";
  const hoverClasses = hoverable
    ? "transition-shadow duration-300 hover:shadow-lg"
    : "";
  const classes = [baseClasses, hoverClasses, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
