"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { StatusBadge } from "@/components/portal/StatusBadge";

interface ImportList {
  id: string;
  name: string;
  target_type: "lead" | "affiliate";
  file_name: string;
  total_rows: number;
  imported_rows: number;
  skipped_rows: number;
  errors: { row: number; reason: string }[];
  status: string;
  created_at: string;
}

interface ImportResult {
  import_id: string;
  total: number;
  imported: number;
  skipped: number;
  errors: { row: number; reason: string }[];
}

export default function ImportsPage() {
  const { supabase } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imports, setImports] = useState<ImportList[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [listName, setListName] = useState("");
  const [targetType, setTargetType] = useState<"lead" | "affiliate">("lead");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState("");
  const [expandedErrors, setExpandedErrors] = useState<string | null>(null);

  const loadImports = useCallback(async () => {
    const res = await fetch("/api/admin/import");
    if (res.ok) {
      const data = await res.json();
      setImports(data.imports);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadImports();
  }, [loadImports]);

  async function handleUpload() {
    if (!selectedFile || !listName.trim()) return;
    setUploading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("list_name", listName.trim());
    formData.append("target_type", targetType);

    const res = await fetch("/api/admin/import", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Upload failed");
    } else {
      setResult(data);
      setSelectedFile(null);
      setListName("");
      if (fileRef.current) fileRef.current.value = "";
      loadImports();
    }

    setUploading(false);
  }

  const inputClass =
    "w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-1 font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
        Import Lists
      </h1>
      <p className="mb-8 text-sm text-muted">
        Upload Excel or CSV files to bulk-import prospective clients or affiliates.
      </p>

      {/* Upload form */}
      <div className="mb-8 rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
          Upload New List
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              List Name *
            </label>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="e.g. Spring 2026 Realtors"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Import As *
            </label>
            <select
              value={targetType}
              onChange={(e) => setTargetType(e.target.value as "lead" | "affiliate")}
              className={inputClass}
            >
              <option value="lead">Prospective Clients (Leads)</option>
              <option value="affiliate">Prospective Affiliates</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Excel / CSV File *
            </label>
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-muted file:mr-4 file:rounded-lg file:border-0 file:bg-accent/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-accent hover:file:bg-accent/20"
            />
            <p className="mt-2 text-xs text-muted">
              Columns should include: <span className="font-medium">Name</span> (or First Name + Last Name),{" "}
              <span className="font-medium">Email</span>, Phone, Company.
              {targetType === "lead" && " Optionally: Vertical, Message."}
              {targetType === "affiliate" && " Optionally: Profession."}
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4 rounded-lg bg-green-50 px-4 py-3">
            <p className="text-sm font-medium text-green-700">
              Import complete: {result.imported} imported, {result.skipped} skipped
              out of {result.total} rows.
            </p>
            {result.errors.length > 0 && (
              <div className="mt-2">
                <button
                  onClick={() => setExpandedErrors(expandedErrors ? null : "result")}
                  className="text-xs font-medium text-green-600 underline"
                >
                  {expandedErrors === "result" ? "Hide" : "Show"} {result.errors.length} errors
                </button>
                {expandedErrors === "result" && (
                  <ul className="mt-2 flex flex-col gap-1">
                    {result.errors.map((err, i) => (
                      <li key={i} className="text-xs text-green-700">
                        Row {err.row}: {err.reason}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleUpload}
            disabled={uploading || !selectedFile || !listName.trim()}
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-light disabled:opacity-50"
          >
            {uploading ? "Importing..." : "Upload & Import"}
          </button>
        </div>
      </div>

      {/* Import history */}
      <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
          Import History
        </h3>

        {loading ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : imports.length === 0 ? (
          <p className="text-sm text-muted">No imports yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-card-border text-xs text-muted">
                  <th className="pb-2 font-medium">List Name</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">File</th>
                  <th className="pb-2 text-center font-medium">Imported</th>
                  <th className="pb-2 text-center font-medium">Skipped</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {imports.map((imp) => (
                  <tr
                    key={imp.id}
                    className="border-b border-card-border last:border-0"
                  >
                    <td className="py-2.5 font-medium text-foreground">
                      {imp.name}
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          imp.target_type === "lead"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-purple-50 text-purple-700"
                        }`}
                      >
                        {imp.target_type === "lead" ? "Clients" : "Affiliates"}
                      </span>
                    </td>
                    <td className="py-2.5 text-muted">{imp.file_name}</td>
                    <td className="py-2.5 text-center text-foreground">
                      {imp.imported_rows}
                      <span className="text-muted">/{imp.total_rows}</span>
                    </td>
                    <td className="py-2.5 text-center text-muted">
                      {imp.skipped_rows > 0 ? (
                        <button
                          onClick={() =>
                            setExpandedErrors(
                              expandedErrors === imp.id ? null : imp.id
                            )
                          }
                          className="text-orange-600 underline"
                        >
                          {imp.skipped_rows}
                        </button>
                      ) : (
                        "0"
                      )}
                    </td>
                    <td className="py-2.5">
                      <StatusBadge status={imp.status} />
                    </td>
                    <td className="py-2.5 text-muted">
                      {new Date(imp.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Expanded error details */}
            {expandedErrors &&
              expandedErrors !== "result" &&
              (() => {
                const imp = imports.find((i) => i.id === expandedErrors);
                if (!imp || !imp.errors?.length) return null;
                return (
                  <div className="mt-3 rounded-lg bg-orange-50 p-3">
                    <p className="mb-2 text-xs font-medium text-orange-700">
                      Errors for &ldquo;{imp.name}&rdquo;:
                    </p>
                    <ul className="flex flex-col gap-1">
                      {imp.errors.map((err, i) => (
                        <li key={i} className="text-xs text-orange-700">
                          Row {err.row}: {err.reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
          </div>
        )}
      </div>
    </div>
  );
}
