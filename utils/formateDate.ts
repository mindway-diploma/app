export const formateDate = (dateStr: string) => {
    let date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}
export const formateDateAndTime = (dateStr: string) => {
    console.log(dateStr)
    const date = new Date(dateStr);

    const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
}
export const formatTime = (dateString: string) => {
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric", 
      minute: "2-digit", 
      hour12: true,
    };
  
    return date.toLocaleTimeString("en-US", options);
}