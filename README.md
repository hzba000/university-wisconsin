<h1> University of Wisconsin Data Concept </h1>

<h2>Purpose</h2>
<p>This is a data visualization mockup for the University of Wisconsin</p>

<h2> Live Link </h2>
<a href="https://hzba000.github.io/university-wisconsin/"> Live Link </a>

<h2>Local Installation</h2>
<p>Clone this repo: https://github.com/hzba000/university-wisconsin</p>
<p>Type 'npm install' after navigating to the project folder in your terminal</p>
<p>Add an .env file to the root folder with an API key for the college scorecard API --> (REACT_APP_API_KEY=YOUR_KEY)</p>
<p>Type 'npm run start' to launch the site in your browser
 
 <h2>Things you can do</h2>
 <p>View Data by dragging your mouse over the donut charts</p>
 <p>Print the website by clicking on the 'Print' button</p>
 <p>Download the data used for visualization by clicking on the 'Download CSV' button</p>
 <p>Open in Pdf by clicking on the 'Generate Pdf' button</p>
 
 <h2>Known issues</h2>
 <p>Need more media queries for responsiveness</p>
 <p>When printing, the page prints everything it sees on the page (unfortunately, because I have a mouseover event to display numbers, 
     printing only shows the graphs and legends -- data is still available by downloading)</p>
  <p>I could combine the graph components and feed them different data from my Landing component(the parent)...DRY...</p>
  <p>I attempted to use jsPDF for conversion from HTML to PDF. I need more time to work through the conversion of SVG elements to canvas 
     and then to PDF</p>
  <p>I know the legends should be clickable to view hard data(Currently I only have a mouseover event)</p>
  <p>There is some variability in the way elements are presented on various browsers, I'm not sure what is causing it</p>
  <p>There are touchups needed to make the data easier to read and enhance the user experience</p>
  <p>I need to add code to help with accessibility issues</p>



 






  
 



