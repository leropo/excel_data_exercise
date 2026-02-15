import type { TranslationKeys } from './en';

export const sl: TranslationKeys = {
  // App.tsx
  app: {
    title: "Nalaganje datoteke",
    subtitle: "Naloži datoteko z vsebino za prikaz",
    fileContents: "Vsebina",
    language: "Jezik",
    errors: {
      invalidFileType: "Dovoljeni formati (.xlsx or .xls)",
      failedToRead: "Napaka pri branju datotke",
      failedToParse: "Napaka pri parsanju Excel datoteke. Preveri pravilnost datoteke.",
      errorReading: "Napaka pri branju datotke",
    },
  },

  // TreeTable.tsx
  table: {
    expandAll: "Razširi vse",
    collapseAll: "Združi vse",
    headers: {
      outlineLevel: "Nivo Hiearhije",
      code: "Koda",
      name: "Ime",
    },
  },

  // Row.tsx
  row: {
    expand: "Razširi",
    collapse: "Združi",
  },

  // FileUpload.tsx
  upload: {
    chooseFile: "Naloži datoteko",
  },

  // DetailedInfo.tsx
  details: {
    description: "Opis",
    quantity: "Količina",
    elementQuery: "Koda Element Query",
  },
};
