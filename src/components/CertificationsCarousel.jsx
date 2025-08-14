import React, { useEffect, useMemo, useRef, useState } from 'react';
import './pages.css';

const GOOGLE_DRIVE_FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID;

const buildDriveListUrl = (folderId, apiKey) => {
  const query = `'${folderId}' in parents and trashed=false`;
  const params = new URLSearchParams({
    q: query,
    fields: 'files(id,name,mimeType,thumbnailLink,webViewLink,webContentLink)',
    key: apiKey
  });
  return `https://www.googleapis.com/drive/v3/files?${params.toString()}`;
};

const toPreviewSrc = (file) => {
  if (!file) return '';
  const { id, mimeType, thumbnailLink } = file;
  
  // For images, try multiple fallback URLs
  if (mimeType && mimeType.startsWith('image/')) {
    // Primary: Direct Google Drive thumbnail with high resolution
    return `https://drive.google.com/thumbnail?id=${id}&sz=w400-h300`;
  }
  
  // For PDFs and other files, use thumbnail
  if (thumbnailLink) {
    return thumbnailLink.replace('=s220', '=s400'); // Higher resolution thumbnail
  }
  
  // Fallback for any file type
  return `https://drive.google.com/thumbnail?id=${id}&sz=w400-h300`;
};

