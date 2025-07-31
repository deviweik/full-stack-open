import { useState, useEffect } from 'react'
import './App.css'

function MenuPanel() {
  const menuItems = [
    { id: 'home', name: 'Home', link: '/' },
    { id: 'create', name: 'Create Activity', link: '/create_activity' },
    { id: 'log', name: 'Log Activity', link: '/log_activity' },
  ]
  const [selectedMenuPanelItem, setSelectedMenuPanelItem] = useState('home');

  return (
    <div className="menu-panel">
        {menuItems.map(item => (
          <div
            key={item.id}
            className={`menu-item ${selectedMenuPanelItem === item.id ? 'active' : ''}`}
            onClick={() => setSelectedMenuPanelItem(item.id)}
          >
            <a href={item.link}>{item.name}</a>
          </div>
        ))}

    </div>
  )
}

function Activity({ activity, completed }) {
  console.log('Completed status for activity:', activity.name, completed);
  const [isCompleted, setIsCompleted] = useState(completed);

  const registerActivity = async () => {
    if (isCompleted) return;
    try {
      const response = await fetch('http://localhost:3001/activity_logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityId: activity.id,
          timestamp: new Date().toISOString(),
          completed: true,
        }),
      });
      if (response.ok) {
        setIsCompleted(true);
        console.log(`Activity ${activity.name} logged.`);
      } else {
        console.error('Failed to log activity');
      }
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  return (
    <div
      className="activity"
      onClick={registerActivity}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid #ccc',
        padding: '8px',
        borderRadius: '4px',
        margin: '0.5em',
        cursor: isCompleted ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        background: isCompleted ? '#e0ffe0' : '#fff',
        transition: 'background 0.2s',
        opacity: isCompleted ? 0.6 : 1,
      }}
      tabIndex={0}
      role="button"
      aria-disabled={isCompleted}
    >
      {activity.name}
    </div>
  );
}

function getDayStart(date = new Date()) {
  // Returns a Date object for today at 4am
  const d = new Date(date);
  if (d.getHours() < 4) {
    // If before 4am, use previous day
    d.setDate(d.getDate() - 1);
  }
  d.setHours(4, 0, 0, 0);
  return d;
}

// function ActivityList() {
//   const [activities, setActivities] = useState([]);
//   const [completedIds, setCompletedIds] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3001/activities')
//       .then(response => response.json())
//       .then(data => setActivities(data))
//       .catch(error => console.error('Error fetching activities:', error));
//   }, []);

//   console.log('Activities:', activities);

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/activity_logs');
//         const logs = await response.json();
//         console.log('Fetched activity logs:', logs);
//         const dayStart = getDayStart();
//         const dayEnd = new Date(dayStart);
//         dayEnd.setDate(dayEnd.getDate() + 1);

//         // Filter logs for today (4am to next 4am)
//         const todayLogs = logs.filter(log => {
//           const logTime = new Date(log.timestamp);
//           return logTime >= dayStart && logTime < dayEnd && log.completed;
//         });

//         console.log('Filtered today logs:', todayLogs);

//         // Get completed activity IDs
//         setCompletedIds(todayLogs.map(log => log.activityId));
//       } catch (error) {
//         console.error('Error fetching activity logs:', error);
//       }
//     };
//     fetchLogs();
//   }, []);

//   console.log('Completed IDs:', completedIds);
//   activities.forEach(activity => {
//   console.log(
//     `Activity: ${activity.name}`,
//     `ID: ${activity.id} (${typeof activity.id})`,
//     `Completed IDs: ${completedIds.map(id => `${id} (${typeof id})`).join(', ')}`,
//     `Matched: ${completedIds.includes(activity.id)}`
//   );
// });
//   return (
//     <div className="activity-list">
//       {activities.map(activity => (
//         <Activity
//           key={activity.id}
//           activity={activity}
//           completed={completedIds.includes(Number(activity.id))}
//         />
//       ))}
//     </div>
//   );
// }
function ActivityList() {
  const [activities, setActivities] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesRes, logsRes] = await Promise.all([
          fetch('http://localhost:3001/activities'),
          fetch('http://localhost:3001/activity_logs')
        ]);

        const activitiesData = await activitiesRes.json();
        const logsData = await logsRes.json();

        const dayStart = getDayStart();
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayEnd.getDate() + 1);

        const todayLogs = logsData.filter(log => {
          const logTime = new Date(log.timestamp);
          return logTime >= dayStart && logTime < dayEnd && log.completed;
        });

        setActivities(activitiesData.map(a => ({ ...a, id: Number(a.id) })));
        setCompletedIds(todayLogs.map(log => Number(log.activityId)));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="activity-list">
      {activities.map(activity => (
        <Activity
          key={activity.id}
          activity={activity}
          completed={completedIds.includes(activity.id)}
        />
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      <div className="content">
        <h2>Welcome to the Activity Tracker</h2>
        <ActivityList />
      </div>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Activity Tracker</p>
      </footer>
    </>
  )
}

export default App
