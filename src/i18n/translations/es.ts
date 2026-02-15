// Example Spanish translation file
// To use this, add 'es' to the Locale type in translations/index.ts
// and add it to the translations object

import type { TranslationKeys } from './en';

export const es: TranslationKeys = {
  // App.tsx
  app: {
    title: "Visor de Archivos XLSX",
    subtitle: "Sube un archivo de Excel para ver su contenido",
    fileContents: "Contenido del Archivo",
    language: "Idioma",
    errors: {
      invalidFileType: "Por favor sube un archivo de Excel válido (.xlsx o .xls)",
      failedToRead: "Error al leer el archivo",
      failedToParse: "Error al analizar el archivo de Excel. Por favor asegúrate de que es un archivo válido.",
      errorReading: "Error al leer el archivo",
    },
  },

  // TreeTable.tsx
  table: {
    expandAll: "Expandir Todo",
    collapseAll: "Colapsar Todo",
    headers: {
      outlineLevel: "Nivel de Esquema",
      code: "Código",
      name: "Nombre",
    },
  },

  // Row.tsx
  row: {
    expand: "Expandir",
    collapse: "Colapsar",
  },

  // FileUpload.tsx
  upload: {
    chooseFile: "Elegir Archivo XLSX",
  },

  // DetailedInfo.tsx
  details: {
    description: "Descripción",
    quantity: "Cantidad",
    elementQuery: "Consulta de Elemento",
  },
};
