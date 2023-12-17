describe('Reservations', () => {
	beforeAll(async () => {
		const user = {
			email: 'sleeprnestapp@gmail.com',
			password: 'TestPassword@!'
		}
		await fetch("http://auth:3001/users", {
			method: 'POST',
			body: JSON.stringify(user)
		});
		const response = await fetch("http://auth:3001/auth/login", {
			method: 'POST',
			body: JSON.stringify(user)
		});
		const jwt = await response.text();
		console.log(jwt);
	})

	test('Create', () => {

	})
});