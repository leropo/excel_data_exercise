import React, { useState, useRef } from 'react'
import * as XLSX from 'xlsx'

import TreeTable from './components/TreeTable'
import FileUpload from './components/FileUpload'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { parseExcelFile, validateExcelFile } from './helpers/utils'
import { ERROR_TYPE_WRONG_HEADER, ERROR_TYPE_WRONG_OUTLINE, XLSX_EXTENSION, XLS_EXTENSION } from './helpers/constants'
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

  const showHeaderMismatchDialog= (current: string[], expected: string[]) => {
    setDialog({
      type: 'error',
      title: t.app.errors.wrongHeader,
      message: (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: 'bold', paddingRight: '1rem' }}>Provided</td>
                {current.map((item, i) => (
                  <td key={i} style={{ padding: '0 8px' }}>{item}</td>
                ))}
              </tr>
    
              <tr>
                <td style={{ fontWeight: 'bold', paddingRight: '1rem' }}>Expected</td>
                {expected.map((item, i) => (
                  <td key={i} style={{ padding: '0 8px' }}>{item}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )  
    })
  }

  const showCurrentLevelErrors = (errorsData: string[]) => {
    setDialog({
      type: 'error',
      title: t.app.errors.wrongHiearhcy,
      message:(
        <div style={{ overflowY: 'scroll', maxHeight:'400px' }}>
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {errorsData.map(({ index, value, errors }) => (
                <React.Fragment key={index}>
                  {/* Row with index + value */}
                  <tr>
                    <td>{index}</td>
                    <td>{value}</td>
                  </tr>
      
                  {/* Row with errors list spanning both columns */}
                  <tr>
                    <td colSpan={2}>
                      <ul>
                        {errors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )
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
        if (errorsData.error) {
          if (errorsData.error == ERROR_TYPE_WRONG_HEADER ) {
            showHeaderMismatchDialog(errorsData.wrong_header, errorsData.expected_header)
          }
          else if (errorsData.error == ERROR_TYPE_WRONG_OUTLINE ) {
            showCurrentLevelErrors(errorsData.errors)
          }
          else {
            // this branch means no logic for this type of error is implemented
            showErrorDialog(errorsData.error)
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
