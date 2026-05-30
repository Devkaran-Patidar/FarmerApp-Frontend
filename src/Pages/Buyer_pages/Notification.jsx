import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import no_notifications from "../../assets/no_notification.png";
import "./Notification.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/notifications/`, {
        withCredentials: true
      });
      setNotifications(res.data || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.post(`${API_URL}/api/notifications/read/`, { id });
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const getNotificationIcon = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes("order") || msg.includes("purchase")) {
      return <i className="fa-solid fa-box-open"></i>;
    }
    if (msg.includes("deliver") || msg.includes("ship") || msg.includes("truck")) {
      return <i className="fa-solid fa-truck"></i>;
    }
    if (msg.includes("cancel") || msg.includes("reject")) {
      return <i className="fa-solid fa-circle-xmark" style={{ color: "#ef4444" }}></i>;
    }
    if (msg.includes("approve") || msg.includes("confirm") || msg.includes("success") || msg.includes("accept")) {
      return <i className="fa-solid fa-circle-check" style={{ color: "#16a34a" }}></i>;
    }
    return <i className="fa-solid fa-bell"></i>;
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="notifications-container">
      <div className="notifications-shell">
        <header className="notifications-header">
          <div className="notifications-title-area">
            <i className="fa-solid fa-bell"></i>
            <h2>
              Notifications
              {unreadCount > 0 && (
                <span className="unread-badge">{unreadCount} new</span>
              )}
            </h2>
          </div>
        </header>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
            <div style={{
              width: "40px",
              height: "40px",
              border: "4px solid rgba(22, 163, 74, 0.15)",
              borderTopColor: "#16a34a",
              borderRadius: "50%",
              animation: "spin 0.85s linear infinite"
            }}></div>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : notifications.length === 0 ? (
          <div className="notifications-empty">
            <img src={no_notifications} alt="No notifications" />
            <div className="notifications-empty-info">
              <h3>All caught up!</h3>
              <p>You have no notifications at the moment. We will notify you when something updates.</p>
            </div>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map(n => (
              <div
                key={n.id}
                className={`notification-card ${n.is_read ? "read" : "unread"}`}
                onClick={() => !n.is_read && markAsRead(n.id)}
              >
                <div className="notification-icon-wrap">
                  {getNotificationIcon(n.message)}
                </div>
                <div className="notification-content">
                  <p className="notification-message">{n.message}</p>
                  <div className="notification-time-row">
                    <span className="notification-time">
                      <i className="fa-regular fa-clock"></i>
                      {new Date(n.created_at).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {!n.is_read && <span className="unread-dot-indicator" title="Unread"></span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;