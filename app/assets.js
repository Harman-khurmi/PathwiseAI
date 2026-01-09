import lightLogo from "../public/Logo-Light.svg";
import darkLogo from "../public/Logo-Dark.svg";
import heroImage from "../public/Hero image light.png";
import heroImageDark from "../public/Hero image dark.png";
import sparkle from "../public/sparkle.svg";
import quotes from "../public/quotes.svg";
import gradientSparkle from "../public/gradient-sparkle.svg";

import careerGuidance from "../public/career guidance.svg";
import coverLetter from "../public/cover letter.svg";
import resumeBuilder from "../public/Resume builder.svg";
import mockInterview from "../public/mock interview.svg";
import industryAndSkill from "../public/Industry & skill.svg";

import moveForward from "../public/move forward.svg";
import career from "../public/career.svg";
import careerAsset from "../public/career asset.svg";
import practiceAndImprove from "../public/practice&improve.svg";

import priya from "../public/22.jpg";
import daniel from "../public/48.jpg";
import emily from "../public/63.jpg";
import rahul from "../public/74.jpg";
import khyati from "../public/69.jpg";

import github from "../public/github.svg";
import figma from "../public/figma.svg";
import linkedin from "../public/linkedin.svg";
import behance from "../public/behance.svg";


export const assets ={
    lightLogo,
    darkLogo,
    heroImage,
    heroImageDark,
    sparkle,
    quotes,
    gradientSparkle,
}

export const navItems = [
    { name: "Home", link: "#Hero" },
    { name: "Features", link: "#Features" },
    { name: "Process", link: "#Process" },
    { name: "Reviews", link: "#Reviews" },
]

export const icons = {
    
}

export const testimonials =[
    {
        name:"Priya S.",
        title:"Marketing Strategist",
        image:priya,
        review:"What sets PathwiseAI apart is the guidance. It doesn’t just generate content — it helps you understand what to improve and why."
    },
    {
        name:"Daniel M.",
        title:"Backend Developer",
        image:daniel,
        review:"Mock interview practice was the standout feature for me. The feedback on structure and clarity genuinely improved how I frame my answers."
    },
    {
        name:"Emily W.",
        title:"Product Manager",
        image:emily,
        review:"The industry and skill insights helped me validate my transition into product management. The data felt relevant, not generic."
    },
    {
        name:"Rahul K.",
        title:"Senior Software Engineer",
        image:rahul,
        review:"The resume builder understood my experience level and optimized my profile for senior roles without overdoing it. Clean, precise, and ATS-ready."
    },
    {
        name:"Khyati Sharma",
        title:"Product Analyst",
        image:khyati,
        review:"PathwiseAI didn't just rewrite my resume - it helped me understand where I was going wrong and how to improve. I landed interviews within two weeks."
    }
]

export const whyTrustUs =[
    {
        count : "25,000 +",
        description:"Active users across industries"
    },
    {
        count : "1.2M +",
        description:"Resumes  & Cover letters generated"
    },
    {
        count : "90% +",
        description:"Reports of improved interview confidence"
    },
    {
        count : "50 +",
        description:"Roles and career paths supported"
    },
    {
        count : "24/7",
        description:"AI guidance and feedback"
    },
]

export const features =[
    {
        image:careerGuidance,
        title:"AI-Powered Career Guidance",
        description:"Receive continuous, personalized career guidance aligned with long-term goals, industry trends, and professional growth trajectories."
    },
    {
        image:coverLetter,
        title:"Smart Cover Letters",
        description:"Generate role-specific cover letters aligned with job requirements, articulating your experience, strengths, and value with a professional tone."
    },
    {
        image:resumeBuilder,
        title:"AI Resume Builder",
        description:"Build ATS-optimized resumes engineered for your role and industry expectations - structured to highlight impact and measurable outcomes."
    },
    {
        image:mockInterview,
        title:"Mock Interview Practice",
        description:"Simulate role-based interviews with structured AI feedback to refine responses, communication clarity, and executive-level articulation."
    },
    {
        image:industryAndSkill,
        title:"Industry & Skill Insights",
        description:"Access data-driven insights on role demand, compensation benchmarks, and evolving skill requirements to stay competitive in your field."
    }
]

export const howItWorks = [
    {
        icon:career,
        title:"Tell Us About Your Career",
        description:"Share your role, experience, goals, and industry. PathwiseAI builds context before giving guidance."
    },
    {
        icon:careerAsset,
        title:"Get Personalized Career Assets",
        description:"Generate resumes, cover letters, and interview prep tailored specifically to your path."
    },
    {
        icon:practiceAndImprove,
        title:"Practice & Improve",
        description:"Refine your answers, documents, and skills with real-time feedback and insights."
    },
    {
        icon:moveForward,
        title:" Move Forward with Clarity",
        description:"Track progress, explore opportunities, and stay guided as your career evolves."
    }
]

export const FAQs = [
    {
        question:"Is PathwiseAI suitable for freshers and experienced professionals?",
        answer:"Yes. PathwiseAI adapts its guidance based on your experience level, career stage, and goals. Whether you’re entering the job market or advancing into senior roles, the platform tailors resumes, interview prep, and insights to match industry expectations at your level."
    },
    {
        question:"Does PathwiseAI replace human career coaches?",
        answer:"No. PathwiseAI is designed to complement human coaching, not replace it. It provides instant, structured, and always-available guidance, helping you prepare, refine, and validate your career assets before or alongside human feedback."
    },
    {
        question:"Are the resumes generated by PathwiseAI ATS-friendly?",
        answer:"Yes. All resumes are structured and optimized to align with modern Applicant Tracking Systems (ATS). This includes clean formatting, keyword alignment, role-specific phrasing, and clarity that improves both system parsing and recruiter readability."
    },
    {
        question:"Can I edit and customize the AI-generated content?",
        answer:"Absolutely. You remain in full control. Every resume, cover letter, and response generated by PathwiseAI is fully editable, allowing you to refine tone, wording, and details to best reflect your experience and personal voice."
    },
    {
        question:"How accurate and reliable are the industry and skill insights?",
        answer:"PathwiseAI insights are derived from aggregated market data, role trends, and skill demand analysis across industries. These insights are designed to help you understand where the market is heading and how your skills align with current opportunities."
    },
    {
        question:"Is my personal and career data secure on PathwiseAI?",
        answer:"Yes. Data security and privacy are a top priority. Your information is encrypted and handled securely, and it is never shared with third parties without your explicit consent."
    },
]

export const socialMedia = [
    {
        name: "Github",
        icon: github,
        iconDark: github,
        link: "https://github.com/Harman-khurmi"
    },
    {
        name: "Figma",
        icon: figma,
        iconDark: figma,
        link: "https://www.figma.com/@harmankhurmi"
    },
    {
        name: "LinkedIn",
        icon: linkedin,
        iconDark: linkedin,
        link: "https://www.linkedin.com/in/harmankhurmi/"
    },
    {
        name: "Behance",
        icon: behance,
        iconDark: behance,
        link: "https://www.behance.net/harmankhurmi"
    },
]