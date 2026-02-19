# XLSX File Viewer

A streamlined web application designed to parse, validate, and visualize Excel spreadsheets with support for hierarchical data structures.


## Technologies Used

- React 18
- TypeScript
- Vite
- SheetJS (xlsx) - for parsing Excel files

---

## 🛠 How to Setup


### Prerequisites

- Node.js (v18 or higher)
- npm or yarn



Follow these steps to get the project running locally:

1.  **Navigate to the project root:**
    ```bash
    cd project-directory-root
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application will be accessible at:  
[http://localhost:5173/](http://localhost:5173/)

---

## 📖 Usage

### File Upload & Validation
* **Supported Formats:** You can upload **XLSX** (`.xlsx`) or **XLS** (`.xls`) files.
* **Validation Logic:** * Upon upload, the system validates the **header files** first, followed by the **hierarchical structure**.
    * **Note:** If a file is flagged as invalid, you may still proceed. The system will assume a correct header structure and attempt hierarchical parsing regardless.
* **Re-uploading:** If you upload a new file, a confirmation prompt will appear warning that previous content will be overridden. Once confirmed, the data table will reset, showing only the **root nodes** collapsed.

### Localization
Located next to the upload button, you can toggle the application locale. 
* **Supported Languages:** English and Slovenian.
* **Detection Priority:** 
    1.  `localStorage` (User's previous preference)
    2.  Browser language settings
    3.  Default: English

### Data Table Features
Once your data is parsed and the table is generated, you can use the following controls:

| Control Location | Action | Description |
| :--- | :--- | :--- |
| **Left Side** | **Expand All** | Opens every node in the hierarchy. |
| **Left Side** | **Expand to Parent** | Expands nodes up to the parent level. |
| **Left Side** | **Collapse** | Minimizes all nodes to the root level. |
| **Right Side** | **Sticky Header** | Toggles a fixed header that remains visible while scrolling. |

---