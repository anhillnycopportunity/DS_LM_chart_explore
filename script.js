async function loadCSV() {
  const response = await fetch('test_data.csv');
  const text = await response.text();

  const rows = text.trim().split('\n').map(row => row.split(','));

  const table = document.getElementById('csvTable');
  table.innerHTML = '';

  // Header
  const header = document.createElement('tr');
  rows[0].forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    header.appendChild(th);
  });
  table.appendChild(header);

  // Data rows
  for (let i = 1; i < rows.length; i++) {
    const tr = document.createElement('tr');

    rows[i].forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });

    table.appendChild(tr);
  }
}

loadCSV();
