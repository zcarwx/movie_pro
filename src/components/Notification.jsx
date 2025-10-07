import { useNotification } from "../context/NotificationContext";

export default function Notification() {
  const { message } = useNotification();
  if (!message) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded">
      {message}
    </div>
  );
}
