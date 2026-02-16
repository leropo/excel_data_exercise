import { XLSX_EXTENSION, XLS_EXTENSION } from '../helpers/constants'
import { useTranslation } from '../i18n/TranslationContext'
import React, { forwardRef } from "react";
import { FileUploadProps } from "../types/elements";

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(({ checkExistingData, handleFileUpload }, ref) => {
    const { t } = useTranslation();
    return (
        <div className="upload-section">

            <button type="button" className='upload-button' onClick={checkExistingData}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                {t.upload.chooseFile}
            </button>

            
            <input
                id="file-upload"
                type="file"
                ref={ref}
                accept={`${XLSX_EXTENSION},${XLS_EXTENSION}`}
                onChange={handleFileUpload}
                className="file-input"
                style={{ display: "none" }}
                />
        </div>
    )
});


export default FileUpload;
