import React from 'react';
import { Toaster as SonnerToaster, toast } from 'sonner';

export { toast };

export function ToastProvider({ placement = 'top-right' }) {
  // Convert placement prop to sonner format
  const positionMap = {
    'top-right': 'top-right',
    'top-left': 'top-left',
    'top-center': 'top-center',
    'bottom-right': 'bottom-right',
    'bottom-left': 'bottom-left',
    'bottom-center': 'bottom-center',
  };

  return (
    <SonnerToaster
      position={positionMap[placement] || 'top-right'}
      theme="dark"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: '#171717',
          border: '1px solid #262626',
          color: '#ffffff',
        },
      }}
    />
  );
}

export { SonnerToaster as Toaster };
