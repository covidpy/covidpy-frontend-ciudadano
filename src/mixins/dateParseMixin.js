import moment from 'moment'

export default {
  methods: {
    formatDate(date, type = 'date') {
      if (!date) return null;

      if (type === 'month') {
        const [year, month] = date.split('-');
        return `${month}/${year}`;
      }else if (type === 'year') {
        const [year] = date.split('-');
        return `${year}`;
      }
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    parseDate(date,  type = 'date') {
      if (!date) return null;
      if (type === 'month') {
        const [month, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}`;
      }else if (type === 'year') {
        return `${date}-${'01'}`;
      }

      const [day, month, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    todayFormat(){
      return moment().format('YYYY-MM-DD')
    },

  },
}
