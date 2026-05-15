export const courses = [
  {
    id: 1,
    title: "Cybersecurity Essentials",
    rating: 3.5,
    reviews: 100,
    students: 100,
    duration: "2:00 hr",
    updatedDate: 2025,
    description:
      "Understand security threats, ethical hacking, and defence strategies to protect networks, systems, and sensitive data.",
    image:
      "https://media.istockphoto.com/id/1599477394/photo/happy-university-professor-giving-a-presentation-to-group-of-students-in-lecture-hall.jpg?s=612x612&w=0&k=20&c=x-MTmA7yAjFOZyrCfsVwaCrzegloRr3OjPYXyoQN_iE=",
    difficulty: "Beginner",
    price: 49.99,
    originalPrice: 50,
    instructor: {
      title: "Mr.",
      name: "Williams",
      numbersofcourses: 2,
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
          {
            id: 2,
            title: "Types of Cyber Threats & Attacks",
            duration: "25 min",
          },
          { id: 3, title: "Network Security Basics", duration: "30 min" },
        ],
      },
      {
        sectionTitle: "Advanced Security Concepts",
        lessons: [
          { id: 4, title: "Cryptography Principles", duration: "30 min" },
          {
            id: 5,
            title: "Vulnerability Assessment & Penetration Testing",
            duration: "35 min",
          },
          { id: 6, title: "Ethical Hacking Practices", duration: "40 min" },
        ],
      },
      {
        sectionTitle: "Response & Compliance",
        lessons: [
          { id: 7, title: "Incident Response & Recovery", duration: "25 min" },
          {
            id: 8,
            title: "Security Best Practices & Compliance",
            duration: "20 min",
          },
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
    updatedDate: 2025,
    description:
      "Gain hands-on skills in Python, data analysis, and visualisation while learning essential statistics and machine learning concepts.",
    image:
      "https://media.istockphoto.com/id/846276004/photo/attentive-students-with-teacher-in-the-classroom.jpg?s=612x612&w=0&k=20&c=QANjNKO1dYBiFLQlpx96u3M4Mk1JfwIdhbkwNlS6jwQ=",
    difficulty: "Intermediate",
    price: 59.99,
    originalPrice: 50,
    instructor: {
      title: "Mr.",
      name: "Ben",
      numbersofcourses: 2,
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
          {
            id: 1,
            title: "Introduction to Data Science & Analytics",
            duration: "15 min",
          },
          { id: 2, title: "Python for Data Analysis", duration: "25 min" },
        ],
      },
      {
        sectionTitle: "Data Processing",
        lessons: [
          { id: 3, title: "Data Cleaning & Preprocessing", duration: "30 min" },
          { id: 4, title: "Exploratory Data Analysis", duration: "35 min" },
          {
            id: 5,
            title: "Statistics & Probability Basics",
            duration: "40 min",
          },
        ],
      },
      {
        sectionTitle: "Machine Learning",
        lessons: [
          {
            id: 6,
            title: "Data Visualisation (Matplotlib, Seaborn)",
            duration: "30 min",
          },
          {
            id: 7,
            title: "Introduction to Machine Learning",
            duration: "40 min",
          },
          {
            id: 8,
            title: "Capstone Data Analysis Project",
            duration: "50 min",
          },
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
    updatedDate: 2025,
    description:
      "Learn to design, build, and deploy dynamic websites using HTML, CSS, JavaScript, and modern frameworks for both front-end and back-end.",
    image:
      "https://media.istockphoto.com/id/1079577458/photo/rear-view-of-a-male-professor-teaching-his-students-at-computer-lab.jpg?s=612x612&w=0&k=20&c=0JKfVm4racezWLs2STIlfQDFAxHtERpvvB-EIrV0bww=",
    difficulty: "Beginner",
    price: 39.99,
    originalPrice: 50,
    instructor: {
      title: "Mr.",
      name: "Emmanuel",
      numbersofcourses: 2,
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
          {
            id: 2,
            title: "JavaScript Basics & ES6+ Features",
            duration: "25 min",
          },
          { id: 3, title: "Front-End Frameworks (React)", duration: "30 min" },
        ],
      },
      {
        sectionTitle: "Backend Development",
        lessons: [
          {
            id: 4,
            title: "Server-Side Programming with Node.js",
            duration: "35 min",
          },
          {
            id: 5,
            title: "Database Management (MongoDB & SQL)",
            duration: "40 min",
          },
          { id: 6, title: "REST API Development", duration: "45 min" },
          { id: 7, title: "Authentication & Security", duration: "30 min" },
        ],
      },
      {
        sectionTitle: "Deployment",
        lessons: [
          {
            id: 8,
            title: "Cloud Deployment (Vercel/Heroku/AWS)",
            duration: "15 min",
          },
        ],
      },
    ],
  },
];

