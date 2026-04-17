const formatDate = (dateString?: string): string => {
  const locale = (typeof navigator !== 'undefined' && navigator?.language) || 'en-US';
  if (!dateString) {
    return '';
  }

  let date;
  // Handle Sitecore specific format '20250329T000000' by adding dashes
  if (/^\d{8}T\d{6}/.test(dateString)) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    date = new Date(`${year}-${month}-${day}`);
  } else {
    date = new Date(dateString);
  }
  const timestamp = date.getTime();
  // 1900-01-01T00:00:00Z in ms since epoch
  const minTimestamp = -2208988800000;

  const isValidDate = !isNaN(timestamp) && timestamp >= minTimestamp;
  if (!isValidDate || isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString(locale, {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};

export default formatDate;
