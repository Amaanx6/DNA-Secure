'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepProgress from '@/components/shared/step-progress';
import DropZone from '@/components/encrypt/drop-zone';
import { useStore } from '@/lib/store';

export default function UploadPage() {
  const router = useRouter();
  const { uploadedFile, setUploadedFile } = useStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(uploadedFile);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setUploadedFile(file);
  };

  const handleNext = () => {
    if (selectedFile) {
      router.push('/encrypt/configure');
    }
  };

  return (
    <div className="max-w-[1120px] mx-auto px-8 py-12">
      <StepProgress
        currentStep={1}
        totalSteps={3}
        title="Upload Image"
        subtitle="Select a DICOM, NIFTI, or TIFF medical image file"
      />

      <div className="grid md:grid-cols-[1fr_300px] gap-12 mt-12">
        {/* Drop Zone */}
        <div>
          <DropZone onFileSelected={handleFileSelect} />

          {/* Security Note */}
          <div className="mt-8 bg-surface-container-high p-6 border border-outline-variant/10">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-tertiary flex-shrink-0">
                shield
              </span>
              <div>
                <h4 className="font-headline text-sm text-on-surface mb-2">
                  Your file is secure
                </h4>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  Files are processed entirely in-memory. No data is stored on
                  our servers, and all communications are encrypted end-to-end.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div>
          <div className="bg-surface-container-lowest p-6 border border-outline-variant/10">
            <h3 className="font-headline text-lg text-on-surface mb-6">
              Current Selection
            </h3>

            {selectedFile ? (
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-on-surface-variant uppercase">
                    Filename
                  </span>
                  <p className="text-sm text-on-surface font-medium truncate">
                    {selectedFile.name}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono text-on-surface-variant uppercase">
                    File Size
                  </span>
                  <p className="text-sm text-on-surface font-medium">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono text-on-surface-variant uppercase">
                    Format
                  </span>
                  <p className="text-sm text-on-surface font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-sm">
                      check_circle
                    </span>
                    {selectedFile.type || 'Medical Image'}
                  </p>
                </div>

                <div className="pt-4 border-t border-outline-variant/10">
                  <button
                    onClick={handleNext}
                    className="w-full bg-primary text-on-primary py-3 font-medium text-sm tracking-wide hover:bg-primary-container transition-all"
                  >
                    Configure Encryption
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-on-surface-variant text-center py-8">
                No file selected yet. Upload an image to continue.
              </p>
            )}
          </div>

          {/* Advanced Parameters */}
          <div className="mt-6">
            <a
              href="#"
              className="text-primary font-medium text-xs flex items-center gap-2 hover:underline"
            >
              Advanced Parameters
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
