export const formatMessageTime = (dateString: string) => {
  
  const istTime = new Date(dateString).toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

  return istTime;
};
