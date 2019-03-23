function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var url = `/metadata/${sample}`;
  
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(response) {
    
    // Use d3 to select the panel with id of `#sample-metadata`
    sampleMetadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampleMetadata.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    
    Object.entries(response).forEach(([key, value]) => sampleMetadata.append("div").text(`${key}: ${value}`));


  });
  

};

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;

  otuIDs = [];
  sampleValues = [];
  otuLabels = [];
  wfreq = [];


// @TODO: Build a Bubble Chart using the sample data
  /*
  Use otu_ids for the x values
  Use sample_values for the y values
  Use sample_values for the marker size
  Use otu_ids for the marker colors
  Use otu_labels for the text values
  */

  d3.json(url).then(function(response) {

    var otuIDs = response.otu_ids;
    var sampleValues = response.sample_values;
    var otuLabels = response.otu_labels;

    var trace1 = {
      x: otuIDs,
      y: sampleValues,
      mode: 'markers',
      labels: otuLabels,
      marker: {
        size: sampleValues,
        color: otuIDs
      }
    };
      
    var data = [trace1];
    
    var layout = {
      title: 'Belly Button Bubble Chart',
      showlegend: false,
      height: 600,    //make these dynamic?  
      width: 1200
    };
    
    Plotly.newPlot('bubble', data, layout);      
  });



  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).

  /*
  Use sample_values as the values for the PIE chart
  Use otu_ids as the labels for the pie chart
  Use otu_labels as the hovertext for the chart
  */

  d3.json(url).then(function(response) {

    var otuIDs = response.otu_ids;
    var sampleValues = response.sample_values;
    var otuLabels = response.otu_labels;

    sampleValues.sort(function(a, b) {return a - b});
    sampleValues.reverse();
    sampleValues = sampleValues.slice(0,10);


    var data = [{
      values: sampleValues,
      labels: otuIDs,
      hoverinfo: otuLabels,  //is this working?
      type: 'pie'
    }];
    
    var layout = {
      title: 'Belly Button Pie Chart',
      height: 600,
      width: 600
    };
          
  Plotly.newPlot('pie', data, layout);   
  



});

};




function init() {
// Grab a reference to the dropdown select element
var selector = d3.select("#selDataset");

// Use the list of sample names to populate the select options
d3.json("/names").then((sampleNames) => {
sampleNames.forEach((sample) => {
  selector
    .append("option")
    .text(sample)
    .property("value", sample);
});
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};

// Initialize the dashboard
init();