const Modal = ({ file, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Add keydown handler properly
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !file) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isPdf = (file.mimeType || '') === 'application/pdf';

  return (
    <div 
      className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      style={{ zIndex: 9999 }} // Ensure high z-index
    >
      <div className="relative bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl max-w-6xl max-h-[95vh] w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h3 className="text-xl font-semibold text-white">
            {file.name || (isPdf ? 'PDF Certificate' : 'Certificate')}
          </h3>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(95vh-120px)]">
          {isPdf ? (
            <div className="w-full bg-white rounded-lg overflow-hidden relative" style={{ minHeight: '70vh' }}>
              <iframe
                src={`https://drive.google.com/file/d/${file.id}/preview`}
                className="w-full h-full border-0"
                style={{ minHeight: '70vh', height: '80vh' }}
                title="PDF Certificate"
                allow="autoplay"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                onLoad={(e) => {
                  console.log('PDF iframe loaded successfully');
                }}
                onError={(e) => {
                  console.log('PDF iframe failed to load, trying fallback');
                  // Show fallback message
                  const fallbackDiv = e.target.parentElement.querySelector('.pdf-fallback');
                  if (fallbackDiv) {
                    fallbackDiv.style.display = 'flex';
                  }
                  e.target.style.display = 'none';
                }}
              />
              {/* Fallback for when iframe doesn't work */}
              <div 
                className="pdf-fallback absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-700 rounded-lg"
                style={{ display: 'none' }}
              >
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">📄</div>
                  <h3 className="text-xl font-semibold mb-4">PDF Certificate</h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    The PDF preview couldn't load directly. You can view or download the certificate using the buttons below.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <a
                      href={`https://drive.google.com/file/d/${file.id}/view`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
                    >
                      Open in Google Drive
                    </a>
                    <a
                      href={`https://drive.google.com/uc?export=download&id=${file.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-medium"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <img 
                src={`https://drive.google.com/uc?export=view&id=${file.id}`}
                alt={file.name || "Certificate"}
                className="max-w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-lg"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Try alternative URL if first fails
                  if (!e.target.dataset.retried) {
                    e.target.dataset.retried = "true";
                    e.target.src = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1200-h900`;
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Footer with download/view options */}
        <div className="p-6 border-t border-white/10 bg-black/40">
          <div className="flex justify-center gap-4">
            <a
              href={`https://drive.google.com/file/d/${file.id}/view`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              View in Drive
            </a>
            <a
              href={`https://drive.google.com/uc?export=download&id=${file.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 text-sm font-medium border border-white/20"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificationsCarousel = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef(null);
  const rafRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchFiles = async () => {
      try {
        if (!apiKey) {
          throw new Error('Missing VITE_GOOGLE_API_KEY');
        }
        if (!GOOGLE_DRIVE_FOLDER_ID) {
          throw new Error('Missing VITE_GOOGLE_DRIVE_FOLDER_ID');
        }
        
        const url = buildDriveListUrl(GOOGLE_DRIVE_FOLDER_ID, apiKey);
        const res = await fetch(url);
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(`Drive API error: ${res.status} - ${errorData.error?.message || 'Unknown error'}`);
        }
        
        const data = await res.json();
        if (!isMounted) return;
        
        const supported = (data.files || []).filter((f) => {
          const mt = f.mimeType || '';
          return (
            mt.startsWith('image/') ||
            mt === 'application/pdf' ||
            mt === 'image/svg+xml'
          );
        });
        
        setFiles(supported);
      } catch (e) {
        if (isMounted) {
          console.error('Error fetching certifications:', e);
          setError(e.message || 'Failed to load certifications');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    fetchFiles();
    
    return () => {
      isMounted = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [apiKey]);

  // Create enough duplicates to ensure smooth infinite scroll
  const duplicatedItems = useMemo(() => {
    if (files.length === 0) return [];
    const multiplier = Math.max(3, Math.ceil(20 / files.length)); // Ensure we have enough items
    const result = [];
    for (let i = 0; i < multiplier; i++) {
      result.push(...files);
    }
    return result;
  }, [files]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || files.length === 0 || isModalOpen) return;

    const baseSpeed = 1.2; // Base animation speed
    const slowSpeed = 0.3;  // Slower speed on hover
    let currentSpeed = baseSpeed;

    const step = () => {
      if (!container || !scrollRef.current || isModalOpen) return;
      
      currentSpeed = isHoveringRef.current ? slowSpeed : baseSpeed;
      container.scrollLeft += currentSpeed;
      
      // Calculate when to reset for seamless loop
      const itemWidth = container.scrollWidth / duplicatedItems.length; // Dynamic item width
      const singleSetWidth = files.length * itemWidth;
      
      if (container.scrollLeft >= singleSetWidth) {
        container.scrollLeft = container.scrollLeft - singleSetWidth;
      }
      
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [files, isModalOpen, duplicatedItems]);

  const handleFileClick = (file, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('File clicked:', file); // Debug log
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal'); // Debug log
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  // Debug render
  console.log('Modal state:', { isModalOpen, selectedFile: selectedFile?.name });

  if (loading) {
    return (
      <section className="relative">
        <div className="title text-lg font-semibold text-neutral-200 mb-4">Certifications</div>
        <div className="w-full overflow-hidden">
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-56 h-36 rounded-xl bg-white/10 border border-white/20 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative">
        <div className="title text-lg font-semibold text-neutral-200 mb-4">Certifications</div>
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 p-3 rounded-lg inline-block">
          {error}
        </div>
        <div className="text-neutral-400 text-xs mt-2">
          Ensure VITE_GOOGLE_API_KEY and VITE_GOOGLE_DRIVE_FOLDER_ID are set, and the folder is shared publicly.
        </div>
      </section>
    );
  }

  if (files.length === 0) {
    return (
      <section className="relative">
        <div className="title text-lg font-semibold text-neutral-200 mb-4">Certifications</div>
        <div className="text-neutral-300 text-sm">No supported files found in the folder.</div>
      </section>
    );
  }

  return (
    <>
      <section className="relative">
        <div className="title text-lg font-semibold text-neutral-200 mb-4">Certifications</div>
        <div
          className="group relative w-full overflow-hidden"
          style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}
          onMouseEnter={() => (isHoveringRef.current = true)}
          onMouseLeave={() => (isHoveringRef.current = false)}
        >
          <div
            ref={scrollRef}
            className="overflow-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            <div className="flex py-4 w-max" style={{ gap: '10px' }}>
              {duplicatedItems.map((file, idx) => {
                const previewSrc = toPreviewSrc(file);
                const isPdf = (file.mimeType || '') === 'application/pdf';
                
                return (
                  <div
                    key={`${file.id}-${idx}`}
                    onClick={(e) => handleFileClick(file, e)}
                    className="flex-shrink-0 cursor-pointer group/item"
                    style={{ width: 'fit-content', minWidth: '200px', maxWidth: '280px' }}
                  >
                    <div className="h-36 overflow-hidden rounded-lg border border-white/20 bg-black/50 relative transform transition-transform duration-300 group-hover/item:scale-105" style={{ aspectRatio: '4/3' }}>
                      {isPdf ? (
                        <div className="w-full h-full relative">
                          {/* Try to show PDF thumbnail first */}
                          <img
                            src={`https://drive.google.com/thumbnail?id=${file.id}&sz=w400-h300`}
                            alt={file.name || "PDF Certificate"}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              // If thumbnail fails, show PDF icon
                              e.target.style.display = 'none';
                              const parent = e.target.parentElement;
                              if (parent && !parent.querySelector('.pdf-icon-fallback')) {
                                const fallback = document.createElement('div');
                                fallback.className = 'pdf-icon-fallback w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500/20 to-red-700/20';
                                fallback.innerHTML = '<div class="text-center text-white"><div class="text-3xl mb-2">📄</div><div class="text-sm font-medium">PDF Certificate</div></div>';
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                          {/* PDF badge overlay */}
                          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                            PDF
                          </div>
                        </div>
                      ) : (
                        <img
                          src={previewSrc}
                          alt={file.name || "Certificate"}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            if (!e.target.dataset.retried) {
                              e.target.dataset.retried = "true";
                              e.target.src = `https://drive.google.com/uc?export=view&id=${file.id}`;
                            } else if (!e.target.dataset.retriedSecond) {
                              e.target.dataset.retriedSecond = "true";
                              e.target.src = file.thumbnailLink || `https://drive.google.com/thumbnail?id=${file.id}&sz=w300`;
                            } else {
                              // Show certificate icon instead of broken image
                              e.target.style.display = 'none';
                              const parent = e.target.parentElement;
                              if (parent && !parent.querySelector('.fallback-text')) {
                                const fallback = document.createElement('div');
                                fallback.className = 'fallback-text w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-white';
                                fallback.innerHTML = '<div class="text-center"><div class="text-3xl mb-2">🏆</div><div class="text-sm font-medium">Certificate</div></div>';
                                parent.appendChild(fallback);
                              }
                            }
                          }}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/item:opacity-100">
                        <div className="text-white text-sm font-medium bg-black/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                          Click to view
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      <Modal 
        file={selectedFile}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default CertificationsCarousel;