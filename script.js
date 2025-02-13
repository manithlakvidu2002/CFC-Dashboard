// @ts-nocheck
const openButton = document.getElementById("openButton");
const closeButton = document.getElementById("closeButton");
const timeElement = document.getElementById("time");
const dateDisplay = document.getElementById("dateDisplay");
const timeDisplay = document.getElementById("timeDisplay");

// Signal Levels
const signalLevels = document.querySelectorAll(".signal-bar div");

function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  const dateString = now.toLocaleDateString();
  // timeElement.textContent = `Current Date & Time: ${dateString}, ${timeString}`;
  dateDisplay.textContent = ` ${dateString}`;
  timeDisplay.textContent = ` ${timeString}`;
}

openButton.addEventListener("click", () => {
  openButton.classList.add("active");
  closeButton.classList.remove("active");
});

closeButton.addEventListener("click", () => {
  closeButton.classList.add("active");
  openButton.classList.remove("active");
});

const onButton = document.getElementById("onButton");
const offButton = document.getElementById("offButton");

onButton.addEventListener("click", () => {
  onButton.classList.add("active");
  offButton.classList.remove("active");
});

offButton.addEventListener("click", () => {
  offButton.classList.add("active");
  onButton.classList.remove("active");
});

function updateSignal(level) {
  signalLevels.forEach((bar, index) => {
    if (index < level) {
      bar.classList.add("active-signal");
    } else {
      bar.classList.remove("active-signal");
    }
  });
}

// Update the time every second
setInterval(updateTime, 1000);

// Initialize time on page load
updateTime();

// Initialize signal to a default level
updateSignal(4);

// Meter
am5.ready(function () {
  var root = am5.Root.new("chartdiv");
  root._logo.dispose();

  root.setThemes([am5themes_Animated.new(root)]);

  var chart = root.container.children.push(
    am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      startAngle: 180,
      endAngle: 360,
    })
  );

  chart.getNumberFormatter().set("numberFormat", "#°C");

  var axisRenderer = am5radar.AxisRendererCircular.new(root, {
    innerRadius: -40,
  });

  axisRenderer.grid.template.setAll({
    stroke: root.interfaceColors.get("background"),
    visible: true,
    strokeOpacity: 0.8,
  });

  var xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: -10,
      max: 50,
      strictMinMax: true,
      renderer: axisRenderer,
    })
  );

  // Set the label color of the values around the meter to white
  xAxis.get("renderer").labels.template.setAll({
    fill: am5.color(0xffffff), // White color for labels
  });

  var axisDataItem = xAxis.makeDataItem({});

  var clockHand = am5radar.ClockHand.new(root, {
    pinRadius: 50,
    radius: am5.percent(100),
    innerRadius: 50,
    bottomWidth: 0,
    topWidth: 0,
  });

  // Set clock hand and pin to white
  clockHand.pin.setAll({
    fillOpacity: 0,
    strokeOpacity: 0.5,
    stroke: am5.color(0xffffff), // White color for the pin
    strokeWidth: 1,
    strokeDasharray: [2, 2],
  });
  clockHand.hand.setAll({
    fillOpacity: 0,
    strokeOpacity: 0.5,
    stroke: am5.color(0xffffff), // White color for the hand
    strokeWidth: 0.5,
  });

  var bullet = axisDataItem.set(
    "bullet",
    am5xy.AxisBullet.new(root, {
      sprite: clockHand,
    })
  );

  xAxis.createAxisRange(axisDataItem);

  var label = chart.radarContainer.children.push(
    am5.Label.new(root, {
      centerX: am5.percent(50),
      textAlign: "center",
      centerY: am5.percent(50),
      fontSize: "1.5em",
      fill: am5.color(0xffffff), // Set label text color to white
    })
  );

  axisDataItem.set("value", 20);
  bullet.get("sprite").on("rotation", function () {
    var value = axisDataItem.get("value");
    label.set("text", Math.round(value).toString() + "°C");
  });

  setInterval(function () {
    var value = Math.round(Math.random() * 60 - 10);

    axisDataItem.animate({
      key: "value",
      to: value,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic),
    });
  }, 2000);

  chart.bulletsContainer.set("mask", undefined);

  var colorSet = am5.ColorSet.new(root, {});

  // Green Range (-10°C to 20°C)
  var axisRange0 = xAxis.createAxisRange(
    xAxis.makeDataItem({
      above: true,
      value: -10,
      endValue: 20,
    })
  );
  axisRange0.get("axisFill").setAll({
    visible: true,
    fill: am5.color(0x00ff00), // Green
  });
  axisRange0.get("label").setAll({
    forceHidden: true,
  });

  // Amber Range (20°C to 40°C)
  var axisRange1 = xAxis.createAxisRange(
    xAxis.makeDataItem({
      above: true,
      value: 20,
      endValue: 40,
    })
  );
  axisRange1.get("axisFill").setAll({
    visible: true,
    fill: am5.color(0xffc107), // Amber
  });
  axisRange1.get("label").setAll({
    forceHidden: true,
  });

  // Red Range (40°C to 50°C)
  var axisRange2 = xAxis.createAxisRange(
    xAxis.makeDataItem({
      above: true,
      value: 40,
      endValue: 50,
    })
  );
  axisRange2.get("axisFill").setAll({
    visible: true,
    fill: am5.color(0xff0000), // Red
  });
  axisRange2.get("label").setAll({
    forceHidden: true,
  });

  chart.appear(1000, 100);
}); // end am5.ready()

