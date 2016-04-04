(function(){
  window.courses = [
    {
      "dept": "COMP",
      "num": "1405",
      "name": "Intro to Computer Science I",
      "desc": "This is a beginner's course in programming. You will learn the basics of programming in JAVA beginning with simple" +
"concepts such as getting user input and displaying output as well as the use of variables, conditionals, iteration, arrays," +
"and functions & procedures. The course will discuss the use of objects as data structures but WILL NOT discuss aspects" +
"of object-oriented programming. Instead, the course will emphasize problem solving and computational thinking by" +
"touching upon topics such as pseudocode, sorting, searching, recursion and simulation.",
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
      "desc": "This is a second course in programming. It covers more advanced object‐oriented topics inheritance, encapsulation and polymorphism.",
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
      "desc":"An introduction to Internet application development that emphasizes the computer science fundamentals of the technologies underlying web applications. Topics include: scripting and functional languages, language­-based virtual machines, database query languages, remote procedure calls over the Internet, and performance and security concerns in modern distributed applications.",
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
      "desc": "Nature of language and linguistic knowledge. Formal description and analysis of language: phonetics," +
"phonology, morphology, syntax and semantics. Precludes additional credit for LALS 1000 and LALS" +
"1001 (no longer offered). Lectures three hours a week.",
      "prereqs": [],
      "timeslots": [{
        "days": [2, 4],
        "startTime": "08:35",
        "endTime": "09:55",
        "prof": "Masako Hirotani",
        "location": "TB 360"
      }, {
        "days": [3, 5],
        "startTime": "19:05",
        "endTime": "20:25",
        "prof": "Randall Gess",
        "location": "AZ 102"
      }]
    },
    {
      "dept": "LING",
      "num": "2504",
      "name": "Language and Communication",
      "desc": "We shall begin by discussing some central topics of Frege’s philosophy of language."+
"The main topics discussed will be: Frege’s sense/reference distinction, Frege’s theory of"+
"thought, Frege’s anti-psychologism and Frege’s theory of demonstratives. To"+
"understand the importance of Frege’s contribution we will focus on Dummett’s"+
"interpretation.",
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
      "desc":"Introduction to word structure and morphological theory. Topics include inflectional and derivational morphology, morphological processes, and interaction of morphology with phonology and syntax.",
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
      "desc": "An introduction to the sorts of concerns expressed by the perennial philosophical question, “What is the meaning of life?&quot; and to various philosophical theories aimed at addressing those concerns.",
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
      "desc":"An introduction to the techniques and philosophical implications of formal logic with emphasis on translation of expressions into symbolic form, testing for logical correctness, the formulation and application of rules of inference, and the relation between logic and language.",
      "prereqs": [],
      "timeslots": [{
        "days": [3, 5],
        "startTime": "11:35",
        "endTime": "12:55",
        "prof": "Jordan Dodd",
        "location": "MC 2000"
      }, {
        "days": [2, 4],
        "startTime": "08:35",
        "endTime": "09:55",
        "prof": "Gabriele Contessa",
        "location": "SA THB"
      }]
    },
    {
      "dept": "PSYC",
      "num": "1001",
      "name": "Intorduction to Psychology I",
      "desc": "A survey of topics associated with psychology's role as a natural science, including neuroscience, cognition, and learning.",
      "prereqs": [],
      "timeslots": [{
        "days": [1, 3],
        "startTime": "19:05",
        "endTime": "20:25",
        "prof": "Peter Aubin",
        "location": "MC 2000"
      }, {
        "days": [2, 4],
        "startTime": "19:05",
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
      "desc": "A survey of topics associated with psychology's role as a social science, including social psychology, personality and abnormal psychology.",
      "prereqs": ["1001"],
      "timeslots": [{
        "days": [1, 3],
        "startTime": "16:05",
        "endTime": "17:25",
        "prof": "Peter Aubin",
        "location": "MC 2000"
      }, {
        "days": [2, 4],
        "startTime": "08:35",
        "endTime": "09:55",
        "prof": "Kim O'Neil",
        "location": "SA THB"
      }]
    },
    {
      "dept": "CGSC",
      "num": "1001",
      "name": "Mysteries of the Mind",
      "desc": "Challenges faced in understanding the mind, and some of the approaches cognitive science has brought to bear on them. Topics may include the nature of knowledge, how we learn, the extent to which human thinking is rational, biases in thinking, and evolutionary influences on cognition.",
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
      "desc":"Selected topics in cognitive science covered from the perspectives of psychology, computer science, linguistics, philosophy, and other related disciplines. Students may be required to complete independent research projects.",
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
      "desc": "Cognitive science from a philosophical perspective. Topics may include: philosophical methods for studying the mind, prospects for naturalizing consciousness and intentionality, assessing competing models of the mind.",
      "prereqs": [],
      "timeslots": [{
        "days": [2, 4],
        "startTime": "14:35",
        "endTime": "15:55",
        "prof": "Jim Davies",
        "location": "UC 231"
      }]
    }
  ];
})();
