async function loadCSV() {
  const response = await fetch("test_data.csv");
  const text = await response.text();

  const rows = text.trim().split("\n");
  const header = rows.shift(); // remove header

  return rows.map(row => {
    const cols = row.split(",");

    return {
      series: cols[0],
      x: parseFloat(cols[1]),
      y: parseFloat(cols[2]),
      z: parseFloat(cols[3]),
      color: cols[4],
      note: cols[5],
    };
  });
}

async function drawChart() {
  const rawData = await loadCSV();

  // Convert to Highcharts format (single series with styled points)
  const data = rawData.map(d => ({
    x: d.x,
    y: d.y,
    z: d.z,
    color: d.color,
    name: d.series,
    note: d.note
  }));

  Highcharts.chart("container", {
    chart: {
       type: 'bubble',
        plotBorderWidth: 1,
        zooming: {
            type: 'xy'
        }
    },

    title: {
      text: "CSV Scatter Plot"
    },

    xAxis: {
      title: { text: "X" }
    },

    yAxis: {
      title: { text: "Y" }
    },

    tooltip: {
      pointFormat:
        "<b>{point.name}</b><br/>x: {point.x}<br/>y: {point.y}"
    },

    series: [{
      name: "Data",
      data: data
    }]
  });
}

drawChart();
