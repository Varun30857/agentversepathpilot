import http from 'http';

const data = JSON.stringify({
  "profile": {
    "education": {
      "degree": "B.Tech",
      "branch": "CSE",
      "cgpa": 8.0
    },
    "technical_skills": {
      "programming_languages": ["Java", "SQL"],
      "frameworks": [],
      "libraries": [],
      "databases": ["MySQL"],
      "tools": ["Git"],
      "cloud": [],
      "others": []
    },
    "projects": [
      {
        "title": "Basic Java CRUD",
        "tech_stack": ["Java", "MySQL"]
      }
    ],
    "certifications": [],
    "internships": [],
    "work_experience": [],
    "achievements": [],
    "preferred_domain": "Software Development"
  },
  "target_company": "Zoho"
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/agent/skill-gap',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS CODE: ${res.statusCode}`);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log("RESPONSE BODY:\n", JSON.parse(body));
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
