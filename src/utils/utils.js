export default {
  numberWithCommas: (n) => (n).toLocaleString(),
  converttimeInMsToDate: (ms, locale = 'ko') => {
    const date = new Date(ms);
    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
    };

    /**
     * locale
     * - ko: YYYY.MM.DD
     * - en: MM/DD/YYYY
     */
    const result = date.toLocaleDateString(locale, options);

    return result;
  },
};
