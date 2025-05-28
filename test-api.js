import fetch from 'node-fetch';

async function testAPI() {
    try {
        // Test adding a school
        console.log('Testing Add School API...');
        const addResponse = await fetch('http://localhost:3000/api/addSchool', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "DPS School",
                address: "123 Education Street, Delhi",
                latitude: 28.6139,
                longitude: 77.2090
            })
        });
        const addResult = await addResponse.json();
        console.log('Add School Result:', addResult);

        // Test listing schools
        console.log('\nTesting List Schools API...');
        const listResponse = await fetch('http://localhost:3000/api/listSchools?latitude=28.6139&longitude=77.2090');
        const listResult = await listResponse.json();
        console.log('List Schools Result:', listResult);

    } catch (error) {
        console.error('Error testing API:', error);
    }
}

testAPI(); 