//slideChart
am5.ready(function () {
  // Create root element
  var root = am5.Root.new("slideChartdiv");
  root._logo.dispose();

  // Set themes
  root.setThemes([am5themes_Animated.new(root)]);

  // Generate random data
  var value = 20; // Initial temperature value (°C)

  function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 1000);
    firstDate.setHours(0, 0, 0, 0);

    for (var i = 0; i < 50; i++) {
      var newDate = new Date(firstDate);
      newDate.setSeconds(newDate.getSeconds() + i);

      // Randomize temperature (between -10°C and 50°C)
      value += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2;

      chartData.push({
        date: newDate.getTime(),
        value: value,
      });
    }
    return chartData;
  }

  var data = generateChartData();

  // Create chart
  var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      focusable: true,
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0,
    })
  );

  var easing = am5.ease.linear;

  // Create axes
  var xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      maxDeviation: 0.5,
      groupData: false,
      extraMax: 0.1,
      extraMin: -0.1,
      baseInterval: { timeUnit: "second", count: 1 },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true,
        minGridDistance: 50,
      }),
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  // Y-axis to represent temperature (-10°C to 50°C)
  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      min: -10,
      max: 50, // Temperature range
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  // Set axis labels to white
  xAxis.get("renderer").labels.template.set("fill", am5.color(0xffffff)); // Change x-axis labels to white
  yAxis.get("renderer").labels.template.set("fill", am5.color(0xffffff));

  // Add series for temperature line
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: "Temperature",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "{valueY}°C",
      }),
    })
  );

  // Set initial bullet at the last data point
  data[data.length - 1].bullet = true;
  series.data.setAll(data);

  // Animating bullet at the latest data point
  series.bullets.push(function (root, series, dataItem) {
    if (dataItem.dataContext.bullet) {
      var container = am5.Container.new(root, {});
      var circle0 = container.children.push(
        am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(0xff0000),
        })
      );
      var circle1 = container.children.push(
        am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(0xff0000),
        })
      );

      circle1.animate({
        key: "radius",
        to: 20,
        duration: 1000,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      });
      circle1.animate({
        key: "opacity",
        to: 0,
        from: 1,
        duration: 1000,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      });

      return am5.Bullet.new(root, {
        locationX: undefined,
        sprite: container,
      });
    }
  });

  // Add cursor for interaction
  var cursor = chart.set(
    "cursor",
    am5xy.XYCursor.new(root, {
      xAxis: xAxis,
    })
  );
  cursor.lineY.set("visible", false);

  // Update data every second to simulate real-time temperature updates
  setInterval(function () {
    addData();
  }, 1000);

  function addData() {
    var lastDataItem = series.dataItems[series.dataItems.length - 1];
    var lastValue = lastDataItem.get("valueY");
    var newValue = value + (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2; // Simulate small temperature changes
    var lastDate = new Date(lastDataItem.get("valueX"));
    var time = am5.time.add(new Date(lastDate), "second", 1).getTime();
    series.data.removeIndex(0);
    series.data.push({
      date: time,
      value: newValue,
    });

    var newDataItem = series.dataItems[series.dataItems.length - 1];
    newDataItem.animate({
      key: "valueYWorking",
      to: newValue,
      from: lastValue,
      duration: 600,
      easing: easing,
    });

    // Reuse the bullet for the new data point
    newDataItem.bullets = [];
    newDataItem.bullets[0] = lastDataItem.bullets[0];
    newDataItem.bullets[0].get("sprite").dataItem = newDataItem;

    lastDataItem.dataContext.bullet = false;
    lastDataItem.bullets = [];

    var animation = newDataItem.animate({
      key: "locationX",
      to: 0.5,
      from: -0.5,
      duration: 600,
    });
    if (animation) {
      var tooltip = xAxis.get("tooltip");
      if (tooltip && !tooltip.isHidden()) {
        animation.events.on("stopped", function () {
          xAxis.updateTooltip();
        });
      }
    }
  }

  // Add color bands to indicate temperature zones
  var range0 = yAxis.makeDataItem({ value: -10, endValue: 20 });
  range0
    .get("axisFill")
    .setAll({ fill: am5.color(0x00ff00), fillOpacity: 0.3 }); // Green for normal temperature
  yAxis.createAxisRange(range0);

  var range1 = yAxis.makeDataItem({ value: 20, endValue: 40 });
  range1
    .get("axisFill")
    .setAll({ fill: am5.color(0xffc107), fillOpacity: 0.3 }); // Amber for medium temperature
  yAxis.createAxisRange(range1);

  var range2 = yAxis.makeDataItem({ value: 40, endValue: 50 });
  range2
    .get("axisFill")
    .setAll({ fill: am5.color(0xff0000), fillOpacity: 0.3 }); // Red for high temperature
  yAxis.createAxisRange(range2);

  // Make the chart animate on load
  chart.appear(1000, 100);
}); // end am5.ready()
