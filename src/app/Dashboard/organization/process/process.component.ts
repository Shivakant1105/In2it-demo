import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { FunnelSeries, SlicedChart } from '@amcharts/amcharts5/percent';
import { Root } from '@amcharts/amcharts5';


@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css'],
})
export class ProcessComponent implements AfterViewInit, OnDestroy {
  private root: Root | any;
 
  private root4: Root | any;
  
  constructor(
    
  ) {}



ngAfterViewInit() {
  // this.certaintyChart();

  // this.funnelChartSeries();
  this.salesBarChart()
  console.log(this.funnelChartSeries);
  
  }
  salesBarChart() {
    this.root = am5.Root.new('bardiv');

    this.root._logo?.dispose();

    let chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panY: false,
        panX: true,  wheelX: "panX",
        paddingLeft: 0,
        layout: this.root.verticalLayout,
      })
    );
    chart.plotContainer.children.push(
      am5.Label.new(this.root, {
        text: '[bold]Sales Tickets Per Owner',
        x: 500,
        y: 2,          
      })
    );

    let sales_ticket_per_owner = [
      {
        user_name: 'Tinku Sharma',
        total_ticket: 9,
      },
      {
        user_name: 'Vishal Mishra',
        total_ticket: 3,
      },
      {
        user_name: 'Pawna Kumare',
        total_ticket: 19,
      },
      {
        user_name: 'Shivank Tyagi',
        total_ticket: 36,
      },
      {
        user_name: 'Vikash Tiwari123',
        total_ticket: 6,
      },
      {
        user_name: 'Ankit Tyagi',
        total_ticket: 90,
      },
      {
        user_name: 'Riya Singh',
        total_ticket: 12,
      },
      {
        user_name: 'Amit Patel',
        total_ticket: 28,
      },
      {
        user_name: 'Neha Gupta',
        total_ticket: 50,
      },
      {
        user_name: 'Rajesh Kumar',
        total_ticket: 7,
      },
      {
        user_name: 'Priya Sharma',
        total_ticket: 15,
      },  {
        user_name: ' Sharma',
        total_ticket: 15,
      },
      // {
      //   user_name: "Priya Sharma",
      //   total_ticket: 20
      // },
      // {
      //   user_name: "Rahul Singh",
      //   total_ticket: 8
      // },
      // {
      //   user_name: "Deepika Patel",
      //   total_ticket: 13
      // },
      // {
      //   user_name: "Arjun Mehta",
      //   total_ticket: 6
      // },
      // {
      //   user_name: "Ayesha Khan",
      //   total_ticket: 21
      // },
      // {
      //   user_name: "Rohan Sharma",
      //   total_ticket: 15
      // },
      // {
      //   user_name: "Pooja Malhotra",
      //   total_ticket: 9
      // },
      // {
      //   user_name: "Vikram Yadav",
      //   total_ticket: 11
      // },
      // {
      //   user_name: "Natasha Verma",
      //   total_ticket: 17
      // },
      // {
      //   user_name: "Ankit Chauhan",
      // total_ticket: 4
      // },
      // {
      //   user_name: "Tanvi Desai",
      //   total_ticket: 10
      // },
    ];

    let filteredData = sales_ticket_per_owner.slice(0, 6);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {}),
        visible: true,
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        renderer: am5xy.AxisRendererX.new(this.root, {}),
        // startLocation:1,
        // endLocation: 3,
        categoryField: 'user_name',
      
      })
    );
    xAxis.data.setAll(filteredData);
    yAxis.get('renderer').grid.template.setAll({
      visible: false,
    });
    xAxis.get('renderer').grid.template.setAll({
      visible: true,
    });

    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(this.root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'total_ticket',
        categoryXField: 'user_name',
      })
    );
    series1.columns.template.setAll({ width: am5.percent(50) });
    series1.data.setAll(filteredData);
   
    let add =0;
    let remove =0
    let gap=sales_ticket_per_owner.length-filteredData.length
    // let lastAddedIndex = filteredData.length - 1; // Initialize with the index of the last element in filteredData

    // let addButton = document.getElementById('addButton');
    // addButton!.addEventListener('click', () => {
    //     // Add data from JSON
    //     if (add < gap && add >= 0) {
    //         let myobject = {
    //             user_name: sales_ticket_per_owner[add + filteredData.length].user_name,
    //             total_ticket: sales_ticket_per_owner[add + filteredData.length].total_ticket
    //         }
    
    //         filteredData.push(myobject);
    //         xAxis.data.setAll(filteredData);
    //         series1.data.setAll(filteredData);
    //         add++;
    //         lastAddedIndex = filteredData.length - 1; // Update lastAddedIndex
    //         remove++; // Update remove count
    //         console.log("ADD the data", filteredData);
    //     } else {
    //         console.log("no data")
    //     }
    // });
    let addButton = document.getElementById('addButton');
