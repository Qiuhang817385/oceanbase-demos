'use client';
import { Line } from '@ant-design/plots';import $i18n from "../../../../i18n";

export default function Main() {
  // 合并两个数据集，添加 type 字段来区分不同的折线

  const STORAGE_COMPUTE_UNIFIED = 'storageComputeUnified';
  const STORAGE_COMPUTE_SEPARATE = 'storageComputeSeparate';

  const combinedData = [
  // 第一条折线数据
  { year: '1988', value: 1, type: STORAGE_COMPUTE_UNIFIED },
  { year: '1989', value: 3, type: STORAGE_COMPUTE_UNIFIED },
  { year: '1990', value: 4, type: STORAGE_COMPUTE_UNIFIED },
  { year: '1991', value: 7, type: STORAGE_COMPUTE_UNIFIED },
  { year: '1992', value: 11, type: STORAGE_COMPUTE_UNIFIED },
  { year: '1993', value: 18, type: STORAGE_COMPUTE_UNIFIED },
  { year: '1994', value: 29, type: STORAGE_COMPUTE_UNIFIED },
  { year: '1995', value: 43, type: STORAGE_COMPUTE_UNIFIED },
  { year: '1996', value: 59, type: STORAGE_COMPUTE_UNIFIED },
  { year: '1997', value: 78, type: STORAGE_COMPUTE_UNIFIED },
  { year: '1998', value: 100, type: STORAGE_COMPUTE_UNIFIED },
  // 第二条折线数据
  { year: '1988', value: 1, type: STORAGE_COMPUTE_SEPARATE },
  { year: '1989', value: 3, type: STORAGE_COMPUTE_SEPARATE },
  { year: '1990', value: 5, type: STORAGE_COMPUTE_SEPARATE },
  { year: '1991', value: 7, type: STORAGE_COMPUTE_SEPARATE },
  { year: '1992', value: 9, type: STORAGE_COMPUTE_SEPARATE },
  { year: '1993', value: 11, type: STORAGE_COMPUTE_SEPARATE },
  { year: '1994', value: 13, type: STORAGE_COMPUTE_SEPARATE },
  { year: '1995', value: 15, type: STORAGE_COMPUTE_SEPARATE },
  { year: '1996', value: 17, type: STORAGE_COMPUTE_SEPARATE },
  { year: '1997', value: 19, type: STORAGE_COMPUTE_SEPARATE },
  { year: '1998', value: 21, type: STORAGE_COMPUTE_SEPARATE }];


  const config = {
    data: combinedData,
    width: 510,
    height: 142,
    xField: 'year',
    yField: 'value',
    seriesField: 'type', // 用于区分不同的折线
    shapeField: 'smooth',
    scale: {
      y: {
        domainMax: 120 // 固定 Y 轴最大值
      },
      x: {}
    },
    interaction: {
      tooltip: false
    },
    style: {
      lineWidth: 2
    },
    // 正确的网格配置
    axis: {
      y: {
        grid: true,
        gridStroke: '#aaa',
        gridStrokeOpacity: 0.5,
        gridLineWidth: 1,
        label: false, // 隐藏 X 轴标签
        arrow: true,
        line: true,
        title: $i18n.get({id:"oceanbase-demo.component.Charts.ResultChart.ExpansionContractionTime",dm:"扩/缩容耗时"}),
        gridFilter: (datum: any, index: number, data: any) => {
          return index % 2 === 0;
        }
      },
      x: {
        grid: true,
        gridStroke: '#aaa',
        gridStrokeOpacity: 0.5,
        gridLineWidth: 1,
        label: false, // 隐藏 X 轴标签
        line: true,
        arrow: true,
        title: $i18n.get({id:"oceanbase-demo.component.Charts.ResultChart.DataVolume",dm:"数据量"}),
        gridFilter: (datum: any, index: number, data: any) => {
          return index % 2 === 0;
        }
      }
    },
    // 多折线图配置
    line: {
      style: {
        lineWidth: 3
      }
    },
    colorField: 'type',
    // 为不同的折线设置不同的颜色
    color: ['#1890ff', '#ff4d4f'],
    legend: {
      color: {
        label: true,
        labelFormatter: (text: string) => {
          if (text === STORAGE_COMPUTE_UNIFIED) {
            return $i18n.get({id:"oceanbase-demo.component.Charts.ResultChart.StorageAndCalculationIntegration",dm:"存算一体"});
          } else if (text === STORAGE_COMPUTE_SEPARATE) {
            return $i18n.get({id:"oceanbase-demo.component.Charts.ResultChart.StorageAndCalculationSeparation",dm:"存算分离"});
          }
          return text;
        }
      }
    }
  };

  return (
    <div>
      <Line {...config} />
    </div>);

}