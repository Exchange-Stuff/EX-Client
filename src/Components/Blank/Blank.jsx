import React, {useEffect, useState} from 'react';
import './Blank.css';
import {jwtDecode} from 'jwt-decode';

export const Blank = () => {
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const queryString = window.location.search;
				const url = `https://alpaca-blessed-endlessly.ngrok-free.app/api/Auth/signin${queryString}`;
				const response = await fetch(url, {
					method: 'GET',
				});

				if (response.ok) {
					const result = await response.json();
					localStorage.setItem('accessToken', result.value.accessToken);
					localStorage.setItem('refreshToken', result.value.refreshToken);
					const decodedToken = jwtDecode(result.value.accessToken);
					localStorage.setItem('userId', JSON.stringify(decodedToken));
				}

				await new Promise((resolve) => setTimeout(resolve, 2000));
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
				window.location.href = '/HomePage';
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			{isLoading && (
				<div className="loading-container">
					<div className="loading-spinner"></div>
				</div>
			)}
		</div>
	);
};

export default Blank;