addButton!.addEventListener('click', () => {
    // Add data from JSON
    if (add < gap && add >= 0) {
        let myobject = {
            user_name: sales_ticket_per_owner[add + filteredData.length].user_name,
            total_ticket: sales_ticket_per_owner[add + filteredData.length].total_ticket
        }

        filteredData.push(myobject);
        xAxis.data.setAll(filteredData);
        series1.data.setAll(filteredData);
        add++;
        // lastAddedIndex = filteredData.length - 1; // Update lastAddedIndex
        remove++; // Update remove count
        
        // Scroll chart to the latest data
        // chart.startIndex = Math.max(filteredData.length - 6, 0);  // Assuming the chart shows 6 data points, adjust accordingly
        
        console.log("ADD the data", filteredData);
    } else {
        console.log("no data")
    }
});

    let removeButton = document.getElementById('removeButton');
    removeButton?.addEventListener('click', () => {
        // Remove the last added data point
        if (remove > 0) {
            filteredData.pop();
            xAxis.data.setAll(filteredData);
            series1.data.setAll(filteredData);
            // lastAddedIndex--; // Update lastAddedIndex
            remove--; // Update remove count
        }
        console.log("Remove the data", filteredData);
    });
    
    // let addButton = document.getElementById('addButton');
    // addButton!.addEventListener('click', () => {
    //   // Add data from JSON

    //   if (add<gap && add>=0) {
    //    let myobject={
    //     user_name:sales_ticket_per_owner[add+filteredData.length].user_name,
    //     total_ticket:sales_ticket_per_owner[add+filteredData.length].total_ticket
    //    }

    //     filteredData.push(myobject);
    //     filteredData.shift();
    //     xAxis.data.setAll(filteredData);
    //     series1.data.setAll(filteredData);
    //     add=add+1
    //     remove=remove+1
        
    //   console.log("ADD the data",filteredData);
       
    //   }
      
    //   else{
    //     console.log("no data")
    //   }
    // });

    // let removeButton = document.getElementById('removeButton');
    // removeButton?.addEventListener('click', () => {
    //   // Remove the last added data point
    //   if (remove>0) {
    //    let valuelastIndex=filteredData[filteredData.length-1]
    //    for(let i=0;i<sales_ticket_per_owner.length;i++)
    //     {
    //       if(sales_ticket_per_owner[i].user_name==valuelastIndex.user_name && sales_ticket_per_owner[i].total_ticket==valuelastIndex.total_ticket )
    //         {
    //           index=i-1
    //           break
    //         }
    //     }
    //     let myobject={
    //       user_name:sales_ticket_per_owner[index-filteredData.length+1].user_name,
    //       total_ticket:sales_ticket_per_owner[index-filteredData.length+1].total_ticket
    //      }
    //      filteredData.pop();
    //     filteredData.unshift(myobject);
    //     xAxis.data.setAll(filteredData);
    //     series1.data.setAll(filteredData);
    //     index=index-1
    //     remove=remove-1
    //     add=add-1
    //   }
      console.log("Remove the data",filteredData);
      
    // });
  }

  // Call the sales function to render the chart

  
  certaintyChart() {
    // Certainity chart
    this.root4 = am5.Root.new('chartDiv1');
    this.root4._logo?.dispose();
  
    // Set data
    let certainity = [
      { name: 'High', value: 32 },
      { name: 'Moderate', value: 47 },
      { name: 'Low', value: 28 },
      { name: 'Extremely High', value: 10 },
      { name: 'Almost Lost', value: 2 },
    ];
  
    let chart = this.root4.container.children.push(
      am5xy.XYChart.new(this.root4, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        paddingLeft: 0,
      })
    );
 
    // Create axes
    let yRenderer = am5xy.AxisRendererY.new(this.root4, {
      minGridDistance: 30,
      minorGridEnabled: true,
    });
  
    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(this.root4, {
        maxDeviation: 0,
        categoryField: 'name',
        renderer: yRenderer,
        visible: false,
      })
    );
  
    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(this.root4, {
        maxDeviation: 0,
        min: 0,
        renderer: am5xy.AxisRendererX.new(this.root4, {
          visible: true,
          strokeOpacity: 0.1,
          minGridDistance: 80,
        }),
        visible: false,
      })
    );
  
    yAxis.get('renderer').grid.template.setAll({
      visible: false,
    });
    xAxis.get('renderer').grid.template.setAll({
      visible: false,
    });
  
    // Create series
    let series = chart.series.push(
      am5xy.ColumnSeries.new(this.root4, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: 'value',
        
        sequencedInterpolation: true,
        categoryYField: 'name',
        categoryXField: "category",
    legendLabelText: "{name}: {categoryY}",
    legendRangeLabelText: "{name}",
        // fill: am5.color(0x095256),
       
      })
    );
    
    series.bullets.push(() => {
      return am5.Bullet.new(this.root4, {
        locationX: 1,
        locationY: 0.5,
        sprite: am5.Label.new(this.root4, {
          centerY: am5.p50,
          text: '{valueX}',
          populateText: true,
        }),
      });
    });
  
    yAxis.data.setAll(certainity);
    series.data.setAll(certainity);
  




    let legend1 = chart.children.push(
      am5.Legend.new(this.root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );
    
    // Add series
    // Your series creation function...
    
    // Populate legend for the first chart
    chart.series.each((series: { get: (arg0: string) => any; }) => {
      legend1.data.push({
        name: series.get("name"),
        fill: series.get("fill"),
      });
    });
    
    let legend2 = chart.children.push(
      am5.Legend.new(this.root4, {
        name:"name",
        y: am5.percent(100),
      })
    );
    
    // Populate legend for the second chart
    chart.series.each((series: { get: (arg0: string) => any; }) => {
      legend2.data.push({
        name: series.get("name"),
        fill: series.get("fill"),
      });
    });
    







    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(this.root4, {
        name:"name",
        y: am5.percent(100),
      })
    );
    certainity.forEach((item) => {
      legend.data.push({
        name: item.name,
        fill: series.get('fill'),
      });
    });
    legend.data.setAll(series.dataItems);
  }

  funnelChartSeries() {
    let root = am5.Root.new("chartdiv");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    // root.setThemes([
    //   am5themes_Animated.new(root)
    // ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
    let chart = root.container.children.push(SlicedChart.new(root, {
      
     
      layout: root.verticalLayout

    }));
    
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
    let series = chart.series.push(FunnelSeries.new(root, {
      alignLabels: false,
      orientation: "vertical",
      valueField: "count",
      categoryField: "",
    width:300,
    marginLeft:50,
    legendValueText: '{name}',
      legendLabelText: '{percentage}',
    
    }));
 
    // series.labels.template.set("forceHidden", true);
    series.labels.template.set("text", "{value}");
    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
    series.data.setAll([
    
      {
        name: 'Lead',
        count: 413,
        percentage: '27%',
      },
      {
        name: 'Opportunity',
        count: 113,
        percentage: '76%',
      },
      {
        name: 'Quotation',
        count: 86,
        percentage: '58%',
      },
      {
        name: 'Order',
        count: 50,
        percentage: '0%',
      },
    ]);
    
    
    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    // series.appear();
    
    
    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    let legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.percent(60),
      // paddingBottom:150,
      y: am5.percent(10),
      marginTop: 15,
      marginBottom: 15,
      layout: root.verticalLayout,

    }));
    let legend1 = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.percent(30),
      y: am5.percent(10),
      marginTop: 15,
      marginBottom: 15,
      layout: root.verticalLayout,

    }));
    legend.data.setAll(series.dataItems);
    legend1.data.setAll(series.dataItems);
    
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

}
ngOnDestroy() {
  if (this.root) {
    this.root.dispose();
  }
}}