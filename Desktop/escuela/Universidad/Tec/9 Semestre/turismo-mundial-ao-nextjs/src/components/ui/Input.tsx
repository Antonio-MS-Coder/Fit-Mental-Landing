"use client"

import * as React from "react"
import { inputVariants, type InputProps as InputVariants } from "@/lib/variants"
import { cn } from "@/lib/utils"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    InputVariants {
  label?: string
  error?: string
  helper?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    type = "text",
    label,
    error,
    helper,
    leftIcon,
    rightIcon,
    id,
    ...props 
  }, ref) => {
    const generatedId = React.useId()
    const inputId = id || generatedId
    const hasError = Boolean(error)
    const finalVariant = hasError ? 'error' : variant

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              inputVariants({ variant: finalVariant, size, className }),
              leftIcon && "pl-10",
              rightIcon && "pr-10"
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-error">{error}</p>
        )}
        {helper && !error && (
          <p className="mt-2 text-sm text-gray-500">{helper}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }