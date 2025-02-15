const fs = require('fs');
const path = require('path');

const generateData = () => {
  const data = [];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satuarday",
    "Sunday"
  ];

  for (let i = 1; i <= 35000; i++) {
    const uid = `user${i}`;
    const month = months[Math.floor(Math.random() * months.length)];
    const day = `${days[Math.floor(Math.random() * 7)] }`;
    const searchQuery = `example query ${i}`;
    const isAccomplised = Math.random() > 0.5;

    data.push({
      uid,
      month,
      day,
      searchQuery,
      isAccomplised
    });
  }

  return data;
};

const data = generateData();
const filePath = path.join(__dirname, 'data.json');

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
console.log('Data generated and saved to data.json');