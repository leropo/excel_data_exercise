export const en = {
  // App.tsx
  app: {
    title: "XLSX File Viewer",
    subtitle: "Upload an Excel file to view its contents",
    fileContents: "File Contents",
    language: "Language",
    errors: {
      invalidFileType: "Please upload a valid Excel file (.xlsx or .xls)",
      failedToRead: "Failed to read file",
      failedToParse: "Failed to parse Excel file. Please ensure it is a valid file.",
      errorReading: "Error reading file",
      wrongHeader: "Wrong header file",
      wrongHiearhcy: "Wrong Outline Level Hiearhcy",
    },
  },

  dialog: {
    confirmOverrideTitle: "Override existing data?",
    confirmOverrideMessage: "Data is already loaded in the table. Do you want to override the current data with a new file?",
    errorTitle: "An error occurred",
    buttons: {
      confirm: "OK",
      cancel: "Cancel",
    },
    table: {
      currentHeader: "Uploaded",
      expectedHeader: "Expected",
      errorIndex: "Index",
      errorValue: "Value",
    },
    errorDescription: {
      emptyString: "Format error: empty string",
      hierarchyRepeated: "Brachning error, current is higher level, but starts the same as previous",
      leafContinuation: "Hierarchy error: leaf is not continued correctly",
      leafDescend: "Leaf error: cannot descend after a leaf node ending in .0",
      levelContinuation: "Hierarchy error: next level is not continued correctly, it must start with previous one.",
      nonDigitSegment: "Format error: non-digit segment",
      notDigit: "Format error: must start with a digit",
      sameLength: "Hierarchy error: same length, length must among levels, unless we are in leaf node",    
    },
    continueWithErrors: "Some issues were found in your file. You can still continue, but please review the errors carefully.",
  },

  // TreeTable.tsx
  table: {
    expandAll: "Expand All",
    expandParents: "Expand Parents",
    collapseAll: "Collapse All",
    pinHeader : "Pin Header",
    unpinHeader : "Unpin Header",
    headers: {
      outlineLevel: "Outline Level",
      code: "Code",
      name: "Name",
    }
  },

  // Row.tsx
  row: {
    expand: "Expand",
    collapse: "Collapse",
  },

  // FileUpload.tsx
  upload: {
    chooseFile: "Choose XLSX File",
  },

  // DetailedInfo.tsx
  details: {
    description: "Description",
    quantity: "Quantity",
    quantity_type: "Quantity Type",
    quantity_unit: "Quantity Unit",
    elementQuery: "Element Query",
    quantityFormula: "Quantity Formula"
  },
};

export type TranslationKeys = typeof en;
