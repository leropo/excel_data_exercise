import { useState } from 'react'
import * as XLSX from 'xlsx'

import TreeTable from './components/TreeTable'
import FileUpload from './components/FileUpload'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { parseExcelFile } from './helpers/utils'
import { XLSX_EXTENSION, XLS_EXTENSION } from './helpers/constants'
import './styles/App.css'
import { TableRow } from "./types/data";
import { useTranslation } from './i18n/TranslationContext'

function App() {
  const { t } = useTranslation()
  const [parsedData, setParsedData] = useState<TableRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Reset previous data
    setParsedData(null)
    setError(null)

    // Validate file type
    if (!file.name.endsWith(XLSX_EXTENSION) && !file.name.endsWith(XLS_EXTENSION)) {
      setError(t.app.errors.invalidFileType)
      return
    }

    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result
        if (!data) {
          setError(t.app.errors.failedToRead)
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

        const parsedData =  parseExcelFile(jsonData);
        setParsedData(parsedData);

        console.log('Parsed Excel data:', jsonData)
      } catch (err) {
        console.error('Error parsing file:', err)
        setError(t.app.errors.failedToParse)
      }
    }

    reader.onerror = () => {
      setError(t.app.errors.errorReading)
    }

    // Read file as binary string
    reader.readAsBinaryString(file)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>{t.app.title}</h1>
            <p>{t.app.subtitle}</p>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="app-main">
        <FileUpload handleFileUpload={handleFileUpload} />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {parsedData && (
          <div className="content-display">
            <h2>{t.app.fileContents}</h2>
            <div className="table-wrapper">
                <TreeTable data={parsedData} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
