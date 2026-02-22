import https from 'https';

https.get('https://api.ipify.org', (res) => {
    res.on('data', (ip) => {
        console.log(`\nYour public IP address is: ${ip}`);
        console.log('\nPlease add this IP to your MongoDB Atlas Network Access whitelist:');
        console.log('1. Log in to MongoDB Atlas.');
        console.log('2. Go to "Network Access" under Deployment.');
        console.log('3. Click "+ Add IP Address".');
        console.log('4. Enter your IP or click "Add Current IP Address".');
        console.log('5. Click "Confirm".');
    });
}).on('error', (err) => {
    console.error('Error fetching IP:', err.message);
});
