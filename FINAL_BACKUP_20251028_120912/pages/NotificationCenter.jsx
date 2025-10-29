import React, { useState, useEffect, createContext, useContext } from 'react';
import './NotificationCenter.css';

// Context for notifications across the app
const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

// Notification Provider Component
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulate receiving notifications (replace with WebSocket/API)
  useEffect(() => {
    // Initial notifications
    const initialNotifications = [
      {
        id: 1,
        type: 'success',
        title: 'Audit Completed',
        message: 'Your GlobalGAP certification audit has been completed successfully',
        timestamp: new Date(Date.now() - 2 * 60000),
        read: false,
        icon: 'Ã¢Å“â€¦',
        action: { label: 'View Report', link: '/audits/123' }
      },
      {
        id: 2,
        type: 'warning',
        title: 'Expiration Alert',
        message: 'Water quality certification expires in 15 days',
        timestamp: new Date(Date.now() - 60 * 60000),
        read: false,
        icon: 'Ã¢Å¡Â Ã¯Â¸Â',
        action: { label: 'Renew Now', link: '/services' }
      },
      {
        id: 3,
        type: 'info',
        title: 'New Data Available',
        message: 'USDA weekly pricing report W26 is now available',
        timestamp: new Date(Date.now() - 3 * 60 * 60000),
        read: false,
        icon: 'Ã°Å¸â€œÅ ',
        action: { label: 'View Data', link: '/search' }
      },
      {
        id: 4,
        type: 'urgent',
        title: 'Action Required',
        message: 'TRID disclosure requires your immediate attention',
        timestamp: new Date(Date.now() - 5 * 60 * 60000),
        read: false,
        icon: 'Ã°Å¸Å¡Â¨',
        action: { label: 'Take Action', link: '/audits/456' }
      }
    ];

    setNotifications(initialNotifications);
    setUnreadCount(initialNotifications.filter(n => !n.read).length);

    // Simulate new notifications every 30 seconds (for demo)
    const interval = setInterval(() => {
      addNotification({
        type: 'info',
        title: 'System Update',
        message: 'New features have been added to your dashboard',
        icon: 'Ã°Å¸Å½â€°'
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);

    // Show toast
    showToast(newNotification);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const showToast = (notification) => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `notification-toast ${notification.type}`;
    toast.innerHTML = `
      <div class="toast-icon">${notification.icon}</div>
      <div class="toast-content">
        <div class="toast-title">${notification.title}</div>
        <div class="toast-message">${notification.message}</div>
      </div>
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  };

  const value = {
    notifications,
    unreadCount,
    isOpen,
    setIsOpen,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationCenter />
    </NotificationContext.Provider>
  );
}

// Notification Center Component
function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    isOpen,
    setIsOpen,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  } = useNotifications();

  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  if (!isOpen) return null;

  return (
    <div className="notification-overlay" onClick={() => setIsOpen(false)}>
      <div className="notification-panel" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="notification-header">
          <div className="notification-title">
            <h2>Ã°Å¸â€â€ Notifications</h2>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount}</span>
            )}
          </div>
          <button
            className="notification-close"
            onClick={() => setIsOpen(false)}
          >
            Ã¢Å“â€¢
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="notification-filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({notifications.length})
          </button>
          <button
            className={filter === 'unread' ? 'active' : ''}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button
            className={filter === 'read' ? 'active' : ''}
            onClick={() => setFilter('read')}
          >
            Read ({notifications.length - unreadCount})
          </button>
        </div>

        {/* Actions */}
        {notifications.length > 0 && (
          <div className="notification-actions">
            <button onClick={markAllAsRead} className="action-btn">
              Mark all as read
            </button>
            <button onClick={clearAll} className="action-btn danger">
              Clear all
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="notifications-container">
          {filteredNotifications.length === 0 ? (
            <div className="no-notifications">
              <div className="no-notifications-icon">Ã°Å¸â€â€¢</div>
              <p>No notifications</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <div className="notification-indicator"></div>
                
                <div className="notification-icon">{notification.icon}</div>
                
                <div className="notification-body">
                  <div className="notification-header-text">
                    <h4>{notification.title}</h4>
                    <span className="notification-time">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                  
                  <p className="notification-message">{notification.message}</p>
                  
                  {notification.action && (
                    <a
                      href={notification.action.link}
                      className="notification-action"
                      onClick={e => e.stopPropagation()}
                    >
                      {notification.action.label} Ã¢â€ â€™
                    </a>
                  )}
                </div>
                
                <button
                  className="notification-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                >
                  Ã¢Å“â€¢
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Notification Bell Button Component
export function NotificationBell() {
  const { unreadCount, setIsOpen } = useNotifications();

  return (
    <button className="notification-bell" onClick={() => setIsOpen(true)}>
      Ã°Å¸â€â€
      {unreadCount > 0 && (
        <span className="bell-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
      )}
    </button>
  );
}

export default NotificationCenter;