'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropZoneProps {
  onFileSelected: (file: File) => void;
  isLoading?: boolean;
}

export default function DropZone({ onFileSelected, isLoading }: DropZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isLoading,
    accept: {
      'image/*': ['.dicom', '.dcm', '.nifti', '.nii', '.tiff', '.tif'],
    },
  });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <div
        className={`aspect-[4/3] border border-dashed border-[#C17B3F] rounded-lg flex flex-col items-center justify-center transition-all ${
          isDragActive ? 'bg-surface-container-low' : 'bg-surface-container-lowest'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-primary text-3xl">
            upload_file
          </span>
        </div>

        <h3 className="font-headline text-2xl text-on-surface mb-2">
          {isDragActive ? 'Drop file here' : 'Upload Medical Image'}
        </h3>
        <p className="text-on-surface-variant text-sm mb-6">
          Drag and drop your DICOM, NIFTI, or TIFF image here
        </p>

        <div className="flex gap-2">
          {['DICOM', 'NIFTI', 'TIFF'].map((format) => (
            <div
              key={format}
              className="px-3 py-1 text-xs bg-surface-container text-on-surface-variant rounded-full font-mono"
            >
              {format}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
