// import React, { useContext, useEffect, useState } from "react";
// import ChartFilter from "./ChartFilter";
// import Card from "./Card";
// import {
//   Area,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   AreaChart,
//   Tooltip,
// } from "recharts";
// import ThemeContext from "../context/ThemeContext";
// import StockContext from "../context/StockContext";
// import { fetchHistoricalData } from "../api/stock-api";
// import {
//   createDate,
//   convertDateToUnixTimestamp,
//   convertUnixTimestampToDate,
// } from "../Helpers/date-helper";
// import { chartConfig } from "../constants/config";

// const Chart = () => {
//   const [filter, setFilter] = useState("1W");

//   const { darkMode } = useContext(ThemeContext);

//   const { stockSymbol } = useContext(StockContext);

//   const [data, setData] = useState([]);

//   const formatData = (data) => {
//     return data.c.map((item, index) => {
//       return {
//         value: item.toFixed(2),
//         date: convertUnixTimestampToDate(data.t[index]),
//       };
//     });
//   };

//   useEffect(() => {
//     const getDateRange = () => {
//       const { days, weeks, months, years } = chartConfig[filter];

//       const endDate = new Date();
//       const startDate = createDate(endDate, -days, -weeks, -months, -years);

//       const startTimestampUnix = convertDateToUnixTimestamp(startDate);
//       const endTimestampUnix = convertDateToUnixTimestamp(endDate);
//       return { startTimestampUnix, endTimestampUnix };
//     };

//     const updateChartData = async () => {
//       try {
//         const { startTimestampUnix, endTimestampUnix } = getDateRange();
//         const resolution = chartConfig[filter].resolution;
//         const result = await fetchHistoricalData(
//           stockSymbol,
//           resolution,
//           startTimestampUnix,
//           endTimestampUnix
//         );
//         setData(formatData(result));
//       } catch (error) {
//         setData([]);
//         console.log(error);
//       }
//     };

//     updateChartData();
//   }, [stockSymbol, filter]);

//   return (
//     <Card>
//       <ul className="flex absolute top-2 right-2 z-40">
//         {Object.keys(chartConfig).map((item) => (
//           <li key={item}>
//             <ChartFilter
//               text={item}
//               active={filter === item}
//               onClick={() => {
//                 setFilter(item);
//               }}
//             />
//           </li>
//         ))}
//       </ul>
//       <ResponsiveContainer>
//         <AreaChart data={data}>
//           <defs>
//             <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
//               <stop
//                 offset="5%"
//                 stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
//                 stopOpacity={0.8}
//               />
//               <stop
//                 offset="95%"
//                 stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
//                 stopOpacity={0}
//               />
//             </linearGradient>
//           </defs>
//           <Tooltip
//             contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
//             itemStyle={darkMode ? { color: "#818cf8" } : null}
//           />
//           <Area
//             type="monotone"
//             dataKey="value"
//             stroke="#312e81"
//             fill="url(#chartColor)"
//             fillOpacity={1}
//             strokeWidth={0.5}
//           />
//           <XAxis dataKey="date" />
//           <YAxis domain={["dataMin", "dataMax"]} />
//         </AreaChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// };

// export default Chart;
import React, { useContext, useEffect, useState } from "react";
import ChartFilter from "./ChartFilter";
import Card from "./Card";
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
} from "recharts";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { fetchHistoricalData } from "../api/stock-api";
import {
  createDate,
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
} from "../Helpers/date-helper";
import { chartConfig } from "../constants/config";

const Chart = () => {
  const [filter, setFilter] = useState("1W");
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const [data, setData] = useState([]);

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      };
    });
  };

  // useEffect(() => {
  //   const getDateRange = () => {
  //     const { days, weeks, months, years } = chartConfig[filter];
  //     const endDate = new Date();
  //     const startDate = createDate(endDate, -days, -weeks, -months, -years);
  //     const startTimestampUnix = convertDateToUnixTimestamp(startDate);
  //     const endTimestampUnix = convertDateToUnixTimestamp(endDate);
  //     return { startTimestampUnix, endTimestampUnix };
  //   };

  //   const updateChartData = async () => {
  //     try {
  //       const { startTimestampUnix, endTimestampUnix } = getDateRange();
  //       const resolution = chartConfig[filter].resolution;
        
  //       console.log("Fetching historical data with parameters:", {
  //         stockSymbol,
  //         resolution,
  //         startTimestampUnix,
  //         endTimestampUnix,
  //       });

  //       const result = await fetchHistoricalData(
  //         stockSymbol,
  //         resolution,
  //         startTimestampUnix,
  //         endTimestampUnix
  //       );

  //       console.log("Fetched historical data:", result);

  //       if (result.s === "ok") {
  //         setData(formatData(result));
  //       } else {
  //         console.error("API returned error status:", result);
  //         setData([]);
  //       }
  //     } catch (error) {
  //       setData([]);
  //       console.log("Error fetching historical data:", error);
  //     }
  //   };

  //   if (stockSymbol) {
  //     updateChartData();
  //   }
  // }, [stockSymbol, filter]);
  // ... existing imports and initial code ...

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];
      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);
      
      // Add logging for date range calculation
      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);
      console.log("Date range calculated:", {
        startDate,
        endDate,
        startTimestampUnix,
        endTimestampUnix
      });
      
      return { startTimestampUnix, endTimestampUnix };
    };

    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[filter].resolution;
        
        console.log("Attempting to fetch data for:", {
          stockSymbol,
          resolution,
          startTimestampUnix,
          endTimestampUnix
        });

        const result = await fetchHistoricalData(
          stockSymbol,
          resolution,
          startTimestampUnix,
          endTimestampUnix
        );

        // Add detailed response logging
        console.log("API Response:", result);

        if (!result || !result.c || !result.t) {
          console.error("Invalid API response format:", result);
          setData([]);
          return;
        }

        const formattedData = formatData(result);
        console.log("Formatted chart data:", formattedData);
        setData(formattedData);

      } catch (error) {
        console.error("Error in updateChartData:", error);
        setData([]);
      }
    };

    if (stockSymbol) {
      console.log("Updating chart for symbol:", stockSymbol);
      updateChartData();
    } else {
      console.log("No stock symbol provided");
      setData([]);
    }
  }, [stockSymbol, filter]);

  // ... rest of the component

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item);
              }}
            />
          </li>
        ))}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fill="url(#chartColor)"
            fillOpacity={1}
            strokeWidth={0.5}
          />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
