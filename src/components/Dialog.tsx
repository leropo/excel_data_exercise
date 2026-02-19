import React, { ReactNode } from 'react';

type DialogType = 'confirm' | 'error';

type DialogProps = {
  isOpen: boolean;
  type?: DialogType;
  title?: string;
  children: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  type = 'confirm',
  title,
  children,
  confirmLabel = 'OK',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const isError = type === 'error';

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="dialog-backdrop">
      <div className={`dialog ${isError ? 'dialog-error' : ''}`}>
        {title && <h2 className="dialog-title">{title}</h2>}
        <div className="dialog-body">
          {children}
        </div>
        <div className="dialog-footer">
          {isError ? (
            <button
              type="button"
              className="dialog-button dialog-button-primary"
              onClick={handleConfirm}
            >
              {confirmLabel}
            </button>
          ) : (
            <>
              <button
                type="button"
                className="dialog-button dialog-button-secondary"
                onClick={handleCancel}
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                className="dialog-button dialog-button-primary"
                onClick={handleConfirm}
              >
                {confirmLabel}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;

