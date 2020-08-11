import moment from 'moment';

export default {
  filters: {
    formatDateFull: function (date) {
      if (!date) return '';

      switch (date.length) {
        case 7:
          return moment(date).format('MM/YYYY');
        case 10:
          return moment(date).format('DD/MM/YYYY');
        default:
          return moment(date).format('DD/MM/YYYY HH:mm');
      }
    },
    formatDateSingle: function (date) {
      if (date && date.length === 7) {
        return moment(date).format('MM/YYYY');
      } else {
        return moment(date).format('DD/MM/YYYY');
      }
    },
    formatDateFullDescription: function (date) {
      return date ? moment(date).format('dddd LL, hh:mm a') : '';
    },
    formatDateAndHour: function (date) {
      return date ? moment(date).format('DD/MM/YYYY hh:mm').toString() : '';
    },
    formatDateMonthAndYear: function (date) {
      return date ? moment(date).format('MMM YYYY') : '';
    },
    formatDateSingleScript: function (date) {
      return date ? moment(date).format('YYYY-MM-DD').toString() : '';
    },
    formatoHora: function (date) {
      return date ? moment(date).format('h:mm a') : '';
    },
    getSingleHour: function (date) {
      return date ? moment(date).format('HH:mm') : '';
    },
    getDateDescription: function (date) {
      return date ? moment(date).format('ll') : '';
    },
    subtractHour(date, hour) {
      let temp = moment(date);
      let time = moment.duration(hour !== null ? hour : 0, 'hours');
      return temp.subtract(time).format('YYYY-MM-DDTHH:mm');
    }
  }
};
