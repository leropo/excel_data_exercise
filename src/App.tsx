import { useState } from 'react'
import * as XLSX from 'xlsx'
import './App.css'

interface ParsedData {
  sheetNames: string[]
  sheets: { [sheetName: string]: any[][] }
}

function App() {
  const [parsedData, setParsedData] = useState<ParsedData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Reset previous data
    setParsedData(null)
    setError(null)

    // Validate file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Please upload a valid Excel file (.xlsx or .xls)')
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
        
        // Extract sheet names
        const sheetNames = workbook.SheetNames
        
        // Extract data from each sheet
        const sheets: { [sheetName: string]: any[][] } = {}
        
        sheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
            header: 1,
            defval: ''
          })
          sheets[sheetName] = jsonData as any[][]
        })

        setParsedData({
          sheetNames,
          sheets
        })

        console.log('Parsed Excel data:', { sheetNames, sheets })
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
        <div className="upload-section">
          <label htmlFor="file-upload" className="upload-label">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Choose XLSX File
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="file-input"
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {parsedData && (
          <div className="content-display">
            <h2>File Contents</h2>
            {parsedData.sheetNames.map((sheetName, index) => (
              <div key={index} className="sheet-container">
                <h3 className="sheet-name">{sheetName}</h3>
                <div className="table-wrapper">
                  <table className="data-table">
                    <tbody>
                      {parsedData.sheets[sheetName].map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell || ''}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
