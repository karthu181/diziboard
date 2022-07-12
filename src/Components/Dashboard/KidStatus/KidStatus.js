import React, { useEffect } from "react";
import { useState } from "react";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highcharts3d from "highcharts/highcharts-3d";
highcharts3d(Highcharts);

const KidStatus = () => {
  //initial animation is true, ==> first time animation appears, on click of 2d or 3d buttons,
  //animation is false on click of buttons 2d or 3d

  var easeOutBounce = function(pos) {
    if (pos < 1 / 2.75) {
      return 7.5625 * pos * pos;
    }
    if (pos < 2 / 2.75) {
      return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
    }
    if (pos < 2.5 / 2.75) {
      return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
    }
    return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
  };

  Math.easeOutBounce = easeOutBounce;

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
        animation: {
          duration: 1000,
          // Uses Math.easeOutBounce
          easing: "easeOutBounce",
        },
      },

      // },
    },
    title: {
      text: "Browser market shares at a specific website, 2014",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 75,
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Browser share",
        data: [
          ["present", 45.0],
          ["absent", 26.8],
          {
            name: "Chrome",
            y: 12.8,
          },
        ],

        // animation: piechartAnimation
        //   ? {
        //       duration: 5000,
        //       // Uses Math.easeOutBounce
        //       easing: "easeOutBounce",
        //     }
        //   : false,
      },
    ],
  });

  const Handler2d = () => {
    // setAlphaAngle(0);
    setChartOptions({
      chart: {
        options3d: {
          enabled: true,
          alpha: 0,
          beta: 0,
        },
      },
      plotOptions: {
        pie: {
          depth: 0,
          alpha: 0,
        },
      },
    });
    // setThreeD(false);
  };

  const Handler3d = () => {
    // setAlphaAngle(45);
    // setThreeD(true);
    setChartOptions({
      chart: {
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
      },
      plotOptions: {
        pie: { depth: 75 },
      },
    });
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <button onClick={Handler2d}>2D</button>
      <button onClick={Handler3d}>3D</button>
    </div>
  );
};

export default KidStatus;
