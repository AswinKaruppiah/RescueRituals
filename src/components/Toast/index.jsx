import React from 'react';
import { Toaster as SonnerToaster, toast } from 'sonner';

export { toast };

export function ToastProvider() {
  return (
    <SonnerToaster
      position="bottom-center"
      theme="dark"
      richColors
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

