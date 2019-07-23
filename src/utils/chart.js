import { getServerData, getServerDataText } from './utils'
import echarts from 'echarts'

let selectedItem;
let lineGraphEchartTimeframe = '';

//////////*********OneItemIndicatorEchart绘图开始*********///////////
export async function setOneItemIndicatorEchart(item) {
    selectedItem = item;

    const itemIndicatorUrl = '/Service/DataService.ashx?target=itemIndicator';
    const itemIndayRawDataUrl = '/Service/DataService.ashx?target=itemIndayRawData&item=' + item;
    const itemLiveInfoUrl = '/Service/DataService.ashx?target=itemLiveInfo&item=' + item;

    const itemIndicator = await getServerData(itemIndicatorUrl);
    const o = await JSON.parse(JSON.stringify(itemIndicator)).filter(i => i['name'] === item);
    const oneItemIndicator = o[0];
    const itemLiveInfo = await getServerData(itemLiveInfoUrl);
    let itemIndayRawData = await getServerData(itemIndayRawDataUrl);
    //console.log(JSON.stringify(itemIndayRawData));

    let pointSize = 4;
    if(item.indexOf('JPY') != -1) pointSize = 2;
    
    const expectDayHigh = Number(Math.abs(oneItemIndicator['expectDayHigh']).toFixed(pointSize));
    const expectDayLow = Number(Math.abs(oneItemIndicator['expectDayLow']).toFixed(pointSize)); 

    const buyRate = itemLiveInfo['liveBidRate'];
    const dayHigh = Number(Number(itemLiveInfo['dayHigh']).toFixed(pointSize));
    const dayLow = Number(Number(itemLiveInfo['dayLow']).toFixed(pointSize));
    

    let indicatorMaxData = 0;
    let indicatorMinData = 0;
    let i = 0;
    for (let key in oneItemIndicator) {
        if (i === 0) {
            indicatorMaxData = oneItemIndicator[key];
            indicatorMinData = oneItemIndicator[key];
        }
        else {
            if (Number(oneItemIndicator[key]) > indicatorMaxData) indicatorMaxData = oneItemIndicator[key];
            if (Number(oneItemIndicator[key]) < indicatorMinData) {
                if (Number(oneItemIndicator[key]) !== 0) {
                    indicatorMinData = oneItemIndicator[key];
                }
            }
        }
        i++;
    }

    let dayMaxData = 0;
    let dayMinData = 0;
    if (dayHigh > expectDayHigh) dayMaxData = dayHigh;
    else dayMaxData = expectDayHigh;
    if (dayLow < expectDayLow) dayMinData = dayLow;
    else dayMinData = expectDayLow;

    let fiboUp = ['-', '-', '-', '-'];
    let fiboDown = ['-', '-', '-', '-'];
    let fiboOut = ['-', '-', '-', '-', '-'];
    if (dayHigh < expectDayHigh && dayLow > expectDayLow) {
        fiboUp[0] = (Number((expectDayHigh - dayLow) * 0.382) + Number(dayLow)).toString();
        fiboUp[1] = (Number((expectDayHigh - dayLow) * 0.5) + Number(dayLow)).toString();
        fiboUp[2] = (Number((expectDayHigh - dayLow) * 0.618) + Number(dayLow)).toString();
        fiboUp[3] = (Number((expectDayHigh - dayLow) * 1.382) + Number(dayLow)).toString();

        fiboDown[0] = (dayHigh - (dayHigh - expectDayLow) * 0.382).toString();
        fiboDown[1] = (dayHigh - (dayHigh - expectDayLow) * 0.5).toString();
        fiboDown[2] = (dayHigh - (dayHigh - expectDayLow) * 0.618).toString();
        fiboDown[3] = (dayHigh - (dayHigh - expectDayLow) * 1.382).toString();
    }
    if (dayHigh > expectDayHigh && dayLow < expectDayLow) {
        fiboOut[0] = (dayLow - (dayHigh - dayLow) * 0.382).toString();
        fiboOut[1] = ((dayHigh - dayLow) * 0.382 + Number(dayLow)).toString();
        fiboOut[2] = ((dayHigh - dayLow) * 0.5 + Number(dayLow)).toString();
        fiboOut[3] = ((dayHigh - dayLow) * 0.618 + Number(dayLow)).toString();
        fiboOut[4] = ((dayHigh - dayLow) * 1.382 + Number(dayLow)).toString();
    }
    if (dayHigh > expectDayHigh && dayLow > expectDayLow) {
        fiboUp[0] = ((dayHigh - dayLow) * 0.382 + Number(dayLow)).toString();
        fiboUp[1] = ((dayHigh - dayLow) * 0.5 + Number(dayLow)).toString();
        fiboUp[2] = ((dayHigh - dayLow) * 0.618 + Number(dayLow)).toString();
        fiboUp[3] = ((dayHigh - dayLow) * 1.382 + Number(dayLow)).toString();
    }
    if (dayHigh < expectDayHigh && dayLow < expectDayLow) {
        fiboDown[0] = (dayHigh - (dayHigh - dayLow) * 0.382).toString();
        fiboDown[1] = (dayHigh - (dayHigh - dayLow) * 0.5).toString();
        fiboDown[2] = (dayHigh - (dayHigh - dayLow) * 0.618).toString();
        fiboDown[3] = (dayHigh - (dayHigh - dayLow) * 1.382).toString();
    }

    let maxData = 0;
    let minData = 0;
    if (indicatorMaxData < dayMaxData) maxData = Number((dayMaxData * 1.001).toFixed(pointSize));
    else maxData = Number((dayMaxData * 1.007).toFixed(pointSize));
    if (indicatorMinData > dayMinData) minData = Number((dayMinData * 0.999).toFixed(pointSize));
    else minData = Number((dayMinData * 0.993).toFixed(pointSize));

    //var tradable = itemInfoStore.getAt(itemInfoStore.find('name', item)).get('tradable');
    let chartSubTitle = 'The item can trade.';
    //if (tradable === 'N') chartSubTitle = 'The item can NOT trade.'

    let kTimeframe = 'H2';
    let kAmount = 81;
    
    let indayCount = [];
    for (let i = 0; i < itemIndayRawData.length; i++) {
        indayCount.push(i);
        if (itemIndayRawData[i] === '0') itemIndayRawData[i] = '-';
    }

    const itemRawLineDataUrl = '/Service/DataService.ashx?target=itemRawLineData&item=' + item + '&timeframe=' + kTimeframe + '&amount=' + kAmount + '&needIndicator=' + false;
    const itemRawLineData = await getServerDataText(itemRawLineDataUrl);
    const itemRawLineDataArray = itemRawLineData.split('~~~');

    let rawData = eval(itemRawLineDataArray[0]);
    let kCategoryData = [];
    let kValues = [];
    for (let i = 0; i < rawData.length + 8; i++) {
        if (i < rawData.length) {
            if (!(kTimeframe === 'day')) {
                const date = new Date(rawData[i].splice(0, 1)[0]);
                const month = date.getMonth() + 1;
                const day = date.getDate();             
                const hour = date.getHours();
                const minute = date.getMinutes().toString().padStart(2,'0');
                kCategoryData.push(month + '-' + day + " " + hour + ":" + minute);
                //kCategoryData.push(new Date(rawData[i].splice(0, 1)[0]).pattern("M-d HH:mm"));
            }
            else {
                const date = new Date(rawData[i].splice(0, 1)[0]);
                const month = date.getMonth() + 1;
                const day = date.getDate();             
                kCategoryData.push(month + '-' + day);
            }
            kValues.push(rawData[i]);
        }
        else {
            kCategoryData.push('-');
            kValues.push(['-', '-', '-', '-']);
        }
    }


    const kLineMaxData = Number(itemRawLineDataArray[1]);
    const kLineMinData = Number(itemRawLineDataArray[2]);
    if (maxData < kLineMaxData) maxData = Number((kLineMaxData * 1.001).toFixed(pointSize));
    if (minData > kLineMinData) minData = Number((kLineMinData * 0.999).toFixed(pointSize));

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('indicatorChartDiv'));
    var chartTitle = item + ' --- Indicator';

    myChart.setOption({
        title: {
            text: chartTitle,
            subtext: chartSubTitle
        },
        grid: [
            { left: 40 },
            { left: 40 },
        ],
        tooltip: {
            //trigger: 'axis',
        },
        legend: {
            data: ['SMA14', 'SMA50', 'SMA100', 'SMA200', 'BBandsUpper', 'BBandsMiddle', 'BBandsLower', 'Support', 'Resistance']
        },
        xAxis: [
            {
                gridIndex: 0,
                type: 'category',
                data: kCategoryData,
                //interval: 20,
                //scale: true,
                //boundaryGap: false,
                //axisLine: { onZero: false },
                splitLine: { show: false },
                //min: 'dataMin',
                //max: 'dataMax'
            },
            {
                gridIndex: 0,
                //name: 'Timeframe',
                data: ["H1", "H2", "H4", "H6", "H8", "DAY", "WEEK", "MONTH", "MANULE", "empty"],
                splitArea: {
                    show: true
                },
                splitLine: {
                    show: false
                },
            },
            {
                gridIndex: 1,
                type: 'category',
                data: indayCount,
                splitLine: { show: false },
                splitArea: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
            },
        ],
        yAxis: [
            {
                gridIndex: 0,
                //name: 'Price',
                splitNumber: 25,
                max: maxData,
                min: minData,
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            {
                gridIndex: 0,
                splitNumber: 25,
                max: maxData,
                min: minData,
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            {
                gridIndex: 1,
                type: 'value',
                max: maxData,
                min: minData,
                splitLine: { show: false },
                splitArea: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
            },
        ],
        series: [
            {
                name: kTimeframe,
                type: 'candlestick',
                data: kValues,
                xAxisIndex: 0,
                itemStyle: {
                    normal: {
                        color0: 'YellowGreen',
                        borderColor0: 'YellowGreen',
                        color: 'MintCream',
                        borderColor: 'YellowGreen',
                    }
                },
            },
            {
                type: 'line',
                data: itemIndayRawData,
                xAxisIndex: 2,
                yAxisIndex: 2,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: 'Gold',
                        width: 3,
                        opacity: 0.6,
                        shadowColor: 'Gainsboro',
                        shadowOffsetX: 1,
                        shadowOffsetY: 1,
                    }
                }
            },
            {
                type: 'line',
                name: 'fiboUp 0.382',
                data: ['-', '-', '-', fiboUp[0], fiboUp[0], fiboUp[0], fiboUp[0], '-', '-'],
                xAxisIndex: 1,
                yAxisIndex: 1,
                showSymbol: false,
                label: { normal: { show: true, } },
                lineStyle: { normal: { type: 'dashed', color: 'Coral' } }
            },
            /*{
                type: 'line',
                name: 'fiboUp 0.5',
                data: ['-', '-', '-', fiboUp[1], fiboUp[1], fiboUp[1], fiboUp[1], '-', '-'],
                xAxisIndex: 1,
                yAxisIndex: 1,
                showSymbol: false,
                label: { normal: { show: true, } },
                lineStyle: { normal: { type: 'dashed', color: 'Coral' } }
            },*/
            {
                type: 'line',
                name: 'fiboUp 0.618',
                data: ['-', '-', '-', fiboUp[2], fiboUp[2], fiboUp[2], fiboUp[2], '-', '-'],
                xAxisIndex: 1,
                yAxisIndex: 1,
                showSymbol: false,
                label: { normal: { show: true, } },
                lineStyle: { normal: { type: 'dashed', color: 'Coral' } }
            },
            {
                type: 'line',
                name: 'fiboUp 1.382',
                data: ['-', '-', '-', fiboUp[3], fiboUp[3], fiboUp[3], fiboUp[3], '-', '-'],
                xAxisIndex: 1,
                yAxisIndex: 1,
                showSymbol: false,
                label: { normal: { show: true, } },
                lineStyle: { normal: { type: 'dashed', color: 'Coral' } }
            },
            {
                type: 'line',
                name: 'fiboDown 0.382',
                data: ['-', '-', '-', fiboDown[0], fiboDown[0], fiboDown[0], fiboDown[0], '-', '-'],
                xAxisIndex: 1,
                yAxisIndex: 1,
                showSymbol: false,
                label: { normal: { show: true, } },
                lineStyle: { normal: { type: 'dashed', color: 'SlateGray' } }
            },
            /*{
                type: 'line',
                name: 'fiboDown 0.5',
                data: ['-', '-', '-', fiboDown[1], fiboDown[1], fiboDown[1], fiboDown[1], '-', '-'],
                xAxisIndex: 1,
                yAxisIndex: 1,
                showSymbol: false,
                label: { normal: { show: true, } },
                lineStyle: { normal: { type: 'dashed', color: 'SlateGray' } }
            },*/
            {
                type: 'line',
                name: 'fiboDown 0.618',
                data: ['-', '-', '-', fiboDown[2], fiboDown[2], fiboDown[2], fiboDown[2], '-', '-'],
                xAxisIndex: 1,
                yAxisIndex: 1,
                showSymbol: false,
                label: { normal: { show: true, } },
                lineStyle: { normal: { type: 'dashed', color: 'SlateGray' } }
            },
            {
                type: 'line',
                name: 'fiboDown 1.382',
                data: ['-', '-', '-', fiboDown[3], fiboDown[3], fiboDown[3], fiboDown[3], '-', '-'],
                xAxisIndex: 1,
                yAxisIndex: 1,
                showSymbol: false,
                label: { normal: { show: true, } },
                lineStyle: { normal: { type: 'dashed', color: 'SlateGray' } }
            },
            {
                type: 'line',
                name: 'fiboOut -0.382',
                data: ['-', '-', '-', fiboOut[0], fiboOut[0], fiboOut[0], fiboOut[0], '-', '-'],
                xAxisIndex: 1,
                yAxisIndex: 1,
                showSymbol: false,
                label: { normal: { show: true, } },
                lineStyle: { normal: { type: 'dashed', color: 'Olive' } }
            },
            {
                type: 'line',
                name: 'fiboOut 0.382',
                data: ['-', '-', '-', fiboOut[1], fiboOut[1], fiboOut[1], fiboOut[1], '-', '-'],
                xAxisIndex: 1,
                yAxisIndex: 1,
                showSymbol: false,
                label: { normal: { show: true, } },
                lineStyle: { normal: { type: 'dashed', color: 'Olive' } }
            },
            /*{
                type: 'line',
                name: 'fiboOut 0.5',
                data: ['-', '-', '-', fiboOut[2], fiboOut[2], fiboOut[2], fiboOut[2], '-', '-'],
                xAxisIndex: 1,
                yAxisIndex: 1,
                showSymbol: false,
                label: { normal: { show: true, } },
                lineStyle: { normal: { type: 'dashed', color: 'Olive' } }
            },*/
            {
                type: 'line',
                name: 'fiboOut 0.618',
                data: ['-', '-', '-', fiboOut[3], fiboOut[3], fiboOut[3], fiboOut[3], '-', '-'],
                xAxisIndex: 1,
                yAxisIndex: 1,
                showSymbol: false,
                label: { normal: { show: true, } },
                lineStyle: { normal: { type: 'dashed', color: 'Olive' } }
            },
            {
                type: 'line',
                name: 'fiboOut 1.382',
                data: ['-', '-', '-', fiboOut[4], fiboOut[4], fiboOut[4], fiboOut[4], '-', '-'],
                xAxisIndex: 1,
                yAxisIndex: 1,
                showSymbol: false,
                label: { normal: { show: true, } },
                lineStyle: { normal: { type: 'dashed', color: 'Olive' } }
            },
            {
                name: 'SMA14',
                type: 'scatter',
                symbolOffset: [-30, 0],
                xAxisIndex: 1,
                data: [Number(oneItemIndicator['H1_SMA14']).toFixed(pointSize),
                        Number(oneItemIndicator['H2_SMA14']).toFixed(pointSize),
                        Number(oneItemIndicator['H4_SMA14']).toFixed(pointSize),
                        Number(oneItemIndicator['H6_SMA14']).toFixed(pointSize),
                        Number(oneItemIndicator['H8_SMA14']).toFixed(pointSize), 
                        Number(oneItemIndicator['D1_SMA14']).toFixed(pointSize), 
                        Number(oneItemIndicator['W1_SMA14']).toFixed(pointSize), 
                        Number(oneItemIndicator['MONTH_SMA14']).toFixed(pointSize), 0, 0],
                itemStyle: {
                    normal: {
                        color: 'rgb(197, 119, 255)'
                    }
                },
            },
            {
                name: 'SMA50',
                type: 'scatter',
                symbolOffset: [-20, 0],
                xAxisIndex: 1,
                data: [Number(oneItemIndicator["H1_SMA50"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H2_SMA50"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H4_SMA50"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H6_SMA50"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H8_SMA50"]).toFixed(pointSize), 
                        Number(oneItemIndicator["D1_SMA50"]).toFixed(pointSize), 
                        Number(oneItemIndicator["W1_SMA50"]).toFixed(pointSize), 
                        Number(oneItemIndicator["MONTH_SMA50"]).toFixed(pointSize), 0],
                itemStyle: {
                    normal: {
                        color: 'rgb(103, 182, 250)'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: 'rgba(5,92,171,0.9)',
                            fontWeight: 'bold',
                        }
                    }
                }
            },
            {
                name: 'SMA100',
                type: 'scatter',
                symbolOffset: [-10, 0],
                xAxisIndex: 1,
                data: [Number(oneItemIndicator["H1_SMA100"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H2_SMA100"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H4_SMA100"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H6_SMA100"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H8_SMA100"]).toFixed(pointSize), 
                        Number(oneItemIndicator["D1_SMA100"]).toFixed(pointSize), 
                        Number(oneItemIndicator["W1_SMA100"]).toFixed(pointSize), 
                        Number(oneItemIndicator["MONTH_SMA100"]).toFixed(pointSize), 0],
                itemStyle: {
                    normal: {
                        color: 'rgb(147, 160, 35)'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: 'rgba(65,70,15,0.9)',
                            fontWeight: 'bold',
                        }
                    }
                }
            },
            {
                name: 'SMA200',
                type: 'scatter',
                symbolOffset: [0, 0],
                xAxisIndex: 1,
                data: [Number(oneItemIndicator["H1_SMA200"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H2_SMA200"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H4_SMA200"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H6_SMA200"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H8_SMA200"]).toFixed(pointSize), 
                        Number(oneItemIndicator["D1_SMA200"]).toFixed(pointSize), 
                        Number(oneItemIndicator["W1_SMA200"]).toFixed(pointSize), 
                        Number(oneItemIndicator["MONTH_SMA200"]).toFixed(pointSize), 0],
                itemStyle: {
                    normal: {
                        color: 'rgb(241, 139, 1)'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: 'rgba(70,40,0,0.9)',
                            fontWeight: 'bold',
                        }
                    }
                }
            },
            {
                name: 'BBandsUpper',
                type: 'scatter',
                symbolOffset: [30, 0],
                xAxisIndex: 1,
                data: [Number(oneItemIndicator["H1_BollingerBandsUp"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H2_BollingerBandsUp"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H4_BollingerBandsUp"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H6_BollingerBandsUp"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H8_BollingerBandsUp"]).toFixed(pointSize), 
                        Number(oneItemIndicator["D1_BollingerBandsUp"]).toFixed(pointSize), 
                        Number(oneItemIndicator["W1_BollingerBandsUp"]).toFixed(pointSize), 
                        Number(oneItemIndicator["MONTH_BollingerBandsUp"]).toFixed(pointSize), 0],
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: 'rgb(97, 213, 43)'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: 'rgba(33,66,11,0.9)',
                            fontWeight: 'bold',
                        }
                    }
                }
            },
            {
                name: 'BBandsMiddle',
                type: 'scatter',
                symbolOffset: [30, 0],
                xAxisIndex: 1,
                data: [Number(oneItemIndicator["H1_BollingerBandsMiddle"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H2_BollingerBandsMiddle"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H4_BollingerBandsMiddle"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H6_BollingerBandsMiddle"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H8_BollingerBandsMiddle"]).toFixed(pointSize), 
                        Number(oneItemIndicator["D1_BollingerBandsMiddle"]).toFixed(pointSize),
                        Number(oneItemIndicator["W1_BollingerBandsMiddle"]).toFixed(pointSize), 
                        Number(oneItemIndicator["MONTH_BollingerBandsMiddle"]).toFixed(pointSize), 0],
                symbol: 'rect',
                itemStyle: {
                    normal: {
                        color: 'rgb(97, 213, 43)'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: 'rgba(33,66,11,0.9)',
                            fontWeight: 'bold',
                        }
                    }
                }
            },
            {
                name: 'BBandsLower',
                type: 'scatter',
                symbolOffset: [30, 0],
                xAxisIndex: 1,
                data: [Number(oneItemIndicator["H1_BollingerBandsDown"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H2_BollingerBandsDown"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H4_BollingerBandsDown"]).toFixed(pointSize),
                        Number(oneItemIndicator["H6_BollingerBandsDown"]).toFixed(pointSize), 
                        Number(oneItemIndicator["H8_BollingerBandsDown"]).toFixed(pointSize), 
                        Number(oneItemIndicator["D1_BollingerBandsDown"]).toFixed(pointSize), 
                        Number(oneItemIndicator["W1_BollingerBandsDown"]).toFixed(pointSize), 
                        Number(oneItemIndicator["MONTH_BollingerBandsDown"]).toFixed(pointSize), 0],
                symbol: 'triangle',
                itemStyle: {
                    normal: {
                        color: 'rgb(97, 213, 43)'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'bottom',
                        textStyle: {
                            color: 'rgba(33,66,11,0.9)',
                            fontWeight: 'bold',
                        }
                    }
                }
            },

            /*
            {
                name: 'Ask Order',
                type: 'scatter',
                symbolOffset: [-30, 0],
                symbol: 'arrow',
                symbolRotate: 180,
                xAxisIndex: 1,
                data: askOrderData,
                itemStyle: {
                    normal: {
                        color: 'Crimson'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: 'Crimson',
                            fontWeight: 'bold',
                        }
                    }
                }
            },
            {
                name: 'Bid Order',
                type: 'scatter',
                symbolOffset: [30, 0],
                symbol: 'arrow',
                xAxisIndex: 1,
                data: bidOrderData,
                itemStyle: {
                    normal: {
                        color: 'DodgerBlue'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: 'DodgerBlue',
                            fontWeight: 'bold',
                        }
                    }
                }
            },
            */

            {
                name: 'Bid Price',
                type: 'scatter',
                xAxisIndex: 1,
                markLine: {
                    data: [
                        [
                            { name: 'Bid Price', value: buyRate, coord: ["WEEK", buyRate], symbolSize: [0, 0] },
                            { name: 'Bid Price', coord: ["empty", buyRate], symbol: 'circle' }
                        ]
                    ],
                    lineStyle: {
                        normal: {
                            color: 'rgba(254,75,75,1)',
                            width: 2,
                            //shadowColor: 'rgba(0, 0, 0, 0.5)',
                            //shadowOffsetX: 2,
                            //shadowOffsetY: 2
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(254,75,75,1)',
                        }
                    }
                }
            },
            {
                name: 'Day High',
                type: 'scatter',
                xAxisIndex: 1,
                markLine: {
                    data: [
                        [
                            { name: 'Day High', value: dayHigh, coord: ["WEEK", dayHigh], symbolSize: [0, 0] },
                            { name: 'Day High', coord: ["empty", dayHigh] }
                        ]
                    ],
                    lineStyle: {
                        normal: {
                            color: 'rgba(3,11,141,1)',
                            width: 2,
                            type: 'dotted',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(3,11,141,1)',
                        }
                    }
                }
            },
            {
                name: 'Day Low',
                type: 'scatter',
                xAxisIndex: 1,
                markLine: {
                    data: [
                        [
                            { name: 'Day Low', value: dayLow, coord: ["WEEK", dayLow], symbolSize: [0, 0] },
                            { name: 'Day Low', coord: ["empty", dayLow] }
                        ]
                    ],
                    lineStyle: {
                        normal: {
                            color: 'rgba(3,11,141,1)',
                            width: 2,
                            type: 'dotted',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(3,11,141,1)',
                        }
                    }
                }
            },
            {
                name: 'Expect Day High',
                type: 'scatter',
                xAxisIndex: 1,
                markLine: {
                    data: [
                        [
                            { name: 'Expect Day High', value: expectDayHigh, coord: ["WEEK", expectDayHigh], symbolSize: [0, 0] },
                            { name: 'Expect Day High', coord: ["empty", expectDayHigh], symbol: 'pin', symbolSize: 15 }
                        ]
                    ],
                    lineStyle: {
                        normal: {
                            color: 'rgba(63,133,105,1)',
                            width: 1,
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(63,133,105,1)',
                        }
                    }
                }
            },
            {
                name: 'Expect Day Low',
                type: 'scatter',
                xAxisIndex: 1,
                markLine: {
                    data: [
                        [
                            { name: 'Expect Day Low', value: expectDayLow, coord: ['WEEK', expectDayLow], symbolSize: [0, 0], },
                            { name: 'Expect Day Low', coord: ['empty', expectDayLow], symbol: 'pin', symbolSize: 15, }
                        ]
                    ],
                    lineStyle: {
                        normal: {
                            color: 'rgba(63,133,105,1)',
                            width: 1,
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(63,133,105,1)',
                        }
                    },
                }
            },

        ]
    });
    
    

    if (lineGraphEchartTimeframe !== '') setLineGraphEchart(lineGraphEchartTimeframe);    
}
//////////*********OneItemIndicatorEchart绘图结束*********///////////


