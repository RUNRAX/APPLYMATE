"use client";
import { useState, useTransition } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { uploadResumeAction } from "@/app/actions/upload-resume";
import { useRouter } from "next/navigation";

interface ResumeVaultProps {
  initialResume: {
    id: string;
    originalContent: string;
    version: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeVault({ initialResume, isOpen, onClose }: ResumeVaultProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState(initialResume?.originalContent || "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a PDF resume first.");
      return;
    }

    setError(null);
    setSuccess(false);
    const formData = new FormData();
    formData.append("resumeFile", file);
    formData.append("targetRole", "UploadOnly");

    startTransition(async () => {
      try {
        const result = await uploadResumeAction(formData);
        if (result.success) {
          setResumeText(result.resumeText);
          setSuccess(true);
          router.refresh();
        } else {
          setError("Failed to upload resume.");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Resume Vault" size="lg">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Upload Section */}
        <Card variant="elevated" style={{ padding: '2rem', background: '#FFFFFF' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--foreground)', marginBottom: '1.5rem' }}>
            Upload Base Resume
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--foreground)', display: 'block', marginBottom: '0.5rem' }}>
                Base Resume (PDF)
              </label>
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange}
                style={{
                  width: '100%', 
                  padding: '0.75rem', 
                  background: '#F9FAFB', 
                  border: '1px dashed #D1D5DB', 
                  borderRadius: '8px', 
                  color: 'var(--muted-foreground)'
                }}
              />
            </div>

            {error && <div style={{ color: 'var(--destructive)', fontSize: '0.9rem' }}>{error}</div>}
            {success && <div style={{ color: 'var(--success)', fontSize: '0.9rem' }}>Resume successfully uploaded and parsed!</div>}

            <Button variant="primary" onClick={handleUpload} disabled={isPending || !file}>
              {isPending ? (
                <><span className="spinner"></span> Uploading...</>
              ) : "Upload Resume"}
            </Button>
          </div>
        </Card>

        {/* Current Active Resume Text */}
        {resumeText && (
          <Card variant="elevated" style={{ padding: '2rem', background: '#FFFFFF' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--foreground)', marginBottom: '1rem' }}>
              Current Active Base Resume
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
              This is the raw text the AI extracted from your PDF and will use for job applications.
            </p>
            <div style={{ 
              background: '#F9FAFB', 
              padding: '1.5rem', 
              borderRadius: '8px', 
              fontFamily: 'var(--font-mono), monospace', 
              fontSize: '0.85rem', 
              color: 'var(--foreground)',
              whiteSpace: 'pre-wrap',
              maxHeight: '400px',
              overflowY: 'auto',
              border: '1px solid #E5E7EB'
            }}>
              {resumeText}
            </div>
          </Card>
        )}
      </div>
    </Modal>
  );
}