export const director = [
  {
    name: "GOLAGHA OGHENEVWEDE REGINA",
    title: "CEO & Founder",
    bio: "Golagha Regina is a Molecular Biology and Microbial Genomics researcher and the founder of Genecraft Microbial Genomics Academy, an initiative dedicated to providing practical and accessible training in computational biology, microbial genomics, and data-driven biological research for students and young scientists across Nigeria.Her research interests focus on molecular microbiology, antimicrobial resistance, microbial genomics, and host–microbiota interactions. She has worked extensively on studies involving carbapenem-resistant Enterobacteriaceae, metallo-beta-lactamase-producing pathogens, and the characterization of clinically relevant microorganisms from clinical, environmental, and agricultural settings. Her work also explores the relationship between gut microbial imbalance and human health, particularly the role of the gut–liver axis in chronic inflammation, neuropsychiatric conditions, and disease progression.Regina holds a B.Sc. in Microbiology from Delta State University, Abraka, and an M.Sc. from the Federal University of Agriculture, Abeokuta, where her research focused on molecular and microbiological approaches to understanding infectious diseases and antimicrobial resistance patterns. Her expertise combines laboratory microbiology with genomic and computational approaches to address emerging challenges in public health and translational research. Through Genecraft Microbial Genomics Academy, she is passionate about equipping the next generation of scientists with hands-on skills in bioinformatics, microbial genomics, and modern biological data analysis. Her work is driven by a commitment to advancing scientific capacity, improving research accessibility, and fostering innovation in microbial and health sciences across Africa.",
    image:
      "https://res.cloudinary.com/ddquednvr/image/upload/v1755359446/CEO.png",
    linkedin: "#",
  }

];
export const Collaborators = [
  {
    name: "Oluwamuyiwa Agbi ",
    description: "Mayowa Agbi is a Nigerian bioinformatician, computational scientist, and researcher specializing in cancer genomics, artificial intelligence, computational biology, and in-silico pharmacology. He currently works as a Bioinformatician at The GeneLab Bioscience, where he develops advanced clinical oncology pipelines for leukemia classification, pharmacogenomics, and cancer risk prediction using Oxford Nanopore Technologies (ONT).He has over five years of multidisciplinary experience combining biological sciences, engineering, and computer programming. His expertise includes Genome-Wide Association Studies (GWAS), machine learning, high-throughput genomic analysis, and programming with Python, R, Linux/Bash, Arduino, and C++. Mayowa’s research interests focus on precision medicine, cancer genomics, plant genomics, and infectious diseases. During his M.Sc. in Bioinformatics at Covenant University, he designed a Deep Neural Network (DNN) model for Compound-Protein Interaction (CPI) prediction related to prostate cancer biomarkers. He also holds a B.Sc. in Microbiology from Adekunle Ajasin University.Beyond research, he has experience in engineering and innovation, including the development of a biosensor-based immunosensor for tuberculosis detection and the design of a 112 kW solar farm system. He is also recognized as a tutor and mentor in Computer-Aided Drug Design (CADD), having guided researchers and professors in the field.",
    image:
      "https://res.cloudinary.com/ddquednvr/image/upload/v1761497086/gene_craft_002_wklpij.jpg",
  },
  {
    name: "Samuel Bahago ",
    description: "Samuel Bahago is a GIS Analyst at MECON Services Ltd. with over four years of experience in geospatial analysis, environmental management, and watershed planning. He specializes in GIS mapping, satellite imagery analysis, and the development of geospatial visualizations for environmental and infrastructure projects.He is proficient in the use of geoscience software such as ArcGIS, Rockworks, Oasis Montaj, and Surfer, with expertise in flood risk studies, topographic and geologic mapping, and spatial data analysis from satellite sources including Landsat, SRTM, and ASTER imagery.",
    image:
      "https://res.cloudinary.com/ddquednvr/image/upload/v1777543764/IMG-20251025-WA0063_gyojyo.jpg",
  
  },
  {
    name: "Temitayo Ogundimu ",
    description: "Temitayo Ogundimu is a Bioinformatician. He bagged his MSc in Bioinformatics from Covenant University Ota Nigeria.",
    image:
      "https://res.cloudinary.com/ddquednvr/image/upload/v1761497050/Gene_craft_00_cxlsc2.jpg",
  
  }
 
];

export const partners = [
  {
    logo: "https://res.cloudinary.com/ddquednvr/image/upload/v1755360050/part1_kzodit.png",
    name: "TOPLAHOLO BIOGEN",
  },
  {
    logo: "https://res.cloudinary.com/ddquednvr/image/upload/v1755360044/part2_uddh48.png",
    name: "LECTURE HUB",
  },
  // Add more partners as needed
];
export const featuredCourses = [
  {
    id: 101,
    title: "Introduction to AI & Machine Learning",
    rating: 4.7,
    reviews: 220,
    students: 1500,
    duration: "3:30 hr",
    description:
      "Explore AI concepts, machine learning algorithms, and build intelligent applications.",
    image:
      "https://media.istockphoto.com/id/1234567890/photo/ai-concept.jpg?s=612x612&w=0&k=20&c=someimagehash=",
    difficulty: "Intermediate",
    price: 69.99,
    originalPrice: 90,
    instructor: {
      name: "Sophia",
      avatar:
        "https://media.istockphoto.com/id/987654321/photo/instructor.jpg?s=612x612&w=0&k=20&c=anotherhash=",
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
          {
            id: 1,
            title: "Introduction to Cloud Computing",
            duration: "20 min",
          },
          { id: 2, title: "AWS Core Services Overview", duration: "25 min" },
          { id: 3, title: "IAM and Security Basics", duration: "30 min" },
        ],
      },
      {
        sectionTitle: "Building on AWS",
        lessons: [
          { id: 4, title: "EC2 and Compute Services", duration: "35 min" },
          { id: 5, title: "S3 and Storage Solutions", duration: "30 min" },
          {
            id: 6,
            title: "Database Services (RDS, DynamoDB)",
            duration: "40 min",
          },
        ],
      },
      {
        sectionTitle: "Deployment & Management",
        lessons: [
          {
            id: 7,
            title: "CloudFormation & Infrastructure as Code",
            duration: "30 min",
          },
          {
            id: 8,
            title: "Monitoring & Scaling Applications",
            duration: "35 min",
          },
          {
            id: 9,
            title: "Cost Management & Optimization",
            duration: "20 min",
          },
        ],
      },
    ],
  },
];
export const testimonials = [
  {
    name: "Aisha Eniola Olayiwola",
    role: "Student",
    rating: 4.5,
    feedback:
      "Participating in the Hands-on Training in Microbial Genomics Data Analysis was a pivotal experience, providing practical skills in genomic databases, sequence assembly, annotation, comparative genomics, and phylogenetic analysis. The drug design module broadened understanding of bioinformatics in therapeutic discovery, while mentorship and scientific writing training enhanced research communication. Overall, the programme built both competence and confidence to contribute meaningfully to microbial genomics and related fields.",
    avatar:
      "https://res.cloudinary.com/ddquednvr/image/upload/v1758524124/Img1.jpg",
    course: "Microbial Genomics",
  },
  {
    name: "Michael Smith",
    role: "Student",
    rating: 4.2,
    feedback:
      "This training was a great experience, as I gained practical skills in key areas such as Fundamentals of Microbial Genomics and Molecular Techniques, Comparative Genomics and Phylogenetics, and Functional Genomics and RNA Sequence Analysis. It also sharpened my ability to effectively work with bioinformatics tools.",
    avatar:
      "https://res.cloudinary.com/ddquednvr/image/upload/v1758524125/Img2.jpg",
    course: "Microbial Genomics",
  },
  {
    name: "Princess Ijeoma",
    role: "Student",
    rating: 3.4,
    feedback:
      "My time at Gene Craft Microbial Academy was truly transformative. Over five months, I gained hands-on experience in microbial genomics, molecular techniques, functional and comparative genomics, and computer-aided drug design. What made the journey special was the supportive mentors and collaborative projects that turned learning into an inspiring experience. I am truly grateful to the organizers, facilitators and partners of the academy 😇🙏",
    avatar:
      "    https://res.cloudinary.com/ddquednvr/image/upload/v1758524124/Img3.jpg",
    course: "Microbial Genomics",
  },
  {
    name: "Abubakar Lawal Shehu ",
    role: "Student",
    rating: 4.8,
    feedback:
      "This program transformed my approach to microbial research, equipping me with practical knowledge, innovative tools, and a renewed passion for scientific discovery.",
    avatar:
      " https://res.cloudinary.com/ddquednvr/image/upload/v1758524125/Img4.jpg",
    course: "Microbial Genomics",
  },
  {
    name: "Emily Davis",
    role: "Student",
    rating: 4.6,
    feedback:
      "The past five months have been enriching, and it's all thanks to the Gene Craft Academy.Beyond expanding my theoretical knowledge as a microbiologist, I’ve gained hands-on experience with computational tools used in drug testing and learned how to leverage technology to design innovative medical interventions.This wasn’t just a training program for me, it was true empowerment!",
    avatar:
      "https://res.cloudinary.com/ddquednvr/image/upload/v1758524125/Img5.jpg",
    course: "Microbial Genomics",
  },
  {
    name: "Abdulrahman Olamilekan Raji",
    role: "Student",
    rating: 4.3,
    feedback:
      "My five-month internship at Genecraft Academy was a truly transformative experience, offering a judicious blend of rigorous hands-on training and incisive theoretical sessions. The program’s emphasis on computer-aided drug discovery and bioinformatics techniques, supported by exceptional mentorship and structured resources, rendered complex concepts both lucid and intellectually stimulating. This immersive experience has fortified my technical acumen and deepened my passion for computational drug discovery, positioning me for excellence in future academic and research endeavors.",
    avatar:
      "https://res.cloudinary.com/ddquednvr/image/upload/v1758524125/Img6.jpg",
    course: "Microbial Genomics",
  },
  {
    name: "Olivia Martinez",
    role: "Student",
    rating: 4.9,
    feedback:
      "Through the Gene Craft Academy's mentorship program, I have significantly upgraded my bioinformatics skills. During my internship, I gained hands-on experience in network pharmacology, including ligand prediction and protein-protein interaction analysis using Cytoscape. Additionally, I utilized Galaxy software for genomic annotation and functional gene analysis, further expanding my skills in computer-aided drug design. This opportunity not only enhanced my knowledge but also enabled me to conceptualize manuscripts on in silico studies and bioinformatics analysis. Working alongside young researchers, I have learned, unlearned, and relearned, fostering growth and collaboration. I appreciate the mentorship provided by Gene Craft Academy, a hub for knowledge in genetic studies using computational techniques.",
    avatar:
      "https://res.cloudinary.com/ddquednvr/image/upload/v1758524125/Img7.jpg",
    course: "Microbial Genomics",
  },
  {
    name: "Ryan Thompson",
    role: "Student",
    rating: 4.7,
    feedback:
      "Gene Craft taught me a lot about in-silico analysis, and the hands-on project was my favorite part. The training was practical, engaging, and gave me real skills I can apply in my research. I’m truly grateful for the experience.",
    avatar:
      "https://res.cloudinary.com/ddquednvr/image/upload/v1758524126/Img8.jpg",
    course: "Microbial Genomics",
  },
];

export const social = [
  {
    name: "facebook",
    link: "https://www.facebook.com/share/1SyyU9BtRa/?mibextid=qi2Omg",
    img:"/icons/icons8-facebook-logo.svg"
  },
  {
    name: "linkedin",
    link: "https://www.linkedin.com/company/gene-craft/",
    img:"/icons/icons8-linkedin.svg"
  },
  {
    name: "youtube",
    link: "https://www.youtube.com/@Genecraft-MA",
    img:"/icons/youtube.png"
  },
  
];
