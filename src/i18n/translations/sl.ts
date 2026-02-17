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
      wrongHeader: "Napačna vrstica kolon",
      wrongHiearhcy: "Napačna hiearhija nivojev",
    },
  },

  dialog: {
    confirmOverrideTitle: "Prepišem obstoječe podatke?",
    confirmOverrideMessage: "Tabela že vsebuje podatke. Ali želiš obstoječe podatke prepisati z novo datoteko?",
    errorTitle: "Prišlo je do napake",
    buttons: {
      confirm: "V redu",
      cancel: "Prekliči",
    },
    table: {
      currentHeader: "Naloženo",
      expectedHeader: "Pravilno",
      errorIndex: "Zap. št.",
      errorValue: "Nivo Hiearhije",
    },
  },

  // TreeTable.tsx
  table: {
    expandAll: "Razširi vse",
    collapseAll: "Združi vse",
    pinHeader: "Fiksiraj Glavo",
    unpinHeader: "Odpni Glavo",
    headers: {
      outlineLevel: "Nivo Hiearhije",
      code: "Koda",
      name: "Ime",
    }
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
