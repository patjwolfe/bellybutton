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

    // console.log(`otuIDs: ${otuIDs}`);
    // console.log(`sampleValues: ${sampleValues}`);
    // console.log(`otuLabels: ${otuLabels}`);


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
      width: 600
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


    //need to figure out how to sort and filter top ten...
    console.log(`response: ${response}`);   //returns object, not array?

    response.sort(function(a, b) {return a.sample_values - b.sample_values});
    console.log(`sort: ${response}`);

    response.reverse();
    console.log(`reverse: ${response}`);

    response.slice(0,9);
    console.log(`slice: ${response}`);


    var otuIDs = response.otu_ids;
    var sampleValues = response.sample_values;
    var otuLabels = response.otu_labels;


    // var filteredData = response.filter(sample => sample.sample_values > 100);
    
    // var otuIDs = filteredData.map(sample => sample.otu_ids);
    // var sampleValues = filteredData.map(sample => sample.sample_values);
    // var otuLabels = filteredData.map(sample => sample.otu_labels);

    // var sampleValuesPie = Math.max.apply(null, sampleValues);
    

    var data = [{
      values: sampleValues,
      labels: otuIDs,
      hoverinfo: otuLabels,  //is this working?
      type: 'pie'
    }];
    
    var layout = {
      height: 500,
      width: 500
    };
          
  Plotly.newPlot('pie', data, layout);   
  


    // BONUS: Build the Gauge Chart
    //gaugeChart = d3.select(".gauge");

    // buildGauge(data.WFREQ);
//     d3.json(url).then(function(response) {

//       var wfreq = response.WFREQ;

  
//       // Enter a speed between 0 and 180
//       var wfreq = 175;

//       // Trig to calc meter point
//       var degrees = 180 - wfreq,
//           radius = .5;
//       var radians = degrees * Math.PI / 180;
//       var x = radius * Math.cos(radians);
//       var y = radius * Math.sin(radians);

//       // Path: may have to change to create a better triangle
//       var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
//           pathX = String(x),
//           space = ' ',
//           pathY = String(y),
//           pathEnd = ' Z';
//       var path = mainPath.concat(pathX,space,pathY,pathEnd);

//       var data = [{ type: 'scatter',
//         x: [0], y:[0],
//           marker: {size: 28, color:'850000'},
//           showlegend: false,
//           name: 'speed',
//           text: wfreq,
//           hoverinfo: 'text+name'},
//         { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
//         rotation: 90,
//         text: ['TOO FAST!', 'Pretty Fast', 'Fast', 'Average',
//                   'Slow', 'Super Slow', ''],
//         textinfo: 'text',
//         textposition:'inside',
//         marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
//                               'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
//                               'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
//                               'rgba(255, 255, 255, 0)']},
//         labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
//         hoverinfo: 'label',
//         hole: .5,
//         type: 'pie',
//         showlegend: false
//       }];

//       var layout = {
//         shapes:[{
//             type: 'path',
//             path: path,
//             fillcolor: '850000',
//             line: {
//               color: '850000'
//             }
//           }],
//         title: 'Gauge 
//       Speed 0-100',
//         height: 1000,
//         width: 1000,
//         xaxis: {zeroline:false, showticklabels:false,
//                   showgrid: false, range: [-1, 1]},
//         yaxis: {zeroline:false, showticklabels:false,
//                   showgrid: false, range: [-1, 1]}
// };


      



//       Plotly.newPlot('gauge', data, layout);      
//     });
  

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
