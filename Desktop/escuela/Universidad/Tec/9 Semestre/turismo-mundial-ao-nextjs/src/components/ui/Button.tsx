"use client"

import * as React from "react"
import { buttonVariants, type ButtonProps as ButtonVariants } from "@/lib/variants"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { 
      className, 
      variant, 
      size, 
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...rest 
    } = props

    const isDisabled = disabled || loading
    const buttonClasses = cn(buttonVariants({ variant, size, className }))

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(buttonClasses, children.props.className),
        disabled: isDisabled,
        ref,
        ...rest,
        ...children.props,
      })
    }

    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={isDisabled}
        {...rest}
      >
        {loading && (
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        )}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }