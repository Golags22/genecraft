export const courses = [
  {
    id: 1,
    title: "Cybersecurity Essentials",
    rating: 3.5,
    reviews: 100,
    students: 100,
    duration: "2:00 hr",
    updatedDate:2025,
    description:
      "Understand security threats, ethical hacking, and defence strategies to protect networks, systems, and sensitive data.",
    image:
      "https://media.istockphoto.com/id/1599477394/photo/happy-university-professor-giving-a-presentation-to-group-of-students-in-lecture-hall.jpg?s=612x612&w=0&k=20&c=x-MTmA7yAjFOZyrCfsVwaCrzegloRr3OjPYXyoQN_iE=",
    difficulty: "Beginner",
    price: 49.99,
    originalPrice: 50,
    instructor: {
         title:"Mr.",
      name: "Williams",
      numbersofcourses:2,
      avatar:
        "https://media.istockphoto.com/id/183351132/photo/math-teacher-explaining.jpg?s=612x612&w=0&k=20&c=YI5w0ZHOLQK78OcMpEPDohmSGGwoQxNXKk9SHsXTgt8=",
    },
    category: "tech",
    learningOutcomes: [
      "Identify and assess common cyber threats and vulnerabilities",
      "Implement basic network security measures and encryption",
      "Conduct ethical hacking and penetration testing",
      "Develop strategies for incident response and prevention",
    ],
    curriculum: [
      {
        sectionTitle: "Security Fundamentals",
        lessons: [
          { id: 1, title: "Cybersecurity Fundamentals", duration: "20 min" },
          { id: 2, title: "Types of Cyber Threats & Attacks", duration: "25 min" },
          { id: 3, title: "Network Security Basics", duration: "30 min" },
        ],
      },
      {
        sectionTitle: "Advanced Security Concepts",
        lessons: [
          { id: 4, title: "Cryptography Principles", duration: "30 min" },
          { id: 5, title: "Vulnerability Assessment & Penetration Testing", duration: "35 min" },
          { id: 6, title: "Ethical Hacking Practices", duration: "40 min" },
        ],
      },
      {
        sectionTitle: "Response & Compliance",
        lessons: [
          { id: 7, title: "Incident Response & Recovery", duration: "25 min" },
          { id: 8, title: "Security Best Practices & Compliance", duration: "20 min" },
        ],
      },
    ],
  },

  {
    id: 2,
    title: "Data Science Fundamentals",
    rating: 3.5,
    reviews: 100,
    students: 100,
    duration: "2:00 hr",
    updatedDate:2025,
    description:
      "Gain hands-on skills in Python, data analysis, and visualisation while learning essential statistics and machine learning concepts.",
    image:
      "https://media.istockphoto.com/id/846276004/photo/attentive-students-with-teacher-in-the-classroom.jpg?s=612x612&w=0&k=20&c=QANjNKO1dYBiFLQlpx96u3M4Mk1JfwIdhbkwNlS6jwQ=",
    difficulty: "Intermediate",
    price: 59.99,
    originalPrice: 50,
    instructor: {
        title:"Mr.",
      name: "Ben",
       numbersofcourses:2,
      avatar:
        "https://media.istockphoto.com/id/2216529853/photo/smiling-teacher-standing-in-classroom-with-arms-crossed-by-whiteboard-with-math-equations.jpg?s=612x612&w=0&k=20&c=hZR_GYlOFDRC3LARGQnaniJRP6DoMKmQMOoaUBc96pQ=",
    },
    category: "Med",
    learningOutcomes: [
      "Analyse and clean large datasets using Python libraries.",
      "Apply statistical methods to extract insights from data.",
      "Build and evaluate basic machine learning models.",
      "Communicate findings with clear data visualisations.",
    ],
    curriculum: [
      {
        sectionTitle: "Introduction",
        lessons: [
          { id: 1, title: "Introduction to Data Science & Analytics", duration: "15 min" },
          { id: 2, title: "Python for Data Analysis", duration: "25 min" },
        ],
      },
      {
        sectionTitle: "Data Processing",
        lessons: [
          { id: 3, title: "Data Cleaning & Preprocessing", duration: "30 min" },
          { id: 4, title: "Exploratory Data Analysis", duration: "35 min" },
          { id: 5, title: "Statistics & Probability Basics", duration: "40 min" },
        ],
      },
      {
        sectionTitle: "Machine Learning",
        lessons: [
          { id: 6, title: "Data Visualisation (Matplotlib, Seaborn)", duration: "30 min" },
          { id: 7, title: "Introduction to Machine Learning", duration: "40 min" },
          { id: 8, title: "Capstone Data Analysis Project", duration: "50 min" },
        ],
      },
    ],
  },

  {
    id: 3,
    title: "Full-Stack Web Development",
    rating: 2.5,
    reviews: 100,
    students: 100,
    duration: "2:00 hr",
    updatedDate:2025,
    description:
      "Learn to design, build, and deploy dynamic websites using HTML, CSS, JavaScript, and modern frameworks for both front-end and back-end.",
    image:
      "https://media.istockphoto.com/id/1079577458/photo/rear-view-of-a-male-professor-teaching-his-students-at-computer-lab.jpg?s=612x612&w=0&k=20&c=0JKfVm4racezWLs2STIlfQDFAxHtERpvvB-EIrV0bww=",
    difficulty: "Beginner",
    price: 39.99,
    originalPrice: 50,
    instructor: {
         title:"Mr.",
      name: "Emmanuel",
       numbersofcourses:2,
      avatar:
        "https://media.istockphoto.com/id/1260700263/photo/handsome-young-man-looking-at-camera-and-smiling.jpg?s=612x612&w=0&k=20&c=onUJqYpV4rwImg-bKiLejxdPcC-VEQaQ-d8NyXokPyA=",
    },
    category: "tech",
    learningOutcomes: [
      "Build responsive, user-friendly web interfaces",
      "Create secure, scalable back-end applications",
      "Integrate APIs and databases into full-stack projects",
      "Deploy applications to cloud hosting platforms",
    ],
    curriculum: [
      {
        sectionTitle: "Frontend Development",
        lessons: [
          { id: 1, title: "HTML & CSS Fundamentals", duration: "20 min" },
          { id: 2, title: "JavaScript Basics & ES6+ Features", duration: "25 min" },
          { id: 3, title: "Front-End Frameworks (React)", duration: "30 min" },
        ],
      },
      {
        sectionTitle: "Backend Development",
        lessons: [
          { id: 4, title: "Server-Side Programming with Node.js", duration: "35 min" },
          { id: 5, title: "Database Management (MongoDB & SQL)", duration: "40 min" },
          { id: 6, title: "REST API Development", duration: "45 min" },
          { id: 7, title: "Authentication & Security", duration: "30 min" },
        ],
      },
      {
        sectionTitle: "Deployment",
        lessons: [
          { id: 8, title: "Cloud Deployment (Vercel/Heroku/AWS)", duration: "15 min" },
        ],
      },
    ],
  },
];

export const featuredCourses = [
  {
    id: 101,
    title: "Introduction to AI & Machine Learning",
    rating: 4.7,
    reviews: 220,
    students: 1500,
    duration: "3:30 hr",
    description: "Explore AI concepts, machine learning algorithms, and build intelligent applications.",
    image: "https://media.istockphoto.com/id/1234567890/photo/ai-concept.jpg?s=612x612&w=0&k=20&c=someimagehash=",
    difficulty: "Intermediate",
    price: 69.99,
    originalPrice: 90,
    instructor: {
      name: "Sophia",
      avatar: "https://media.istockphoto.com/id/987654321/photo/instructor.jpg?s=612x612&w=0&k=20&c=anotherhash=",
    },
    category: "tech",
    learningOutcomes: [
      "Understand AI fundamentals and types of machine learning",
      "Build and train models using Python libraries",
      "Evaluate model performance and improve accuracy",
      "Deploy AI models into real-world applications",
    ],
    curriculum: [
      {
        sectionTitle: "AI Basics",
        lessons: [
          { id: 1, title: "What is AI?", duration: "15 min" },
          { id: 2, title: "History and Evolution of AI", duration: "20 min" },
          { id: 3, title: "Types of Machine Learning", duration: "25 min" },
        ],
      },
      {
        sectionTitle: "Machine Learning Models",
        lessons: [
          { id: 4, title: "Supervised Learning", duration: "30 min" },
          { id: 5, title: "Unsupervised Learning", duration: "30 min" },
          { id: 6, title: "Neural Networks Basics", duration: "40 min" },
        ],
      },
      {
        sectionTitle: "Model Deployment",
        lessons: [
          { id: 7, title: "Model Evaluation Metrics", duration: "20 min" },
          { id: 8, title: "Deploying Models with Flask", duration: "35 min" },
          { id: 9, title: "Real World AI Applications", duration: "25 min" },
        ],
      },
    ],
  },
  {
    id: 102,
    title: "Cloud Computing with AWS",
    rating: 4.5,
    reviews: 180,
    students: 1200,
    duration: "4:00 hr",
    description:
      "Master AWS cloud services, infrastructure, and deployment techniques for scalable solutions.",
    image:
      "https://media.istockphoto.com/id/1234567891/photo/cloud-computing.jpg?s=612x612&w=0&k=20&c=hash123=",
    difficulty: "Advanced",
    price: 79.99,
    originalPrice: 100,
    instructor: {
      name: "Liam",
      avatar:
        "https://media.istockphoto.com/id/987654322/photo/instructor2.jpg?s=612x612&w=0&k=20&c=hash456=",
    },
    category: "tech",
    learningOutcomes: [
      "Understand AWS core services and infrastructure",
      "Design scalable cloud architectures",
      "Implement security best practices on AWS",
      "Deploy and monitor applications on AWS",
    ],
    curriculum: [
      {
        sectionTitle: "AWS Fundamentals",
        lessons: [
          { id: 1, title: "Introduction to Cloud Computing", duration: "20 min" },
          { id: 2, title: "AWS Core Services Overview", duration: "25 min" },
          { id: 3, title: "IAM and Security Basics", duration: "30 min" },
        ],
      },
      {
        sectionTitle: "Building on AWS",
        lessons: [
          { id: 4, title: "EC2 and Compute Services", duration: "35 min" },
          { id: 5, title: "S3 and Storage Solutions", duration: "30 min" },
          { id: 6, title: "Database Services (RDS, DynamoDB)", duration: "40 min" },
        ],
      },
      {
        sectionTitle: "Deployment & Management",
        lessons: [
          { id: 7, title: "CloudFormation & Infrastructure as Code", duration: "30 min" },
          { id: 8, title: "Monitoring & Scaling Applications", duration: "35 min" },
          { id: 9, title: "Cost Management & Optimization", duration: "20 min" },
        ],
      },
    ],
  },
];
export const testimonials = [
  {
    name: "Alice Johnson",
    role: "Software Engineer",
    rating: 4.5,
    feedback: "This course helped me land my dream job! The content was clear, engaging, and very practical.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    course: "Full-Stack Web Development"
  },
  {
    name: "Michael Smith",
    role: "Data Analyst",
    rating: 4.2,
    feedback: "Great explanations on complex topics. The hands-on projects were especially helpful to solidify my skills.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    course: "Data Science Fundamentals"
  },
  {
    name: "Sophia Lee",
    role: "Cybersecurity Specialist",
    rating: 3.4,
    feedback: "I feel confident tackling real security challenges thanks to this course. Highly recommend for beginners!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    course: "Cybersecurity Essentials"
  },
  {
    name: "Daniel Carter",
    role: "Frontend Developer",
    rating: 4.8,
    feedback: "The projects in this course gave me real-world experience. I could apply my skills immediately at work.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    course: "Advanced React & Next.js"
  },
  {
    name: "Emily Davis",
    role: "UX/UI Designer",
    rating: 4.6,
    feedback: "Loved the mix of theory and practice. The design principles I learned have transformed my workflow.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    course: "UX/UI Design Masterclass"
  },
  {
    name: "James Wilson",
    role: "Cloud Engineer",
    rating: 4.3,
    feedback: "A solid foundation in cloud computing. The AWS labs were especially useful.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    course: "Cloud Computing with AWS"
  },
  {
    name: "Olivia Martinez",
    role: "AI Researcher",
    rating: 4.9,
    feedback: "Incredible content! The AI projects pushed me to think critically and creatively.",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
    course: "Artificial Intelligence & Machine Learning"
  },
  {
    name: "Ryan Thompson",
    role: "Mobile App Developer",
    rating: 4.7,
    feedback: "Building real apps with Flutter was a game changer for my career. Highly practical course.",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    course: "Flutter & Dart Mobile Development"
  }
];
