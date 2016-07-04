# workflowChart.js
This is a simple jQuery plugin to generate workflow chart like below

![screenshot](screenshot.png)
## Dependencies
jQuery

svg.js

## Usage
include jquery.js, svg.js and workflowChart.js
```javascript
$('.workflow').workflowChart({
            data: [
                {id: 1, title: 'Node 1', parent: null, optional: false},
                {id: 2, title: 'Node 2', parent: 1, optional: false},
                {id: 3, title: 'Node 3', parent: 2, optional: true, link: 'http://www.google.com'},
                {id: 4, title: 'Node 4', parent: 2, optional: false, link: 'http://www.google.com'},
                {id: 5, title: 'Node 5', parent: 4, optional: false, link: 'http://www.google.com'},
                {id: 6, title: 'Node 6', parent: 5, optional: false, link: 'http://www.google.com'}
            ]
        })
```

## Options
`height`: chart height, default 160

`textSize`: text size, default 20

`circleSize`: cirle size, default 20

`chartColor`: color of circles, lines and arrows, default #45B6AF

`textColor`: text color, default black

`data`: list of nodes, see below for more detail
## Data options
`id`: node id

`title`: node text to show in the chart

`parent`: parent id

`optional`: if `true`, line and arrow will be drawn in dashes

`link`: link on click, this is optional