export const setupNotificationWebsocket = () => {
	console.log("Connecting to notifications server");
	const ws = new WebSocket(`ws://${process.env.NEXT_PUBLIC_NOTIFICATIONS_SERVER_ADDRESS}`);

	ws.onopen = () => {
		console.log("Connected to notifications server");
	};

	ws.onmessage = (event) => {
		const data = JSON.parse(event.data);
		console.log("Received notification", data);
		// todo show a toast
	};

	ws.onclose = () => {
		console.log("Disconnected from notifications server");
		// Try to reconnect every 5 seconds
		// setTimeout(() => {
		// 	NotificationsWebsocket();
		// }, 5000);
	};

}