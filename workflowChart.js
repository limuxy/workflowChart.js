'use strict';

(function ($) {
    $.fn.workflowChart = function (options) {
        const settings = $.extend({
            height: 160,
            textSize: 20,
            circleSize: 20,
            chartColor: '#45B6AF',
            textColor: '#000'
        }, options);

        // set height
        this.css('height', settings.height + 'px');

        // group all nodes by their parent id
        let nodesGroupDict = {};
        $.each(settings.data, function (index, node) {
            const parent = node.parent == null ? 0 : node.parent;
            if (!nodesGroupDict.hasOwnProperty(node.parent)) {
                nodesGroupDict[parent] = [];
            }
            nodesGroupDict[parent].push(node)
        });
        let nodesGroupArray = [];
        $.each(nodesGroupDict, function (index, nodes) {
            nodesGroupArray.push(nodes)
        });

        return this.each(function () {
            const svgWidth = $(this).width();
            const draw = SVG(this).size(svgWidth, settings.height);
            // the arrow
            const marker = draw.marker(10, 10, function (add) {
                add.path('M0,0 L10,5 0,10').fill('none').stroke({width: 2, color: settings.chartColor});
            });
            // the arrow of dashes
            const optionalMarker = draw.marker(10, 10, function (add) {
                add.path('M0,0 L10,5 0,10').fill('none').stroke({width: 2, color: settings.chartColor, linecap: "round",
                    dasharray: '2.5, 2.5'});
            });
            // cache of all circles, including property of x, y and optional
            let circles = [];

            $.each(nodesGroupArray, function (index, nodes) {
                const left = svgWidth / nodesGroupArray.length * index;
                const circleGroup = [];
                const groupIndex = index;
                $.each(nodes, function (index, node) {
                    let text;
                    let circle;
                    if (!!node.link) {
                        // the link
                        const link = draw.link(node.link);
                        // the text, evenly distributed
                        text = link.text(node.title).font({size: settings.textSize}).fill(settings.textColor).move(left, settings.height / (nodes.length + 1) * (index+1));
                        // the circle
                        circle = link.circle(settings.circleSize).attr({fill: settings.chartColor}).move(text.cx() - settings.circleSize / 2, text.cy() - settings.circleSize / 2 * 3);
                    } else {
                        text = draw.text(node.title).font({size: settings.textSize}).fill(settings.textColor).move(left, settings.height / (nodes.length + 1) * (index+1));
                        circle = draw.circle(settings.circleSize).attr({fill: settings.chartColor}).move(text.cx() - settings.circleSize / 2, text.cy() - settings.circleSize / 2 * 3);
                    }
                    circleGroup.push({x: circle.cx(), y: circle.cy(), optional: node.optional});
                    // the line
                    $.each(circles[groupIndex - 1], function (index, prevCircle) {
                        const x1 = prevCircle.x;
                        const y1 = prevCircle.y;
                        const x2 = circle.cx();
                        const y2 = circle.cy();
                        if (node.optional || prevCircle.optional) {
                            draw.path(`M${x1} ${y1} L ${x1 + (x2 - x1) / 2} ${y1 + (y2 - y1) / 2} ${x2} ${y2}`).fill('none').stroke({
                                width: 1,
                                color: settings.chartColor,
                                linecap: "round",
                                dasharray: '5, 5'
                            }).marker('mid', optionalMarker)
                        } else {
                            draw.path(`M${x1} ${y1} L ${x1 + (x2 - x1) / 2} ${y1 + (y2 - y1) / 2} ${x2} ${y2}`).fill('none').stroke({
                                width: 1,
                                color: settings.chartColor
                            }).marker('mid', marker)
                        }
                    });
                });
                circles.push(circleGroup);
            });
        })
    }
}(jQuery));