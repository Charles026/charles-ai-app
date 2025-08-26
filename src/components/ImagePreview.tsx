import { useState } from 'react';
import Image from 'next/image';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface ImagePreviewProps {
  src: string | StaticImport;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
}

export default function ImagePreview({ src, alt, className, style, priority = false, loading = 'lazy' }: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className={`cursor-zoom-in ${className}`} 
        onClick={() => setIsOpen(true)}
      >
        <Image 
          src={src} 
          alt={alt} 
          style={style} 
          className="rounded-2xl"
          loading={loading}
          priority={priority}
        />
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Image
              src={src}
              alt={alt}
              className="rounded-lg"
              loading="lazy"
              style={{ 
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain'
              }}
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
              onClick={() => setIsOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}