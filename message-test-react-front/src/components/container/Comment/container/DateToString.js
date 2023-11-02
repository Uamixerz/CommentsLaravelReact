const DateToString = (dateString) => {
    const currentDate = new Date();
    const date = new Date(dateString);
    const timeDiff = currentDate.getTime() - date.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return `${seconds} секунд тому`;
    } else if (minutes < 60) {
        return `${minutes} хвилин тому`;
    } else if (hours < 24) {
        return `${hours} годин тому`;
    } else if (days === 1) {
        return 'вчора';
    } else if (days < 30) {
        return `${days} днів тому`;
    } else {
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const time = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
        return `${day} ${month} о ${time}`;
    }
};

export default DateToString;