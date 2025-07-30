/******************************************************************
 *                          export-patch.js
 *  DROP THIS IN AFTER app.js - no other changes needed
 ******************************************************************/

(function () {
  /*--------------------------------------------------------------
   * Utility: downloadBlob()
   * Creates a Blob URL, appends a hidden link, clicks it,
   * then revokes URL for actual file download.
   *------------------------------------------------------------*/
  function downloadBlob(blob, fileName) {
    try {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 150);
    } catch (err) {
      console.error('Download error:', err);
      showToast('Download failed - see console', true);
    }
  }

  /*--------------------------------------------------------------
   * Utility: showToast()
   * Displays a brief message at top-right.
   *------------------------------------------------------------*/
  function showToast(msg, isError = false) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.color = isError ? '#ff5555' : '#ffffff';
    toast.style.display = 'block';
    setTimeout(() => (toast.style.display = 'none'), 3000);
  }

  /*--------------------------------------------------------------
   * Utility: getScannerRows()
   * Extracts visible rows from #scannerTable into JS objects.
   *------------------------------------------------------------*/
  function getScannerRows() {
    const rows = [];
    document.querySelectorAll('#scannerTable tbody tr').forEach((tr) => {
      const cells = tr.querySelectorAll('td');
      if (cells.length) {
        rows.push({
          Symbol: cells[0].innerText.trim(),
          FScore: cells[1].innerText.trim(),
          TScore: cells[2].innerText.trim(),
          AIScore: cells[3].innerText.trim(),
          LastPrice: cells[4].innerText.trim(),
          Sector: cells[5].innerText.trim(),
        });
      }
    });
    return rows;
  }

  /*--------------------------------------------------------------
   * Utility: toCSV()
   * Converts array of objects to CSV string.
   *------------------------------------------------------------*/
  function toCSV(arr) {
    if (!arr.length) return '';
    const headers = Object.keys(arr[0]).join(',');
    const rows = arr
      .map((row) =>
        Object.values(row)
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');
    return `${headers}\n${rows}`;
  }

  /*--------------------------------------------------------------
   * Hook up the Export Buttons on DOM ready
   *------------------------------------------------------------*/
  window.addEventListener('DOMContentLoaded', () => {
    const btnCSV = document.getElementById('exportCsv');
    const btnJSON = document.getElementById('exportJson');

    if (btnCSV) {
      btnCSV.addEventListener('click', () => {
        const data = getScannerRows();
        if (!data.length) return showToast('Nothing to export');
        const csv = toCSV(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        downloadBlob(blob, 'scanner_export.csv');
        showToast('CSV exported ✔');
      });
    }

    if (btnJSON) {
      btnJSON.addEventListener('click', () => {
        const data = getScannerRows();
        if (!data.length) return showToast('Nothing to export');
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: 'application/json',
        });
        downloadBlob(blob, 'scanner_export.json');
        showToast('JSON exported ✔');
      });
    }
  });
})();
