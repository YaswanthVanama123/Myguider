self.addEventListener('push', function(event) {
  console.log('Push received');
  const data = event.data.json();
  console.log('Push data:', data);

  // Extract notificationNumber from the payload
  const notificationNumber = data.notificationNumber;
  console.log('Notification Number:', notificationNumber);

  // Show the notification
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: `${data.body} (Notification Number: ${notificationNumber})`,
      icon: data.icon,
      data: {
        url: `/notification/accepted?notificationNumber=${notificationNumber}`, // Pass the URL to the notification data with notificationNumber
        notificationNumber: notificationNumber // Pass the notificationNumber to the notification data
      }
    })
  );
  console.log(notificationNumber);
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked');

  // Close the notification
  event.notification.close();

  // Get the URL from the notification data
  const notificationData = event.notification.data;
  const url = notificationData ? notificationData.url : '/';

  event.waitUntil(
    clients.openWindow(url)
  );
});