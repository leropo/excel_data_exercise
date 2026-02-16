import type React from 'react';

export interface FileUploadProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checkExistingData: () => void;
}
  