export function formatTime12h(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12; // 将0转换为12（午夜或正午）

    return `${hour12}:${minutes} ${period}`;
}

export function formatDateTimeWithWeek(timestamp) {
    const date = new Date(timestamp * 1000);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const weekDay = daysOfWeek[date.getDay()]; // 获取星期信息
    return `${weekDay},${hours}:${minutes}`;
}