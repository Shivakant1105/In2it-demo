import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Root, percent } from '@amcharts/amcharts5';
import { PieChart, PieSeries } from '@amcharts/amcharts5/percent';
import { SlicedChart, FunnelSeries } from '@amcharts/amcharts5/percent';
import * as am5 from '@amcharts/amcharts5';

import * as am5xy from '@amcharts/amcharts5/xy';
@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css'],
})
export class DesignerComponent implements AfterViewInit, OnDestroy {
  private root: Root | any;
  private pieChart: PieChart | any;
  private root2: Root | any;
  private pieChart2: PieChart | any;
  private root3: Root | any;
  private root4: Root | any;
  private funnelChart: SlicedChart | any;

  constructor() {}

  ngAfterViewInit() {
    this.salesBarChart();

    this.sourcePieChart();
    this.variantPieChart();
    this.funnelChartSeries();
    this.certaintyChart();
  }

  

  salesBarChart() {
    this.root = am5.Root.new('bardiv');

    this.root._logo?.dispose();

    let chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panY: false,
        panX: false,
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
        total_ticket: 89,
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
      },
    ];

    let filteredData = sales_ticket_per_owner.slice(0, 6);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {}),
        visible: false,
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        renderer: am5xy.AxisRendererX.new(this.root, {}),
        categoryField: 'user_name',
      })
    );
    xAxis.data.setAll(filteredData);
    yAxis.get('renderer').grid.template.setAll({
      visible: false,
    });
    xAxis.get('renderer').grid.template.setAll({
      visible: false,
    });

    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(this.root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'total_ticket',
        categoryXField: 'user_name',
      })
    );
    series1.columns.template.setAll({ width: am5.percent(20) });
    series1.data.setAll(filteredData);
    let index = 0
    let add =0;
    let remove =0
    let gap=sales_ticket_per_owner.length-filteredData.length

    let addButton = document.getElementById('addButton');
    addButton!.addEventListener('click', () => {
      // Add data from JSON

      if (add<gap && add>=0) {
       let myobject={
        user_name:sales_ticket_per_owner[add+filteredData.length].user_name,
        total_ticket:sales_ticket_per_owner[add+filteredData.length].total_ticket
       }

        filteredData.push(myobject);
        filteredData.shift();
        xAxis.data.setAll(filteredData);
        series1.data.setAll(filteredData);
        add=add+1
        remove=remove+1
        
      console.log("ADD the data",filteredData);
       
      }
      
      else{
        console.log("no data")
      }
    });

    let removeButton = document.getElementById('removeButton');
    removeButton!.addEventListener('click', () => {
      // Remove the last added data point
      if (remove>0) {
       let valuelastIndex=filteredData[filteredData.length-1]
       for(let i=0;i<sales_ticket_per_owner.length;i++)
        {
          if(sales_ticket_per_owner[i].user_name==valuelastIndex.user_name && sales_ticket_per_owner[i].total_ticket==valuelastIndex.total_ticket )
            {
              index=i-1
              break
            }
        }
        let myobject={
          user_name:sales_ticket_per_owner[index-filteredData.length+1].user_name,
          total_ticket:sales_ticket_per_owner[index-filteredData.length+1].total_ticket
         }
         filteredData.pop();
        filteredData.unshift(myobject);
        xAxis.data.setAll(filteredData);
        series1.data.setAll(filteredData);
        index=index-1
        remove=remove-1
        add=add-1
      }
      console.log("Remove the data",filteredData);
      
    });
  }

  sourcePieChart() {
    // Create root for pie chart
    this.root = Root.new('piediv');
    this.root._logo?.dispose();
    // Create pie chart
    this.pieChart = this.root.container.children.push(
      PieChart.new(this.root, {
        radius: percent(60),
        y: percent(10),
        innerRadius: percent(70),
      })
    );

    // Define data for pie chart
    const pieChartData = [
      {
        sourceName: 'Direct',
        value: 309,
      },
      {
        sourceName: 'Cross Sales',
        value: 97,
      },
      {
        sourceName: 'Portal Enquiry',
        value: 7,
      },
    ];

    // Create series for pie chart
    const pieSeries = this.pieChart.series.push(
      PieSeries.new(this.root, {
        name: 'Series',
        valueField: 'value',
        categoryField: 'sourceName',
        legendLabelText: '[{}]{category}',
        legendValueText: '[ {}]',
      })
    );

    pieSeries.data.setAll(pieChartData);

    // Disabling labels and ticks for pie chart
    pieSeries.labels.template.set('visible', false);
    pieSeries.ticks.template.set('visible', false);
    pieSeries.slices.template.set('toggleKey', 'none');

    const pieLegend = this.pieChart.children.push(
      am5.Legend.new(this.root, {
        centerX: percent(35),
        x: percent(40),
        layout: this.root.horizontalLayout,
        // layout: am5.GridLayout.new(this.root, {
        //   maxColumns: 3,
        //   fixedWidthGrid: false
        // })
      })
    );
    // var marker = this.pieChart.legend.markers.template.children.getIndex(0);
    // marker.cornerRadius(12, 12, 12, 12);
    pieLegend.labels.template.setAll({
      // marginLeft:0,
      
      marginRight:-50 
    })
    pieLegend.data.setAll(pieSeries.dataItems);
  }
  variantPieChart() {
    const variantData = [
      {
        name: 'Bronze',
        count: 18,
      },
      {
        name: 'Gold',
        count: 48,
      },
      {
        name: 'Silver',
        count: 94,
      },
      {
        name: 'Best Effort',
        count: 27,
      },
      {
        name: 'Platinum',
        count: 4,
      },
    ];

    // Create root for legend pie chart
    this.root2 = Root.new('variantDiv');
    this.root2._logo?.dispose();
    // Create pie chart for legend
    this.pieChart2 = this.root2.container.children.push(
      PieChart.new(this.root2, {
        radius: percent(60),
        centerX: percent(20),
        innerRadius: percent(70),
      })
    );

    // Define data for legend pie chart
    const pieLegendData = variantData.map((item) => ({
      category: item.name,
      value: item.count,
    }));

    // Create series for legend pie chart
    const pieSeries2 = this.pieChart2.series.push(
      PieSeries.new(this.root2, {
        name: 'Series',
        valueField: 'value',
        categoryField: 'category',
        legendLabelText: '[{}]{category}[/]',
        legendValueText: '[ {}]{value}[/]',
      })
    );

    pieSeries2.data.setAll(pieLegendData);

    // Disabling labels and ticks for legend pie chart
    pieSeries2.labels.template.set('visible', false);
    pieSeries2.ticks.template.set('visible', false);

    // Adding legend for legend pie chart
    const pieLegend2 = this.pieChart2.children.push(
      am5.Legend.new(this.root2, {
        centerX: percent(80),
        x: percent(120),
        y: percent(25),
        layout: this.root2.verticalLayout,
      })
    );
    pieSeries2.slices.template.set('toggleKey', 'none');
    pieLegend2.data.setAll(pieSeries2.dataItems);
  }
  funnelChartSeries() {
    // Create root for funnel chart
    this.root3 = Root.new('funnelChartDiv');
    this.root3._logo?.dispose();
    // Create funnel chart

    this.funnelChart = this.root3.container.children.push(
      SlicedChart.new(this.root3, {
        // x:percent(20),
        layout: this.root3.verticalLayout,
      })
    );

    const funnelData = [
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
    ];

    // Create series for funnel chart
    const funnelSeries = this.funnelChart.series.push(
      FunnelSeries.new(this.root3, {
        name: 'Series',
        valueField: 'count',
        categoryField: 'name',
        orientation: 'vertical',
        alignLabels: false,
        width: 200,
        x: 150,
        legendLabelText: '{percentage}',
        legendValueText: '',
      })
    );
    funnelSeries.data.setAll(funnelData);

    funnelSeries.labels.template.set('text', '{count}');
    // Add legend

    let legend3 = this.funnelChart.children.push(
      am5.Legend.new(this.root3, {
        centerX: percent(50),

        width: 100,
        height: 100,
        x: 50,
        y: 20,
        valueWidth: 90,
        marginTop: 15,
        // marginBottom: 15,
        nameField: 'category',
        // layout: this.root3.horizontalLayout,
      })
    );

    legend3.markers.template.setAll({
      width: 0,
      height: 0,
    });

    let legend = this.funnelChart.children.push(
      am5.Legend.new(this.root3, {
        centerX: am5.p50,
        width: 100,
        height: 100,
        x: 425,
        y: 20,
        marginTop: 15,
        // marginBottom: 15,
        // nameField:"category",
      })
    );
    legend.markers.template.setAll({
      width: 0,
      height: 0,
    });
    legend3.labels.template.set('paddingBottom', 40);
    legend.labels.template.set('paddingBottom', 40);
    // this.funnelChart.legend.itemContainers.template.padding(3,  3, );
    // this.funnelChart.legend.itemContainers.template.margin( 5,  5);
    legend3.data.setAll(funnelSeries.dataItems);
    legend.data.setAll(funnelSeries.dataItems);
    // Disabling labels for funnel chart
    // funnelSeries.labels.template.set('visible', false);
  }

  // funnelChartSeries(){
  //   let sales_funnel = [
  //     {
  //         "name": "Lead",
  //         "count": 413,
  //         "percentage": "27%"
  //     },
  //     {
  //         "name": "Opportunity",
  //         "count": 113,
  //         "percentage": "76%"
  //     },
  //     {
  //         "name": "Quotation",
  //         "count": 86,
  //         "percentage": "58%"
  //     },
  //     {
  //         "name": "Order",
  //         "count": 50,
  //         "percentage": "0%"
  //     },

  //   ]
  // let funnel = am5.Root.new("funnelChartDiv");

  // // Create chart

  // let chart = funnel.container.children.push(
  // SlicedChart.new(funnel, {
  //   layout: funnel.verticalLayout
  // })
  // );

  // // Create series

  // let series = chart.series.push(
  // FunnelSeries.new(funnel, {
  //   alignLabels:false,
  //   orientation: "vertical",
  //   valueField: "count",
  //   categoryField: "name",
  //   width:200,
  //   x:150,
  //   legendLabelText: '[]{percentage}[/]',
  //   legendValueText: '[ {}][/]',
  // })
  // );
  // series.labels.template.set("text", " [bold]{count}");
  // console.log(series)

  // series.data.setAll(sales_funnel);

  // let legend2 = chart.children.push(
  // am5.Legend.new(funnel, {
  //   centerX: am5.p50,
  //   width:100,
  //   height:100,
  //   x:50,
  //   y:20,
  //   marginTop: 15,
  //   marginBottom: 15,
  //   nameField:"category"
  // })
  // );
  // legend2.markers.template.setAll({
  // width:0,
  // height:0
  // })
  // let legend = chart.children.push(
  // am5.Legend.new(funnel, {

  //   centerX: am5.p50,
  //   width:100,
  //   height:100,
  //   x:450,
  //   y:20,
  //   marginTop: 15,
  //   marginBottom: 15,

  // })
  // );
  // funnel._logo?.dispose()
  // legend.markers.template.setAll({
  // width:0,
  // height:0
  // })
  // legend2.data.setAll(series.dataItems);

  // legend.data.setAll(series.dataItems);

  // }

  //   certaintyChart() {
  //     // certainity chart

  // this.root4 = am5.Root.new('chartDiv');
  //     this.root4._logo?.dispose();

  //  // Set data
  //  let certainity = [
  //   {
  //     name: 'High',
  //     value: 32,
  //   },
  //   {
  //     name: 'Moderate',
  //     value: 47,
  //   },
  //   {
  //     name: 'Low',
  //     value: 28,
  //   },
  //   {
  //     name: 'Extremly High',
  //     value: 10,
  //   },
  //   {
  //     name: 'Almost Lost',
  //     value: 2,
  //   },
  // ];

  //     let chart = this.root4.container.children.push(
  //       am5xy.XYChart.new(this.root4, {
  //         panX: false,
  //         panY: false,
  //         wheelX: 'none',
  //         wheelY: 'none',
  //         paddingLeft: 0,
  //       })
  //     );
  //     const certainityData = certainity.map((item) => ({
  //       category: item.name,
  //       value: item.value,
  //     }));
  //     // Create axes

  //     let yRenderer = am5xy.AxisRendererY.new(this.root4, {
  //       minGridDistance: 30,
  //       minorGridEnabled: true,
  //     });

  //     let yAxis = chart.yAxes.push(
  //       am5xy.CategoryAxis.new(this.root4, {
  //         maxDeviation: 0,
  //         categoryField: 'name',
  //         renderer: yRenderer,
  //         visible:false})
  //     );

  //     let xAxis = chart.xAxes.push(
  //       am5xy.ValueAxis.new(this.root4, {
  //         maxDeviation: 0,
  //         min: 0,
  //         renderer: am5xy.AxisRendererX.new(this.root4, {
  //           visible: true,
  //           strokeOpacity: 0.1,
  //           minGridDistance: 80,
  //         }),
  //       visible:false}
  //     )
  //     );
  //     yAxis.get('renderer').grid.template.setAll({
  //       visible: false,
  //     });
  //     xAxis.get('renderer').grid.template.setAll({
  //       visible: false,
  //     });

  //     // Create series
  //     // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  //     let series = chart.series.push(
  //       am5xy.ColumnSeries.new(this.root4, {
  //         name: 'Series 1',
  //         xAxis: xAxis,
  //         yAxis: yAxis,
  //         valueXField: 'value',
  //         sequencedInterpolation: true,
  //         categoryYField: 'name',
  //       })
  //     );
  //     series.bullets.push( () => {
  //       return am5.Bullet.new(this.root4, {
  //         locationX: 1,
  //         locationY: 0.5,
  //         sprite: am5.Label.new(this.root4, {
  //           centerY: am5.p50,
  //           text: '{valueX}',
  //           populateText: true,
  //         }),
  //       });
  //     });

  //     yAxis.data.setAll(certainity);
  //     series.data.setAll(certainity);
  //   }

  certaintyChart() {
    let ygraph = am5.Root.new('chartDiv');

    var ychart = ygraph.container.children.push(
      am5xy.XYChart.new(ygraph, {
        panX: false,
        panY: false,
        x: 40,
        y: 10,
        height: 400,
        paddingLeft: 0,
        layout: ygraph.verticalLayout,
      })
    );
    ygraph._logo?.dispose();

    let certainity = [
      {
        name: 'Extremly High',
        value: 10,
      },
      {
        name: 'High',
        value: 32,
      },
      {
        name: 'Moderate',
        value: 47,
      },
      {
        name: 'Low',
        value: 28,
      },

      {
        name: 'Almost Lost',
        value: 2,
      },
    ];

    var yRenderer = am5xy.AxisRendererY.new(ygraph, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minorGridEnabled: true,
    });

    yRenderer.grid.template.set('location', 1);

    var yAxis = ychart.yAxes.push(
      am5xy.CategoryAxis.new(ygraph, {
        categoryField: 'name',
        renderer: yRenderer,
        visible: false,
      })
    );
    yAxis.get('renderer').grid.template.setAll({ visible: false });

    yAxis.data.setAll(certainity);

    var xAxis = ychart.xAxes.push(
      am5xy.ValueAxis.new(ygraph, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(ygraph, {
          strokeOpacity: 0.1,
          visible: false,
        }),
        visible: false,
      })
    );
    xAxis.get('renderer').grid.template.setAll({ visible: false });
    yAxis.setAll({
      background: am5.Rectangle.new(ygraph, {
        fill: ygraph.interfaceColors.get('alternativeBackground'),
      }),
    });

    var yseries = ychart.series.push(
      am5xy.ColumnSeries.new(ygraph, {
        name: 'Certainity',
        xAxis: xAxis,
        yAxis: yAxis,
        y: 50,
        valueXField: 'value',
        categoryYField: 'name',
      })
    );

    yseries.columns.template.adapters.add('fill', function (fill, target) {
      return ychart.get('colors')?.getIndex(yseries.columns.indexOf(target));
    });

    yseries.columns.template.setAll({
      height: 20,
    });
    yseries.data.setAll(certainity);

    yseries.bullets.push(function () {
      return am5.Bullet.new(ygraph, {
        locationX: 1,
        locationY: 0.5,
        sprite: am5.Label.new(ygraph, {
          centerY: am5.p50,
          text: '{value}',
          populateText: true,
        }),
      });
    });

    let ylegend = ychart.children.push(
      am5.Legend.new(ygraph, {
        x: 10,
        y: 350,
        width: 400,
        marginTop: 15,
        marginBottom: 15,
        nameField: 'categoryY',
      })
    );
ylegend.labels.template.setAll({
  marginRight:-40
})
    ylegend.data.setAll(yseries.dataItems);
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }
}