//////////*********LineGraphEchart绘图开始*********/////////////////
export async function setLineGraphEchart(timeframe) {
    var lineChart = echarts.init(document.getElementById('lineChartDiv'));
    var item = selectedItem;
    lineGraphEchartTimeframe = timeframe;

    const itemRawLineDataUrl = '/Service/DataService.ashx?target=itemRawLineData&item=' + item + '&timeframe=' + timeframe + '&amount=' + 1000 + '&needIndicator=' + true;
    const itemRawLineData = await getServerDataText(itemRawLineDataUrl);
    const itemRawLineDataArray = itemRawLineData.split('~~~');
    
    let rawData = eval(itemRawLineDataArray[0]);
    let kCategoryData = [];
    let kValues = [];
    let sma50 = [];
    let sma100 = [];
    let sma200 = [];
    let bbandsUp = [];
    let bbandsMiddle = [];
    let bbandsLow = [];
    let rsi = [];
    let adx = [];
    let stochSlowK = [];
    let stochSlowD = [];
    let cci = [];
    for (let i = 0; i < rawData.length + 7; i++) {
        if (i < rawData.length) {
            if (!(timeframe === 'D1') & !(timeframe === 'W1') & !(timeframe === 'MONTH')) {
                const date = new Date(rawData[i].splice(0, 1)[0]);
                const month = date.getMonth() + 1;
                const day = date.getDate();             
                const hour = date.getHours();
                const minute = date.getMinutes().toString().padStart(2,'0');
                kCategoryData.push(month + '-' + day + " " + hour + ":" + minute);
            }
            else {
                const date = new Date(rawData[i].splice(0, 1)[0]);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();             
                kCategoryData.push(year + '-' + month + '-' + day);
            }
            kValues.push([rawData[i][0], rawData[i][1], rawData[i][2], rawData[i][3]]);

            sma50.push(rawData[i][4]);
            sma100.push(rawData[i][5]);
            if (Number(rawData[i][6]) === 0) sma200.push('-');
            else sma200.push(rawData[i][6]);
            bbandsUp.push(rawData[i][7]);
            bbandsMiddle.push(rawData[i][8]);
            bbandsLow.push(rawData[i][9]);
            rsi.push(rawData[i][10]);
            adx.push(rawData[i][11]);
            stochSlowK.push(rawData[i][12]);
            stochSlowD.push(rawData[i][13]);
            cci.push(rawData[i][14]);
        }
        else {
            kCategoryData.push('-');
            kValues.push(['-', '-', '-', '-']);
            sma50.push('-');
            sma100.push('-');
            sma200.push('-');
            bbandsUp.push('-');
            bbandsMiddle.push('-');
            bbandsLow.push('-');
            rsi.push('-');
            adx.push('-');
            stochSlowK.push('-');
            stochSlowD.push('-');
            cci.push('-');
        }
        
    }

    var dataZoomStart = 90;
    if (timeframe === 'W1') dataZoomStart = 75;
    if (timeframe === 'MONTH') dataZoomStart = 0;

    let pointSize = 4;
    if(item.indexOf('JPY') > 0) pointSize = 2;
    var maxData = (itemRawLineDataArray[1] * 1.001).toFixed(pointSize);
    var minData = (itemRawLineDataArray[2] * 0.999).toFixed(pointSize);

    // 基于准备好的dom，初始化echarts实例
    lineChart.setOption({
        title: {
            //text: '............'
        },
        grid: [
            {
                left: 10,
                top: 20,
                height: 495,
            },
            {
                left: 10,
                top: 530,
                height: 105,
            },
            {
                left: 10,
                top: 650,
                height: 90,
            },
            {
                left: 10,
                top: 755,
                height: 90,
            },
            {
                left: 10,
                top: 860,
                height: 90
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            }
        },
        legend: {
            show: false
        },
        xAxis: [
            {
                type: 'category',
                data: kCategoryData,
                gridIndex: 0,
                //interval: 20,
                //scale: true,
                //boundaryGap: false,
                //axisLine: { onZero: false },
                //splitLine: { show: false },                                            
                //min: 'dataMin',
                //max: 'dataMax'
            },
            {
                type: 'category',
                gridIndex: 1,
                data: kCategoryData,
                scale: true,
                //boundaryGap: false,
                axisLine: { onZero: false },
                axisTick: { show: false },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisLabel: { show: false },
                splitNumber: 20,
            },
            {
                type: 'category',
                gridIndex: 2,
                data: kCategoryData,
                scale: true,
                //boundaryGap: false,
                axisLine: { onZero: false },
                axisTick: { show: false },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisLabel: { show: false },
                splitNumber: 20,
            },
            {
                type: 'category',
                gridIndex: 3,
                data: kCategoryData,
                scale: true,
                //boundaryGap: false,
                axisLine: { onZero: false },
                axisTick: { show: false },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisLabel: { show: false },
                splitNumber: 20,
            },
            {
                type: 'category',
                gridIndex: 4,
                data: kCategoryData,
                scale: true,
                //boundaryGap: false,
                axisLine: { onZero: false },
                axisTick: { show: false },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisLabel: { show: false },
                splitNumber: 20,
            },
        ],
        yAxis: [
            {
                gridIndex: 0,
                //name: 'Price',
                splitNumber: 20,                 
                position: 'right',
                scale: true,
                //max: maxData,
                //min: minData,
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            {
                //name: 'RSI',
                //scale: true,
                //type: 'category',
                //data: ['0','30','50','70','100'],
                gridIndex: 1,
                splitNumber: 10,
                position: 'right',                        
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false,},
                splitLine: { show: true, },
                min: 0,
                max: 100,
                splitLine: {
                    lineStyle: {
                        // 使用深浅的间隔色，RSI数值分别是30，50，70
                        color: ['#fff', '#fff', '#fff', '#666', '#fff', '#ccc', '#fff', '#666', '#fff', '#fff']
                    }
                }
            },
            {
                //name: 'Stoch',
                //scale: true,
                gridIndex: 2,
                splitNumber: 10,
                position: 'right',
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false, },
                splitLine: { show: true, },
                min: 0,
                max: 100,
                splitLine: {
                    lineStyle: {
                        // 使用深浅的间隔色，Stoch数值分别是20，80
                        color: ['#fff', '#fff', '#666', '#fff', '#fff', '#fff', '#fff', '#fff', '#666', '#fff']
                    }
                }
            },
            {
                //name: 'ADX',
                //scale: true,
                //type: 'category',
                //data: ['0','30','50','70','100'],
                gridIndex: 3,
                splitNumber: 5,
                position: 'right',
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false, },
                splitLine: { show: true, },
                min: 11,
                max: 55,
                splitLine: {
                    lineStyle: {
                        // 使用深浅的间隔色，Stoch数值分别是22，33，44
                        color: ['#fff', '#ccc', '#666', '#ccc', '#fff']
                    }
                }
            },
            {
                //name: 'CCI',
                //scale: true,
                //type: 'category',
                //data: ['0','30','50','70','100'],
                gridIndex: 4,
                splitNumber: 7,
                position: 'right',
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false, },
                splitLine: { show: true, },
                min: -300,
                max: 300,
                splitLine: {
                    lineStyle: {
                        // 使用深浅的间隔色，Stoch数值分别是-100，100
                        color: ['#fff', '#fff', '#666', '#fff', '#666', '#fff', '#fff']
                    }
                }
            },
        ],
        dataZoom: [
            {
                type: 'inside',
                //xAxisIndex: [0],
                start: dataZoomStart,
                end: 100
            },
            {
                show: true,
                type: 'slider',
                xAxisIndex: [0, 1, 2, 3, 4],
                start: dataZoomStart,
                end: 100,
                bottom: 210,
                //xAxisIndex: [0],
            }
        ],
        series: [
            {
                name: timeframe,
                type: 'candlestick',
                data: kValues,
                xAxisIndex: 0,
                itemStyle: {
                    normal: {
                        color0: 'YellowGreen',
                        borderColor0: 'YellowGreen',
                        color: 'MintCream',
                        borderColor: 'YellowGreen',
                        }
                    },
            },
            {
                name: 'SMA50',
                type: 'line',
                data: sma50,
                xAxisIndex: 0,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: 'rgb(103, 182, 250)',
                        width: 1
                    }
                }
            },
            {
                name: 'SMA100',
                type: 'line',
                data: sma100,
                xAxisIndex: 0,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: 'rgb(147, 160, 35)',
                        width: 1
                    }
                }
            },
            {
                name: 'SMA200',
                type: 'line',
                data: sma200,
                xAxisIndex: 0,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: 'rgb(241, 139, 1)',
                        width: 1
                    }
                }
            },
            {
                name: 'BBandsUp',
                type: 'line',
                data: bbandsUp,
                xAxisIndex: 0,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: 'rgb(97, 213, 43)',
                        width: 1
                    }
                }
            },
            {
                name: 'BBandsMiddle',
                type: 'line',
                data: bbandsMiddle,
                xAxisIndex: 0,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: 'rgb(97, 213, 43)',
                        width: 1
                    }
                }
            },
            {
                name: 'BBandsLow',
                type: 'line',
                data: bbandsLow,
                xAxisIndex: 0,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: 'rgb(97, 213, 43)',
                        width: 1
                    }
                }
            },
            {
                name: 'RSI',
                type: 'line',
                smooth: true,
                showSymbol: false,
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: rsi,
                lineStyle: { normal: { color: 'DodgerBlue', shadowColor: 'Gainsboro', shadowOffsetX: 1, shadowOffsetY: 1, } }
            },
            {
                name: 'StochSlowK',
                type: 'line',
                smooth: true,
                showSymbol: false,
                xAxisIndex: 2,
                yAxisIndex: 2,
                data: stochSlowK,
                lineStyle: { normal: { color: 'LightSalmon', shadowColor: 'Gainsboro', shadowOffsetX: 1, shadowOffsetY: 1, } }
            },
            {
                name: 'StochSlowD',
                type: 'line',
                smooth: true,
                showSymbol: false,
                xAxisIndex: 2,
                yAxisIndex: 2,
                data: stochSlowD,
                lineStyle: { normal: { color: 'Aquamarine', shadowColor: 'Gainsboro', shadowOffsetX: 1, shadowOffsetY: 1, type: 'dashed' } }
            },
            {
                name: 'ADX',
                type: 'line',
                smooth: true,
                showSymbol: false,
                xAxisIndex: 3,
                yAxisIndex: 3,
                data: adx,
                lineStyle: { normal: { color: 'LimeGreen', shadowColor: 'Gainsboro', shadowOffsetX: 1, shadowOffsetY: 1 } }
            },
            {
                name: 'CCI',
                type: 'line',
                smooth: true,
                showSymbol: false,
                xAxisIndex: 4,
                yAxisIndex: 4,
                data: cci,
                lineStyle: { normal: { color: 'IndianRed', shadowColor: 'Gainsboro', shadowOffsetX: 1, shadowOffsetY: 1 } }
            },
        ]
    });


}
//////////*********LineGraphEchart绘图开始*********/////////////////
