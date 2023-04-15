function buildCharts(sample, data) {
    // Get the top 10 OTUs for the selected sample
    let otu_ids = data.samples[sample].otu_ids.slice(0, 10).reverse();
    let sample_values = data.samples[sample].sample_values.slice(0, 10).reverse();
    let otu_labels = data.samples[sample].otu_labels.slice(0, 10).reverse();
  
    // Horizontal bar chart
    let barTrace = {
      x: sample_values,
      y: otu_ids.map(id => `OTU ${id}`),
      text: otu_labels,
      type: 'bar',
      orientation: 'h'
    };
  
    let barLayout = {
      title: 'Top 10 OTUs'
    };
  
    Plotly.newPlot('bar', [barTrace], barLayout);
  
    // Bubble chart
    let bubbleTrace = {
      x: data.samples[sample].otu_ids,
      y: data.samples[sample].sample_values,
      text: data.samples[sample].otu_labels,
      mode: 'markers',
      marker: {
        size: data.samples[sample].sample_values,

      }
    };
  
    let bubbleLayout = {
      title: 'OTU Samples',
      xaxis: {title: 'OTU ID'},
      yaxis: {title: 'Sample Values'}
    };
  
    Plotly.newPlot('bubble', [bubbleTrace], bubbleLayout);
  }
  
  
  function initDropdown(data) {
    let dropdown = d3.select("#selDataset");
    data.names.forEach(name => {
      dropdown.append("option").attr("value", name).text(name);
    });
  }
  
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    console.log(data);
  
    // Populate the dropdown menu and build the initial charts
    initDropdown(data);
    buildCharts(0, data);
    displayMetadata(0, data);
  });
  
