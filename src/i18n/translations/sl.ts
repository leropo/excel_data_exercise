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
    errorDescription: {
      emptyString: "Napaka v podaktih: prazen niz",
      hierarchyRepeated: "Napaka pri razvejanju, trenutna je višje ravni, vendar se začne enako kot prejšnja",
      leafContinuation: "Napaka v hierarhiji: list se ne nadaljuje pravilno",
      leafDescend: "Napaka v hierarhiji: ni mogoče spustiti nižje kot listno vozlišču, ki se konča z .0",
      levelContinuation: "Napaka v hierarhiji: naslednja raven se ne nadaljuje pravilno, začeti se mora s prejšnjo.",
      nonDigitSegment: "Napaka v podaktih: segment, ki ni številka",
      notDigit: "Napaka v podaktih: mora se začeti s številko",
      sameLength: "Napaka v hierarhiji: enaka dolžina, dolžina mora biti različna med sosednjimi zapisi, razen če smo v listnem vozlišču",
    },
    continueWithErrors: "V vaši datoteki so bile najdene napake. Še vedno lahko nadaljujete, vendar vas prosimo, da natančno pregledate napake.",
  },

  // TreeTable.tsx
  table: {
    expandAll: "Razširi vse",
    expandParents: "Razširi poglavja",
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
    quantity_type: "Količina Tip",
    quantity_unit: "Količina Enota",
    elementQuery: "Koda Element Query",
    quantityFormula: "Količina Formula"
  },
};
