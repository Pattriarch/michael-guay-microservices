describe('Reservations', () => {
	beforeAll(async () => {
		const user = {
			email: 'sleeprnestapp@gmail.com',
			password: 'TestPassword@!'
		}
		await fetch("http://auth:3001", {
			method: 'POST',
			body: JSON.stringify(user)
		})
	})

	test('Create', () => {

	})
});