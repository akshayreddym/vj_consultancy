import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProjectsList from '../../components/ApplicationManagement/ProjectsList/ProjectsList';
import ApplicantsList from '../../components/ApplicationManagement/ApplicantsList/ApplicantsList';
import ApplicationReview from '../../components/ApplicationManagement/ApplicationReview/ApplicationReview';
import './ApplicationManagement.css';

// Rich Mock Data with 6 Projects and 4-5 Applicants each (Total ~28 applicants)
const initialProjects = [
  {
    id: 'proj-1',
    name: 'AI-Powered Customer Support Chatbot',
    domain: 'Artificial Intelligence',
    deadline: 'July 15, 2026',
    status: 'Active',
    applicants: [
      {
        id: 'app-1-1',
        status: 'Applied',
        appliedOn: 'June 25, 2026',
        shortlistedOn: null,
        preferredRole: 'AI Engineer Intern',
        coverLetter: 'I am highly passionate about NLP and LLMs. I have built three projects using OpenAI APIs and LangChain, and I want to apply my expertise to improve response times and workflow efficiency in customer support. I would love to work on this consultancy assignment for VJ.',
        experience: '• Developed a custom search chatbot for a college library database handling 100+ queries/day.\n• Freelanced as a Web Developer creating modern landing pages with React and TailwindCSS.\n• Academic project on sentiment analysis using BERT with 92% accuracy.',
        profile: {
          name: 'Aditya Deshmukh',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
          branch: 'Computer Engineering',
          year: '4th Year',
          email: 'aditya.d@vjti.ac.in',
          phone: '+91 98200 12345',
          location: 'Mumbai, Maharashtra',
          skills: ['Python', 'React', 'LangChain', 'OpenAI API', 'FastAPI'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Computer Engineering',
          year: '4th Year',
          cgpa: '9.4',
          links: {
            github: 'https://github.com/adityadeshmukh',
            linkedin: 'https://linkedin.com/in/adityadeshmukh',
            portfolio: 'https://aditya.dev'
          }
        },
        portfolio: {
          github: 'https://github.com/adityadeshmukh',
          linkedin: 'https://linkedin.com/in/adityadeshmukh',
          portfolio: 'https://aditya.dev'
        }
      },
      {
        id: 'app-1-2',
        status: 'Shortlisted',
        appliedOn: 'June 24, 2026',
        shortlistedOn: 'June 28, 2026',
        preferredRole: 'Full-Stack Developer',
        coverLetter: 'I possess strong skills in building frontend interfaces with React and backend services with Node.js/Express. I have worked on deploying containers using Docker, which I believe is useful for packaging this chatbot project.',
        experience: '• Completed a 3-month internship at StartupTech as a Backend Engineer working with Node.js and Redis.\n• Built and deployed a real-time collaborative whiteboarding web app with Socket.io.',
        profile: {
          name: 'Rohan Mehta',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
          branch: 'Information Technology',
          year: '3rd Year',
          email: 'rohan.mehta@vjti.ac.in',
          phone: '+91 98199 87654',
          location: 'Thane, Maharashtra',
          skills: ['JavaScript', 'Node.js', 'Express', 'React', 'Docker'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Information Technology',
          year: '3rd Year',
          cgpa: '8.9',
          links: {
            github: 'https://github.com/rohanmehta',
            linkedin: 'https://linkedin.com/in/rohanmehta',
            portfolio: 'https://rohanm.net'
          }
        },
        portfolio: {
          github: 'https://github.com/rohanmehta',
          linkedin: 'https://linkedin.com/in/rohanmehta',
          portfolio: 'https://rohanm.net'
        }
      },
      {
        id: 'app-1-3',
        status: 'Applied',
        appliedOn: 'June 26, 2026',
        shortlistedOn: null,
        preferredRole: 'AI Research Assistant',
        coverLetter: 'Having written a research paper on conversational agents under Dr. Patil, I want to bridge the gap between academic theories and practical chatbot design. This platform represents a great opportunity to explore commercial AI implementations.',
        experience: '• Published a paper on "Transformer Models for Vernacular Languages" in a local journal.\n• Created a prototype voice assistant using Python and PyTorch.',
        profile: {
          name: 'Shruti Kamble',
          photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
          branch: 'Computer Engineering',
          year: '4th Year',
          email: 'shruti.k@vjti.ac.in',
          phone: '+91 98333 44556',
          location: 'Pune, Maharashtra',
          skills: ['PyTorch', 'Transformers', 'Python', 'NLTK', 'Git'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Computer Engineering',
          year: '4th Year',
          cgpa: '9.6',
          links: {
            github: 'https://github.com/shrutikamble',
            linkedin: 'https://linkedin.com/in/shrutikamble',
            portfolio: 'https://shruti.ai'
          }
        },
        portfolio: {
          github: 'https://github.com/shrutikamble',
          linkedin: 'https://linkedin.com/in/shrutikamble',
          portfolio: 'https://shruti.ai'
        }
      },
      {
        id: 'app-1-4',
        status: 'Rejected',
        appliedOn: 'June 22, 2026',
        shortlistedOn: null,
        preferredRole: 'Frontend Developer',
        coverLetter: 'I am a frontend enthusiast and I want to design the admin panel interface for the chatbot analytics. I have minor experience in backend node server setup, but my core expertise is CSS and component design.',
        experience: '• Built responsive landing pages for local college festivals.\n• UI redesign project for a dental clinic website.',
        profile: {
          name: 'Siddharth Shah',
          photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop',
          branch: 'Electronics Engineering',
          year: '4th Year',
          email: 'siddharth.s@vjti.ac.in',
          phone: '+91 91672 33445',
          location: 'Mumbai, Maharashtra',
          skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Figma'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Electronics Engineering',
          year: '4th Year',
          cgpa: '7.8',
          links: {
            github: 'https://github.com/siddharths',
            linkedin: 'https://linkedin.com/in/siddharths',
            portfolio: 'https://sids.design'
          }
        },
        portfolio: {
          github: 'https://github.com/siddharths',
          linkedin: 'https://linkedin.com/in/siddharths',
          portfolio: 'https://sids.design'
        }
      },
      {
        id: 'app-1-5',
        status: 'Applied',
        appliedOn: 'June 27, 2026',
        shortlistedOn: null,
        preferredRole: 'Machine Learning Developer',
        coverLetter: 'I would like to apply my skills in training and fine-tuning custom LLM models for specific domain knowledge. I have a strong statistics background and know how to clean training corpora.',
        experience: '• Analyzed massive datasets for a retail client, predicting customer churn rate using XGBoost.\n• Contributed to open-source python packages in data processing.',
        profile: {
          name: 'Pranav Joshi',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
          branch: 'Computer Engineering',
          year: '3rd Year',
          email: 'pranav.j@vjti.ac.in',
          phone: '+91 99308 11223',
          location: 'Navi Mumbai, Maharashtra',
          skills: ['Python', 'SQL', 'Scikit-Learn', 'Pandas', 'NLP'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Computer Engineering',
          year: '3rd Year',
          cgpa: '8.7',
          links: {
            github: 'https://github.com/pranavj',
            linkedin: 'https://linkedin.com/in/pranavj',
            portfolio: 'https://pranavjoshi.com'
          }
        },
        portfolio: {
          github: 'https://github.com/pranavj',
          linkedin: 'https://linkedin.com/in/pranavj',
          portfolio: 'https://pranavjoshi.com'
        }
      }
    ]
  },
  {
    id: 'proj-2',
    name: 'Blockchain-Based Supply Chain Tracker',
    domain: 'Blockchain',
    deadline: 'August 1, 2026',
    status: 'Active',
    applicants: [
      {
        id: 'app-2-1',
        status: 'Applied',
        appliedOn: 'June 28, 2026',
        shortlistedOn: null,
        preferredRole: 'Smart Contract Engineer',
        coverLetter: 'I have written ERC20 and ERC721 contracts in Solidity. I understand cryptographic protocols, gas optimizations, and multi-signature transactions, making me the perfect candidate for tracking inventory on-chain.',
        experience: '• Audit assistant for a minor DeFi protocol, resolving two critical reentrancy vulnerabilities.\n• Developed a decentralized voting mechanism for student elections.',
        profile: {
          name: 'Ananya Iyer',
          photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
          branch: 'Information Technology',
          year: '4th Year',
          email: 'ananya.i@vjti.ac.in',
          phone: '+91 97690 99887',
          location: 'Mumbai, Maharashtra',
          skills: ['Solidity', 'Web3.js', 'Ether.js', 'Hardhat', 'React'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Information Technology',
          year: '4th Year',
          cgpa: '9.1',
          links: {
            github: 'https://github.com/ananyaiyer',
            linkedin: 'https://linkedin.com/in/ananyaiyer',
            portfolio: 'https://ananya.blockchain'
          }
        },
        portfolio: {
          github: 'https://github.com/ananyaiyer',
          linkedin: 'https://linkedin.com/in/ananyaiyer',
          portfolio: 'https://ananya.blockchain'
        }
      },
      {
        id: 'app-2-2',
        status: 'Shortlisted',
        appliedOn: 'June 26, 2026',
        shortlistedOn: 'June 29, 2026',
        preferredRole: 'Backend Developer',
        coverLetter: 'I can build reliable REST APIs using Go and PostgreSQL to handle off-chain metadata. I am highly interested in Hyperledger Fabric and permissioned blockchain models.',
        experience: '• Created a distributed file sharing registry using Go channels and RPC communication.\n• 2-month internship as database admin, tuning indexing protocols.',
        profile: {
          name: 'Vikram Rao',
          photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop',
          branch: 'Computer Engineering',
          year: '3rd Year',
          email: 'vikram.r@vjti.ac.in',
          phone: '+91 99201 22334',
          location: 'Kalyan, Maharashtra',
          skills: ['Go', 'PostgreSQL', 'Docker', 'Redis', 'Node.js'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Computer Engineering',
          year: '3rd Year',
          cgpa: '8.8',
          links: {
            github: 'https://github.com/vikramrao',
            linkedin: 'https://linkedin.com/in/vikramrao',
            portfolio: 'https://vikram.codes'
          }
        },
        portfolio: {
          github: 'https://github.com/vikramrao',
          linkedin: 'https://linkedin.com/in/vikramrao',
          portfolio: 'https://vikram.codes'
        }
      },
      {
        id: 'app-2-3',
        status: 'Applied',
        appliedOn: 'June 29, 2026',
        shortlistedOn: null,
        preferredRole: 'Smart Contract Auditor',
        coverLetter: 'Security is paramount for blockchain tracking. I am skilled in using automated tools like Mythril and Slither to detect common vulnerabilities before deployment.',
        experience: '• Solved 50+ blockchain hacking challenges on Capture-The-Ether and Ethernaut.\n• Built local blockchain explorer for test networks.',
        profile: {
          name: 'Nikhil Kulkarni',
          photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop',
          branch: 'Information Technology',
          year: '4th Year',
          email: 'nikhil.k@vjti.ac.in',
          phone: '+91 96191 55667',
          location: 'Mumbai, Maharashtra',
          skills: ['Solidity', 'Mythril', 'Slither', 'Python', 'Web3.js'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Information Technology',
          year: '4th Year',
          cgpa: '8.4',
          links: {
            github: 'https://github.com/nikhilk',
            linkedin: 'https://linkedin.com/in/nikhilk',
            portfolio: 'https://nikhilk.dev'
          }
        },
        portfolio: {
          github: 'https://github.com/nikhilk',
          linkedin: 'https://linkedin.com/in/nikhilk',
          portfolio: 'https://nikhilk.dev'
        }
      },
      {
        id: 'app-2-4',
        status: 'Applied',
        appliedOn: 'June 27, 2026',
        shortlistedOn: null,
        preferredRole: 'UI Developer',
        coverLetter: 'I will design a beautiful, real-time map visualizer tracking the shipment flow using React-Leaflet and Tailwind. I want to make complex ledger information accessible to non-technical operators.',
        experience: '• Developed a custom shipping route planning UI for a hackathon project.\n• Expert in Figma prototyping and responsive web design.',
        profile: {
          name: 'Riya Sen',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
          branch: 'Production Engineering',
          year: '4th Year',
          email: 'riya.s@vjti.ac.in',
          phone: '+91 98701 44556',
          location: 'Mumbai, Maharashtra',
          skills: ['Figma', 'React', 'TailwindCSS', 'JavaScript', 'Leaflet'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Production Engineering',
          year: '4th Year',
          cgpa: '8.3',
          links: {
            github: 'https://github.com/riyasen',
            linkedin: 'https://linkedin.com/in/riyasen',
            portfolio: 'https://riyasen.design'
          }
        },
        portfolio: {
          github: 'https://github.com/riyasen',
          linkedin: 'https://linkedin.com/in/riyasen',
          portfolio: 'https://riyasen.design'
        }
      }
    ]
  },
  {
    id: 'proj-3',
    name: 'IoT Smart Agriculture System',
    domain: 'Internet of Things',
    deadline: 'July 30, 2026',
    status: 'Active',
    applicants: [
      {
        id: 'app-3-1',
        status: 'Applied',
        appliedOn: 'June 28, 2026',
        shortlistedOn: null,
        preferredRole: 'Embedded Firmware Developer',
        coverLetter: 'I have extensive experience working with ESP32 microcontrollers and Arduino frameworks. I can write low-power scripts to measure soil moisture and transmit data using LoRaWAN.',
        experience: '• Built a home automation system with voice control using Raspberry Pi.\n• Calibrated soil NPK sensors for a local college lab setup.',
        profile: {
          name: 'Karan Patil',
          photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
          branch: 'Electronics Engineering',
          year: '4th Year',
          email: 'karan.patil@vjti.ac.in',
          phone: '+91 98211 44556',
          location: 'Dombivli, Maharashtra',
          skills: ['C++', 'Arduino', 'ESP32', 'LoRaWAN', 'Raspberry Pi'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Electronics Engineering',
          year: '4th Year',
          cgpa: '8.6',
          links: {
            github: 'https://github.com/karanpatil',
            linkedin: 'https://linkedin.com/in/karanpatil',
            portfolio: 'https://karanpatil.dev'
          }
        },
        portfolio: {
          github: 'https://github.com/karanpatil',
          linkedin: 'https://linkedin.com/in/karanpatil',
          portfolio: 'https://karanpatil.dev'
        }
      },
      {
        id: 'app-3-2',
        status: 'Applied',
        appliedOn: 'June 27, 2026',
        shortlistedOn: null,
        preferredRole: 'IoT Architect',
        coverLetter: 'I will handle the message broker architecture using MQTT and Node-RED. I am experienced in structuring payload topics to handle thousands of concurrent sensor messages.',
        experience: '• Implemented an MQTT-based telemetry broker for VJTI Racing team car telemetry.\n• Integrated InfluxDB for time-series sensor logs with Grafana analytics dashboard.',
        profile: {
          name: 'Neha Deshpande',
          photo: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop',
          branch: 'Electrical Engineering',
          year: '4th Year',
          email: 'neha.d@vjti.ac.in',
          phone: '+91 99670 12345',
          location: 'Mumbai, Maharashtra',
          skills: ['MQTT', 'Node-RED', 'InfluxDB', 'Grafana', 'Python'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Electrical Engineering',
          year: '4th Year',
          cgpa: '9.0',
          links: {
            github: 'https://github.com/nehadeshpande',
            linkedin: 'https://linkedin.com/in/nehadeshpande',
            portfolio: 'https://nehad.tech'
          }
        },
        portfolio: {
          github: 'https://github.com/nehadeshpande',
          linkedin: 'https://linkedin.com/in/nehadeshpande',
          portfolio: 'https://nehad.tech'
        }
      },
      {
        id: 'app-3-3',
        status: 'Shortlisted',
        appliedOn: 'June 25, 2026',
        shortlistedOn: 'June 29, 2026',
        preferredRole: 'Frontend Developer',
        coverLetter: 'I want to build the dashboard which displays real-time updates of field moisture, temperature, and pump status using Chart.js and React.',
        experience: '• Created an interactive dashboard for monitoring power usage of a battery system.\n• Strong familiarity with websockets and real-time state synchronization.',
        profile: {
          name: 'Aniket Gupta',
          photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop',
          branch: 'Information Technology',
          year: '3rd Year',
          email: 'aniket.g@vjti.ac.in',
          phone: '+91 91670 99887',
          location: 'Mumbai, Maharashtra',
          skills: ['React', 'JavaScript', 'TailwindCSS', 'WebSockets', 'Chart.js'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Information Technology',
          year: '3rd Year',
          cgpa: '8.5',
          links: {
            github: 'https://github.com/aniketg',
            linkedin: 'https://linkedin.com/in/aniketg',
            portfolio: 'https://aniketg.dev'
          }
        },
        portfolio: {
          github: 'https://github.com/aniketg',
          linkedin: 'https://linkedin.com/in/aniketg',
          portfolio: 'https://aniketg.dev'
        }
      }
    ]
  },
  {
    id: 'proj-4',
    name: 'Mental Health Companion Mobile App',
    domain: 'UI/UX & Mobile Dev',
    deadline: 'July 25, 2026',
    status: 'Active',
    applicants: [
      {
        id: 'app-4-1',
        status: 'Applied',
        appliedOn: 'June 29, 2026',
        shortlistedOn: null,
        preferredRole: 'UI/UX Designer',
        coverLetter: 'I want to build a soothing user experience with custom icons, comforting color palettes, and accessible navigation. I have built a design system specifically for wellness apps.',
        experience: '• Designed high-fidelity prototypes in Figma for a meditation mobile application.\n• Conducted user research interviews with 15 students to draft user journey flows.',
        profile: {
          name: 'Divya Sharma',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
          branch: 'Information Technology',
          year: '4th Year',
          email: 'divya.s@vjti.ac.in',
          phone: '+91 99300 22334',
          location: 'Mumbai, Maharashtra',
          skills: ['Figma', 'UI Design', 'User Research', 'Prototyping', 'Adobe XD'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Information Technology',
          year: '4th Year',
          cgpa: '9.3',
          links: {
            github: 'https://github.com/divyasharma',
            linkedin: 'https://linkedin.com/in/divyasharma',
            portfolio: 'https://divya.dribbble'
          }
        },
        portfolio: {
          github: 'https://github.com/divyasharma',
          linkedin: 'https://linkedin.com/in/divyasharma',
          portfolio: 'https://divya.dribbble'
        }
      },
      {
        id: 'app-4-2',
        status: 'Shortlisted',
        appliedOn: 'June 27, 2026',
        shortlistedOn: 'June 30, 2026',
        preferredRole: 'React Native Developer',
        coverLetter: 'I am proficient in React Native, Expo, and Reanimated. I can translate Figma designs into pixel-perfect components with smooth transitions, ensuring high engagement.',
        experience: '• Built a mood tracker app with local notification prompts that reached 500 active users on Play Store.\n• Integrated Firebase Authentication and Firestore data layers.',
        profile: {
          name: 'Rahul Verma',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
          branch: 'Computer Engineering',
          year: '4th Year',
          email: 'rahul.v@vjti.ac.in',
          phone: '+91 98112 44556',
          location: 'Mumbai, Maharashtra',
          skills: ['React Native', 'Expo', 'Reanimated', 'Firebase', 'TypeScript'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Computer Engineering',
          year: '4th Year',
          cgpa: '9.0',
          links: {
            github: 'https://github.com/rahulverma',
            linkedin: 'https://linkedin.com/in/rahulverma',
            portfolio: 'https://rahulverma.dev'
          }
        },
        portfolio: {
          github: 'https://github.com/rahulverma',
          linkedin: 'https://linkedin.com/in/rahulverma',
          portfolio: 'https://rahulverma.dev'
        }
      }
    ]
  },
  {
    id: 'proj-5',
    name: 'E-Commerce Analytics Platform',
    domain: 'Data Science',
    deadline: 'August 10, 2026',
    status: 'Active',
    applicants: [
      {
        id: 'app-5-1',
        status: 'Applied',
        appliedOn: 'June 30, 2026',
        shortlistedOn: null,
        preferredRole: 'Data Analyst Intern',
        coverLetter: 'I am highly proficient in writing complex SQL queries and visualizing retail sales funnels in Tableau. I can help aggregate raw transaction data into daily metrics tables.',
        experience: '• Analyzed VJTI canteen sales logs to optimize food ordering patterns.\n• Developed interactive dashboards with Tableau during a university analytics course.',
        profile: {
          name: 'Mayur Joshi',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
          branch: 'Information Technology',
          year: '4th Year',
          email: 'mayur.j@vjti.ac.in',
          phone: '+91 98111 22334',
          location: 'Mumbai, Maharashtra',
          skills: ['SQL', 'Tableau', 'Excel', 'Python', 'Stats'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Information Technology',
          year: '4th Year',
          cgpa: '8.9',
          links: {
            github: 'https://github.com/mayurjoshi',
            linkedin: 'https://linkedin.com/in/mayurjoshi',
            portfolio: 'https://mayurj.analytica'
          }
        },
        portfolio: {
          github: 'https://github.com/mayurjoshi',
          linkedin: 'https://linkedin.com/in/mayurjoshi',
          portfolio: 'https://mayurj.analytica'
        }
      },
      {
        id: 'app-5-2',
        status: 'Shortlisted',
        appliedOn: 'June 29, 2026',
        shortlistedOn: 'June 30, 2026',
        preferredRole: 'Data Engineer',
        coverLetter: 'I specialize in setting up data pipelines using Apache Spark and Kafka. I can construct robust ETL scripts that process transactional message feeds efficiently.',
        experience: '• Created an automated data pipeline using PySpark that scraped, cleaned, and stored rental housing listings.\n• Setup PostgreSQL connection pools with Redis caching.',
        profile: {
          name: 'Sameer Patel',
          photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop',
          branch: 'Computer Engineering',
          year: '4th Year',
          email: 'sameer.p@vjti.ac.in',
          phone: '+91 99223 44556',
          location: 'Mumbai, Maharashtra',
          skills: ['Apache Spark', 'Kafka', 'Python', 'SQL', 'PostgreSQL'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Computer Engineering',
          year: '4th Year',
          cgpa: '9.2',
          links: {
            github: 'https://github.com/sameerpatel',
            linkedin: 'https://linkedin.com/in/sameerpatel',
            portfolio: 'https://sameerp.dev'
          }
        },
        portfolio: {
          github: 'https://github.com/sameerpatel',
          linkedin: 'https://linkedin.com/in/sameerpatel',
          portfolio: 'https://sameerp.dev'
        }
      }
    ]
  },
  {
    id: 'proj-6',
    name: 'Cloud-Native Kubernetes Operator',
    domain: 'DevOps / Cloud',
    deadline: 'July 20, 2026',
    status: 'Closed',
    applicants: [
      {
        id: 'app-6-1',
        status: 'Shortlisted',
        appliedOn: 'June 23, 2026',
        shortlistedOn: 'June 25, 2026',
        preferredRole: 'DevOps Intern',
        coverLetter: 'I am Certified Kubernetes Administrator (CKA). I have written custom controllers in Go using client-go libraries and understand the reconciliation loop logic.',
        experience: '• Automating cloud deployment pipelines for a student app using GitHub Actions and Helm.\n• Managing a 3-node bare metal Kubernetes cluster in the department lab.',
        profile: {
          name: 'Amitesh Kumar',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
          branch: 'Computer Engineering',
          year: '4th Year',
          email: 'amitesh.k@vjti.ac.in',
          phone: '+91 98208 12345',
          location: 'Mumbai, Maharashtra',
          skills: ['Kubernetes', 'Go', 'Docker', 'Helm', 'CI/CD'],
          resumeUrl: '#'
        },
        academic: {
          college: 'Veermata Jijabai Technological Institute (VJTI)',
          branch: 'Computer Engineering',
          year: '4th Year',
          cgpa: '9.5',
          links: {
            github: 'https://github.com/amiteshk',
            linkedin: 'https://linkedin.com/in/amiteshk',
            portfolio: 'https://amiteshk.cloud'
          }
        },
        portfolio: {
          github: 'https://github.com/amiteshk',
          linkedin: 'https://linkedin.com/in/amiteshk',
          portfolio: 'https://amiteshk.cloud'
        }
      }
    ]
  }
];

export default function ApplicationManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState(initialProjects);
  const [view, setView] = useState('projects'); // 'projects' | 'applicants' | 'review'
  
  // Selected IDs for nested views
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  
  // Search state managed independently to prevent collision between views
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [applicantSearchQuery, setApplicantSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Sidebar Controls
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Navigation handlers
  const handleViewApplicants = (projectId) => {
    setSelectedProjectId(projectId);
    setApplicantSearchQuery(''); // Reset search in project when entering
    setStatusFilter('All'); // Reset status filters
    setView('applicants');
  };

  const handleViewDetails = (applicantId) => {
    setSelectedApplicantId(applicantId);
    setView('review');
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    setView('projects');
  };

  const handleBackToApplicants = () => {
    setSelectedApplicantId(null);
    setView('applicants');
  };

  // State mutation handlers (Solid local state management)
  const handleShortlistApplicant = (projectId, applicantId) => {
    setProjects(prevProjects => 
      prevProjects.map(proj => {
        if (proj.id === projectId) {
          return {
            ...proj,
            applicants: proj.applicants.map(app => {
              if (app.id === applicantId) {
                const todayStr = new Date().toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                });
                return {
                  ...app,
                  status: 'Shortlisted',
                  shortlistedOn: todayStr
                };
              }
              return app;
            })
          };
        }
        return proj;
      })
    );
  };

  const handleRejectApplicant = (projectId, applicantId) => {
    setProjects(prevProjects => 
      prevProjects.map(proj => {
        if (proj.id === projectId) {
          return {
            ...proj,
            applicants: proj.applicants.map(app => {
              if (app.id === applicantId) {
                return {
                  ...app,
                  status: 'Rejected',
                  shortlistedOn: null
                };
              }
              return app;
            })
          };
        }
        return proj;
      })
    );
  };



  // Derive active items for nested views
  const activeProject = projects.find(p => p.id === selectedProjectId);
  const activeApplicant = activeProject?.applicants.find(a => a.id === selectedApplicantId);

  // Render sub-views conditionally
  const renderContent = () => {

    switch (view) {
      case 'projects':
        return (
          <ProjectsList
            projects={projects}
            searchQuery={projectSearchQuery}
            onSearchChange={setProjectSearchQuery}
            onViewApplicants={handleViewApplicants}
          />
        );
      case 'applicants':
        return (
          <ApplicantsList
            project={activeProject}
            searchQuery={applicantSearchQuery}
            onSearchChange={setApplicantSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onViewDetails={handleViewDetails}
            onBackToProjects={handleBackToProjects}
          />
        );
      case 'review':
        return (
          <ApplicationReview
            project={activeProject}
            applicant={activeApplicant}
            onBackToApplicants={handleBackToApplicants}
            onShortlist={handleShortlistApplicant}
            onReject={handleRejectApplicant}
          />
        );
      default:
        return (
          <ProjectsList
            projects={projects}
            searchQuery={projectSearchQuery}
            onSearchChange={setProjectSearchQuery}
            onViewApplicants={handleViewApplicants}
          />
        );
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="dashboard-main">
        {/* Mobile top navbar */}
        <header className="dashboard-navbar">
          <button
            className="navbar-toggle-btn"
            onClick={toggleSidebar}
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="navbar-brand">VJ Consultancy</span>
        </header>

        {/* Dashboard Title Header */}
        <div className="application-header-row">
          <div className="header-text-group">
            <h1 className="application-title">Application Management</h1>
            <p className="application-subtitle">
              Manage student applications submitted for consultancy projects.
            </p>
          </div>
        </div>

        {/* Dynamic subview content */}
        <div className="application-content-body">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
