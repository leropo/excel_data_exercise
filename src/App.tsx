import { useState } from 'react'
import * as XLSX from 'xlsx'

import TreeTable from './components/TreeTable'
import FileUpload from './components/FileUpload'
import { validateExcelFile, parseExcelFile } from './helpers/utils'
import { XLSX_EXTENSION, XLS_EXTENSION } from './helpers/constants'
import './styles/App.css'

function App() {
  const [parsedData, setParsedData] = useState<any[][] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Reset previous data
    setParsedData(null)
    setError(null)

    // Validate file type
    if (!file.name.endsWith(XLSX_EXTENSION) && !file.name.endsWith(XLS_EXTENSION)) {
      setError(`Please upload a valid Excel file (${XLSX_EXTENSION} or ${XLS_EXTENSION})`)
      return
    }

    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result
        if (!data) {
          setError('Failed to read file')
          return
        }

        // Parse the Excel file
        const workbook = XLSX.read(data, { type: 'binary' })
        
        // Get the first sheet
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        
        // Extract data from first sheet only
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
          header: 1,
          defval: '',
        })

        const parsedData =  parseExcelFile(jsonData as unknown[][]);
        setParsedData(parsedData);

        console.log('Parsed Excel data:', jsonData)
      } catch (err) {
        console.error('Error parsing file:', err)
        setError('Failed to parse Excel file. Please ensure it is a valid file.')
      }
    }

    reader.onerror = () => {
      setError('Error reading file')
    }

    // Read file as binary string
    reader.readAsBinaryString(file)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>XLSX File Viewer</h1>
        <p>Upload an Excel file to view its contents</p>
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
            <h2>File Contents</h2>
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
