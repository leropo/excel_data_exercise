import type React from 'react';

export interface FileUploadProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checkExistingData: () => void;
}

export type DialogState =
  | {
      type: 'confirm'
      title: string
      message: string | React.ReactNode
      onConfirm: () => void
    }
  | {
      type: 'error'
      title: string 
      message: string | React.ReactNode
    }
  | null