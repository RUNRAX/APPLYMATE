"use client";

import React from "react";
import styles from "./components.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {label && <label className={styles.inputLabel}>{label}</label>}
        <div className={styles.inputContainer}>
          {icon && <span className={styles.inputIcon}>{icon}</span>}
          <input
            ref={ref}
            className={`${styles.input} ${icon ? styles.inputWithIcon : ""} ${error ? styles.inputError : ""} ${className || ""}`}
            {...props}
          />
        </div>
        {error && <span className={styles.inputErrorText}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
