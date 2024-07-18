window.onload = () => {
    let client_id = 'c452eab3380f4f9fae6c0eb09cb555b0';
    let client_secret = '1cffe839cc864fe5a142d82cba1b8f00';


    refreshToken(client_id, client_secret);
    document.getElementById('refreshAccessToken').onclick = () => refreshToken(client_id, client_secret);
    initalizeAPICall();

};

function refreshToken(client_id, client_secret) {
    tokenElement = document.getElementById('accessToken');

    const credentials = btoa(client_id + ':' + client_secret);
    
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + credentials,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        const token = data.access_token;
        tokenElement.value = token;
        tokenElement.innerText = "Token updated on " + new Date().toLocaleString();
    })
    .catch(error => {
        console.error('Error:', error);
    });  
}

function initalizeAPICall() {
    apiContainers = Array.from(document.getElementsByClassName('apiCall'));
    apiContainers.forEach((row) => {
        link = row.querySelector('.endpoint').innerText;
        button = row.querySelector('.button');

        button.onclick = () => makeAPICall(link);
    });

}

async function makeAPICall(link) {
    let token = document.getElementById('accessToken').value;
    alert(token);
  
    try {
        const response = await fetch('https://api.spotify.com/v1/me/player', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }

}