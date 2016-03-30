/* TODO:
  Do away with times to label timeslots in courses.json/courses.js?
    -Using indicies will probably simplify finding the corresponding cell in the table

  Need to handle 3hr classes?
*/
var courses = [
  {
    "dept": "COMP",
    "num": "1405",
    "name": "Intro to Computer Science I",
    "prereqs": [],
    "timeslots": [{
      "days": [2, 4],
      "startTime": "11:35",
      "endTime": "12:55",
      "prof": "Pat Morin",
      "location": "LA C164"
    }]
  },
  {
    "dept": "COMP",
    "num": "1406",
    "name": "Intro to Computer Science II",
    "prereqs": ["1405"],
    "timeslots": [{
      "days": [1, 3],
      "startTime": "11:35",
      "endTime": "12:55",
      "prof": "Marc Lanthier",
      "location": "MC 2000"
    }]
  },
  {
    "dept": "COMP",
    "num": "2406",
    "name": "Fundamentals of Web Applications",
    "prereqs": ["1406"],
    "timeslots": [{
      "days": [2, 4],
      "startTime": "14:35",
      "endTime": "15:55",
      "prof": "Anil Somayaji",
      "location": "UC 231"
    }]
  },
  {
    "dept": "LING",
    "num": "1001",
    "name": "Introduction to Linguistics",
    "prereqs": [],
    "timeslots": [{
      "days": [2, 4],
      "startTime": "08:35",
      "endTime": "09:55",
      "prof": "Masako Hirotani",
      "location": "TB 360"
    }, {
      "days": [3],
      "startTime": "18:05",
      "endTime": "20:25",
      "prof": "Randall Gess",
      "location": "AZ 102"
    }]
  },
  {
    "dept": "LING",
    "num": "2504",
    "name": "Language and Communication",
    "prereqs": ["1001"],
    "timeslots": [{
      "days": [2, 4],
      "startTime": "14:35",
      "endTime": "15:55",
      "prof": "Katherine Wayne",
      "location": "LA C264"
    }]
  },
  {
    "dept": "LING",
    "num": "3005",
    "name": "Morphology",
    "prereqs": ["1001"],
    "timeslots": [{
      "days": [3, 5],
      "startTime": "13:05",
      "endTime": "14:25",
      "prof": "Randall Gess",
      "location": "LA C264"
    }, {
      "days": [1, 3],
      "startTime": "08:35",
      "endTime": "09:55",
      "prof": "Janna Fox",
      "location": "AZ 101"
    }]
  },
  {
    "dept": "PHIL",
    "num": "1200",
    "name": "The Meaning of Life",
    "prereqs": [],
    "timeslots": [{
      "days": [2, 4],
      "startTime": "13:05",
      "endTime": "14:25",
      "prof": "Ken Ferguson",
      "location": "TB 360"
    }]
  },
  {
    "dept": "PHIL",
    "num": "2001",
    "name": "Introduction to Symbolic Logic",
    "prereqs": [],
    "timeslots": [{
      "days": [3, 5],
      "startTime": "11:35",
      "endTime": "12:55",
      "prof": "Jordan Dodd",
      "location": "MC 2000"
    }, {
      "days": [2],
      "startTime": "08:35",
      "endTime": "10:55",
      "prof": "Gabriele Contessa",
      "location": "SA THB"
    }]
  },
  {
    "dept": "PSYC",
    "num": "1001",
    "name": "Intorduction to Psychology I",
    "prereqs": [],
    "timeslots": [{
      "days": [1],
      "startTime": "18:05",
      "endTime": "20:25",
      "prof": "Peter Aubin",
      "location": "MC 2000"
    }, {
      "days": [2],
      "startTime": "18:05",
      "endTime": "20:25",
      "prof": "Kim O'Neil",
      "location": "SA KMTH"
    }, {
      "days": [3, 5],
      "startTime": "11:35",
      "endTime": "12:55",
      "prof": "Jo-Anne LeFevre",
      "location": "AZ 101"
    }]
  },
  {
    "dept": "PSYC",
    "num": "1002",
    "name": "Introduction to Psychology II",
    "prereqs": ["1001"],
    "timeslots": [{
      "days": [1, 3],
      "startTime": "16:05",
      "endTime": "17:25",
      "prof": "Peter Aubin",
      "location": "MC 2000"
    }, {
      "days": [2],
      "startTime": "08:35",
      "endTime": "10:55",
      "prof": "Kim O'Neil",
      "location": "SA THB"
    }]
  },
  {
    "dept": "CGSC",
    "num": "1001",
    "name": "Mysteries of the Mind",
    "prereqs": [],
    "timeslots": [{
      "days": [2, 4],
      "startTime": "10:05",
      "endTime": "11:25",
      "prof": "Jim Davies",
      "location": "SA THB"
    }]
  },
  {
    "dept": "CGSC",
    "num": "2002",
    "name": "Theories and Methods in Cognitive Science",
    "prereqs": [],
    "timeslots": [{
      "days": [3, 5],
      "startTime": "16:05",
      "endTime": "17:25",
      "prof": "Kathie Galotti",
      "location": "LA C264"
    }]
  },
  {
    "dept": "CGSC",
    "num": "3004",
    "name": "Philosophy in Cognitive Science",
    "prereqs": [],
    "timeslots": [{
      "days": [4],
      "startTime": "14:35",
      "endTime": "15:25",
      "prof": "Jim Davies",
      "location": "UC 231"
    }]
  }
];
