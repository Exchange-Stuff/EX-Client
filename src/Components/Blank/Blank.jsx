import React, { useEffect } from 'react';

export const Blank = () => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryString = window.location.search;
                console.log("Query:" + queryString);
                const url = "http://localhost:5059/api/Auth/signin" + queryString;
                const request = new Request(url, {
                    method: 'GET'
                });
                console.log(request);
                const response = await fetch(request);
                console.log(response);
                if (response.ok) {
                    const text = await response.text();
                    const parsedText = JSON.parse(text);
                    localStorage.setItem('accesstoken', parsedText.value.accessToken);
                    console.log(parsedText.value.accessToken);
                    localStorage.setItem('refresh', parsedText.value.refreshToken);
                    console.log(parsedText.value.refreshToken);
                    // window.location.href = "http://localhost:3000/HomePage";
                } else {
                    // window.location.href = "http://localhost:3000/payment";
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally handle error (e.g., redirect to an error page)
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once on component mount

    return (
        <div>
            {/* Your component's content */}
        </div>
    );
};
