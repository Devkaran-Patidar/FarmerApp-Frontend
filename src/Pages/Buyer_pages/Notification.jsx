import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import no_notifications from "../../assets/no_notification.png";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const res = await axios.get(`${API_URL}/api/notifications/`, {
      withCredentials: true
    });
    setNotifications(res.data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    await axios.post(`${API_URL}/api/notifications/read/`, { id });
    fetchNotifications();
  };

  return (
    <div>
  
      {notifications.length === 0 && (
        <div style={{display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center" , width:"100%", padding:"20px", overflow:"hidden"
        }} >
          <h3>Notifications 🔔</h3>
          <img style={{
            width:"150px"
          }} src={no_notifications}  alt="No notifications" />
        </div>
      )}

      {notifications.map(n => (
        <div
          key={n.id}
          style={{
            background: n.is_read ? "#eee" : "#cce5ff",
            margin: "10px",
            padding: "10px",
            cursor: "pointer"
          }}
          onClick={() => markAsRead(n.id)}
        >
          <p>{n.message}</p>
          <small>{new Date(n.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default Notifications;