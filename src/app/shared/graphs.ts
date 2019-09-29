export const Graphs = {
  column: {
    chart: {
      alignTicks: false
    },

    rangeSelector: {
      selected: 1
    },

    title: {
      text: 'AAPL Stock Volume'
    },

    series: [{
      type: 'column',
      name: 'AAPL Stock Volume',
      data: [],

    }]
  },
  areaspline: {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'AAPL Stock Price'
    },
    series: [{
      tooltip: {
        valueDecimals: 2
      },
      type: 'areaspline',
      name: 'AAPL',
      data: [],
    }]
  },
  spline: {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'AAPL Stock Price'
    },
    series: [{
      tooltip: {
        valueDecimals: 2
      },
      type: 'spline',
      name: 'AAPL',
      data: []
    }]
  }
};