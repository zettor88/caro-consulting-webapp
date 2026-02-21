const id = "eb6e47c1-26c3-4d4b-ae71-9c869ea10a62"; // Let's get an actual ID or we'll fake one if it 404s
fetch('https://caro-consulting-webapp.vercel.app/api/diagnostic-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ diagnosticoId: id })
})
.then(res => res.json().then(data => ({status: res.status, data})))
.then(console.log)
.catch(console.error);
