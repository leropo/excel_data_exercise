import React, { useState, useRef } from 'react'
import * as XLSX from 'xlsx'

import TreeTable from './components/TreeTable'
import FileUpload from './components/FileUpload'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { parseExcelFile, validateExcelFile } from './helpers/utils'
import { ERROR_TYPE_WRONG_HEADER, XLSX_EXTENSION, XLS_EXTENSION } from './helpers/constants'
import './styles/App.css'
import { TableRow } from "./types/data";
import { DialogState } from './types/elements'
import { useTranslation } from './i18n/TranslationContext'
import Dialog from './components/Dialog'


function App() {
  const { t } = useTranslation()
  const fileInputRef = useRef(null);
  const [parsedData, setParsedData] = useState<TableRow[] | null>(null)
  const [dialog, setDialog] = useState<DialogState>(null)

  const showErrorDialog = (message: string) => {
    setDialog({
      type: 'error',
      title: (t as any).dialog.errorTitle,
      message,
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    } 

    // Validate file type
    if (!file.name.endsWith(XLSX_EXTENSION) && !file.name.endsWith(XLS_EXTENSION)) {
      const message = t.app.errors.invalidFileType
      showErrorDialog(message)
      return
    }

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result
        if (!data) {
          const message = t.app.errors.failedToRead
          showErrorDialog(message)
          return
        }

        // Parse the Excel file
        const workbook = XLSX.read(data, { type: "binary" })
        
        // Get the first sheet
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        
        // Extract data from first sheet only
        const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, { 
          header: 1,
          defval: '',
        })

        const errorsData = validateExcelFile(jsonData);
        if (errorsData) {
          if (errorsData.error == ERROR_TYPE_WRONG_HEADER ) {

            const message = t.app.errors.wrongHeader
            showErrorDialog(message + " PROVIDED: " + errorsData.wrong_header + " EXPECTED "+  errorsData.expected_header)
          }
          return
        }

        const parsedData =  parseExcelFile(jsonData);
        setParsedData(parsedData);        

      } catch (err) {
        console.error('Error parsing file:', err)
        const message = t.app.errors.failedToParse
        showErrorDialog(message)
      }
    }

    reader.onerror = () => {
      const message = t.app.errors.errorReading
      showErrorDialog(message)
    }

    // Read file as binary string
    reader.readAsBinaryString(file)


    // Reset input value, so that same file can be reuploaded because of on change event
    event.target.value = "";

  }


  const checkExistingData = () => {
    const needsConfirmation = parsedData && parsedData.length > 0
    if (needsConfirmation) {
      setDialog({
        type: 'confirm',
        title: (t as any).dialog.confirmOverrideTitle,
        message: (t as any).dialog.confirmOverrideMessage,
        onConfirm: () => {
          setDialog(null)
          // After confirmation we trigger file selection
          if (fileInputRef.current) {
            (fileInputRef.current as HTMLInputElement).click()
          }
        },
      })
      return
    }

    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).click()
    }
  };


  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content ">
          <FileUpload ref={fileInputRef}  handleFileUpload={handleFileUpload} checkExistingData={checkExistingData} />

          <LanguageSwitcher />
        </div>
      </header>

      <main className="app-main">
        {parsedData && (
          <div className="content-display">
            <div className="table-wrapper">
                <TreeTable data={parsedData} />
            </div>
          </div>
        )}
      </main>

      <Dialog
        isOpen={dialog !== null}
        type={dialog?.type === 'error' ? 'error' : 'confirm'}
        title={dialog?.title}
        confirmLabel={(t as any).dialog.buttons.confirm}
        cancelLabel={(t as any).dialog.buttons.cancel}
        onConfirm={() => {
          if (dialog?.type === 'confirm' && dialog.onConfirm) {
            dialog.onConfirm()
          } else {
            setDialog(null)
          }
        }}
        onCancel={() => {
          setDialog(null)
        }}
      >
        {dialog?.message}
      </Dialog>
    </div>
  )
}

export default App
