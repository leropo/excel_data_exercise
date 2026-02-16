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
  },

  // TreeTable.tsx
  table: {
    expandAll: "Expand All",
    collapseAll: "Collapse All",
    headers: {
      outlineLevel: "Outline Level",
      code: "Code",
      name: "Name",
    },
    removeTableOverflow: "Show whole table",
    addTableOverflow: "Wrap table"
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
    elementQuery: "Element Query",
  },
};

export type TranslationKeys = typeof en;
