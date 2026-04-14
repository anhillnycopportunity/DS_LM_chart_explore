async function loadCSV() {
  const response = await fetch("test_data.csv");
  const text = await response.text();

  const rows = text.trim().split("\n");
  rows.shift(); // remove header

  return rows.map(row => {
    const cols = row.split(",");

    return {
      series: cols[0],
      x: parseFloat(cols[1]),
      y: parseFloat(cols[2]),
      z: parseFloat(cols[3]),
      color: cols[4]
    };
  });
}

async function drawChart() {
  const rawData = await loadCSV();

  // Step 2: Convert to Highcharts format
 const data = rawData.map(d => {
  const cleanColor = d.color
    .replace(/\r/g, "")
    .replace(/"/g, "")
    .trim();

  return {
    x: d.x,
    y: d.y,
    z: d.z,
    name: d.series,
    color: cleanColor
  };
});

  data.forEach(d => console.log(d.color));
  
  Highcharts.chart("container", {
    chart: {
       type: 'bubble',
        plotBorderWidth: 1,
        zoomType: "xy"
    },

    title: {
      text: "CSV Bubble Plot"
    },

    xAxis: {
      title: { text: "X" }
    },

    yAxis: {
      title: { text: "Y" }
    },

    tooltip: {
      useHTML: true,
      pointFormat:
        "<b>{point.name}</b><br/>" +
        "x: {point.x}<br/>" +
        "y: {point.y}<br/>" +
        "z: {point.z}"
    },

    series: [{
      name: "Data",
      colorByPoint: false, 
      data: data
    }]
  });
}

drawChart();
