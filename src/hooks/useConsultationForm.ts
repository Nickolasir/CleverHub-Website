"use client";

import { useState } from "react";
import { consultationSchema } from "@/lib/validation";
import type { ConsultationFormData, ConsultationResponse } from "@/types/consultation";

interface FormErrors {
  [key: string]: string;
}

export function useConsultationForm() {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    bedrooms: 3,
    hasOffice: false,
    preferredTime1: "",
    preferredTime2: "",
    preferredTime3: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = <K extends keyof ConsultationFormData>(
    field: K,
    value: ConsultationFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const updateTimeSlots = (slots: string[]) => {
    setFormData((prev) => ({
      ...prev,
      preferredTime1: slots[0] || "",
      preferredTime2: slots[1] || "",
      preferredTime3: slots[2] || "",
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.preferredTime1;
      delete next.preferredTime2;
      delete next.preferredTime3;
      return next;
    });
  };

  const validate = (): boolean => {
    const result = consultationSchema.safeParse(formData);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: FormErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    setErrors(fieldErrors);
    return false;
  };

  const submit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: ConsultationResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      setIsSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to submit. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    submitError,
    updateField,
    updateTimeSlots,
    submit,
  };
}
