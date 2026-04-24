export const formatMessageTime = (dateString: string) => {
  // Convert to ISO format
  const formatted = dateString.replace(" ", "T").split(".")[0];

  const date = new Date(formatted);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );

  const messageDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const time = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata", // 👈 important
  });

  if (messageDay.getTime() === today.getTime()) {
    return `Today, ${time}`;
  }

  if (messageDay.getTime() === yesterday.getTime()) {
    return `Yesterday, ${time}`;
  }

  const fullDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata", // 👈 important
  });

  return `${fullDate}, ${time}`;
};