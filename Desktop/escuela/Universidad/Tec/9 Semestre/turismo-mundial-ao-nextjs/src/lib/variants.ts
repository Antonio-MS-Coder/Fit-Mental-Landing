import { type VariantProps, cva } from "class-variance-authority"

// Professional Button Variants with accessibility features
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-w-[2.5rem] min-h-[2.5rem]",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary shadow-md hover:shadow-lg",
        secondary: "bg-secondary text-white hover:bg-secondary/90 focus-visible:ring-secondary shadow-md hover:shadow-lg",
        outline: "border border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary",
        ghost: "text-primary hover:bg-primary/10 focus-visible:ring-primary",
        government: "bg-mexico-green text-white hover:bg-mexico-green-dark focus-visible:ring-mexico-green shadow-md",
        destructive: "bg-error text-white hover:bg-error/90 focus-visible:ring-error shadow-md",
        success: "bg-success text-white hover:bg-success/90 focus-visible:ring-success shadow-md",
      },
      size: {
        sm: "text-sm px-3 py-2",
        default: "text-sm px-4 py-3",
        lg: "text-base px-6 py-4",
        xl: "text-lg px-8 py-5",
        icon: "w-10 h-10 p-0",
      },
      loading: {
        true: "opacity-70 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Professional Card Variants
export const cardVariants = cva(
  "rounded-lg border bg-white shadow-sm transition-all duration-150",
  {
    variants: {
      variant: {
        default: "border-gray-200",
        interactive: "border-gray-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer hover:border-gray-300",
        government: "border-primary/20 bg-primary/5",
        highlighted: "border-secondary/30 bg-secondary/5",
        error: "border-error/30 bg-error/5",
        success: "border-success/30 bg-success/5",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
)

// Enhanced Badge Variants
export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800",
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        government: "bg-mexico-green text-white",
        outline: "border border-gray-300 text-gray-700",
        success: "bg-success/10 text-success-700 border border-success/20",
        warning: "bg-warning/10 text-warning-700 border border-warning/20",
        error: "bg-error/10 text-error-700 border border-error/20",
        verified: "bg-green-100 text-green-800 border border-green-200",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Enhanced Input Variants
export const inputVariants = cva(
  "block w-full rounded-lg border px-4 py-3 text-sm placeholder:text-gray-400 transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary",
        government: "border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary",
        error: "border-error focus:border-error focus:ring-1 focus:ring-error",
        success: "border-success focus:border-success focus:ring-1 focus:ring-success",
      },
      size: {
        sm: "px-3 py-2 text-sm",
        default: "px-4 py-3 text-sm",
        lg: "px-5 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Typography Variants for consistent text styling
export const headingVariants = cva(
  "font-bold tracking-tight text-gray-900",
  {
    variants: {
      level: {
        h1: "text-4xl sm:text-5xl lg:text-6xl",
        h2: "text-3xl sm:text-4xl",
        h3: "text-2xl sm:text-3xl",
        h4: "text-xl sm:text-2xl",
        h5: "text-lg sm:text-xl",
        h6: "text-base sm:text-lg",
      },
      color: {
        default: "text-gray-900",
        primary: "text-primary",
        secondary: "text-secondary",
        white: "text-white",
      },
      balance: {
        true: "text-wrap: balance;",
      },
    },
    defaultVariants: {
      level: "h2",
      color: "default",
    },
  }
)

// Status Indicator Variants
export const statusVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
  {
    variants: {
      status: {
        active: "bg-green-100 text-green-800 border border-green-200",
        pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
        inactive: "bg-gray-100 text-gray-800 border border-gray-200",
        error: "bg-red-100 text-red-800 border border-red-200",
        verified: "bg-blue-100 text-blue-800 border border-blue-200",
        official: "bg-mexico-green/10 text-mexico-green border border-mexico-green/20",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-2 text-sm",
      },
      withDot: {
        true: "pl-3",
      },
    },
    defaultVariants: {
      status: "active",
      size: "default",
    },
  }
)

// Container Variants for consistent layout
export const containerVariants = cva(
  "mx-auto w-full px-4 sm:px-6 lg:px-8",
  {
    variants: {
      maxWidth: {
        sm: "max-w-2xl",
        md: "max-w-4xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl",
        "2xl": "max-w-8xl",
        full: "max-w-none",
      },
      padding: {
        none: "px-0",
        sm: "px-4",
        default: "px-4 sm:px-6 lg:px-8",
        lg: "px-6 sm:px-8 lg:px-12",
      },
    },
    defaultVariants: {
      maxWidth: "xl",
      padding: "default",
    },
  }
)

// Section Variants for consistent spacing
export const sectionVariants = cva(
  "w-full",
  {
    variants: {
      spacing: {
        sm: "py-8 sm:py-12",
        default: "py-16 sm:py-20",
        lg: "py-20 sm:py-24 lg:py-32",
        xl: "py-24 sm:py-32 lg:py-40",
      },
      background: {
        none: "",
        white: "bg-white",
        gray: "bg-gray-50",
        primary: "bg-primary",
        secondary: "bg-secondary",
        government: "bg-mexico-green",
        gradient: "bg-gradient-to-r from-primary to-secondary",
      },
    },
    defaultVariants: {
      spacing: "default",
      background: "none",
    },
  }
)

// Export types for TypeScript
export type ButtonProps = VariantProps<typeof buttonVariants>
export type CardProps = VariantProps<typeof cardVariants>
export type BadgeProps = VariantProps<typeof badgeVariants>
export type InputProps = VariantProps<typeof inputVariants>
export type HeadingProps = VariantProps<typeof headingVariants>
export type StatusProps = VariantProps<typeof statusVariants>
export type ContainerProps = VariantProps<typeof containerVariants>
export type SectionProps = VariantProps<typeof sectionVariants>