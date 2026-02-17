import React from 'react'

export function generateErrorListing(errorsData: string[],   
   t: React.Context<any>,
): React.ReactNode {
    return (
        <div style={{ overflowY: 'scroll', maxHeight:'400px' }}>
          <table>
            <thead>
              <tr>
                <th>              
                  {t.dialog.table.errorIndex}
                </th>
                <th>              
                  {t.dialog.table.errorValue}
                </th>
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
}

export function generateHeaderDifferences(current: string[],
   expected: string[], 
   t: React.Context<any>,
): React.ReactNode {
    return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: 'bold', paddingRight: '1rem' }}>
              {t.dialog.table.currentHeader}
              </td>
            {current.map((item, i) => (
              <td key={i} style={{ padding: '0 8px' }}>{item}</td>
            ))}
          </tr>

          <tr>
            <td style={{ fontWeight: 'bold', paddingRight: '1rem' }}>
              {t.dialog.table.expectedHeader}
            </td>
            {expected.map((item, i) => (
              <td key={i} style={{ padding: '0 8px' }}>{item}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}