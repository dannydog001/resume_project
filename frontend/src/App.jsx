import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './component/common/header'
import Footer from './component/common/footer'
import HeroSection from './component/herosection'
import InterviewPro from './component/interviewpro'
import SalaryNegotiationSimulator from './component/salaryNego'
import SkillsGapAnalyzer from './component/skillanalyzer'
import CareerElevatePro from './component/careercoaching'
import CareerAptitudeTest from './component/asssessment'
import CareerPathPro from './component/careerpath'
import LinkedInOptimizer from './component/linkedinoptimizer'
import AdvancedCareerAdvisor from './component/careervisual'
import ProfileBuildingPage from './component/profilebuilder'
import JobSearchChallengesPage from './component/blogpage'
import ResumeBuildera from './component/sss'
import ResumeBuilderApp from './component/resumeworld'
import RegisterPage from './component/registerpage'
import LoginPage from './component/loginpage'
import AdminDashboard from './component/Adminpage'
import CoverLetterBuilder from './component/coverletter'
import AboutPage from './component/aboutus'
import CareersPage from './component/careerpage'
import PressPage from './component/presspage'
import HelpCenterPage from './component/helpcentre'
import JobAlertsPage from './component/smartjob'
import UserDashboard from './component/userdasboard'
import ATSResumeTester from './component/ATStester'
import ResumeMaker from './component/dudu'
// import ResumeBuildera from './component/sss'
// You can import other pages here when needed

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<HeroSection/>} />
        <Route path="/Interview" element={<InterviewPro />} />
        <Route path="/salary" element={<SalaryNegotiationSimulator />} />
        <Route path="/career" element={<CareerElevatePro />} />
        <Route path='/assessment' element={<CareerAptitudeTest />} />
        <Route path='/careerpath' element={<CareerPathPro/>} />
        <Route path='/linkedin' element={<LinkedInOptimizer />} />
        <Route path='/skillsgap' element={<SkillsGapAnalyzer />} />
        <Route path='/careervisual' element={<AdvancedCareerAdvisor />} />
        <Route path='/profile' element={<ProfileBuildingPage />} />
        <Route path='/blog' element={<JobSearchChallengesPage />} />
        <Route path='/res' element={<ResumeBuildera/>} />
        <Route path='/resumeworld' element={<ResumeBuilderApp/>} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/cover' element={<CoverLetterBuilder/>} />
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/careerpage' element={<CareersPage/>} />
        <Route path='/press' element={<PressPage/>} />
        <Route path='/help' element={<HelpCenterPage/>} />
        <Route path='/smart' element={<JobAlertsPage/>} />
        <Route path='/user' element={<UserDashboard/>} />
        <Route path='/ats' element={<ATSResumeTester/>} />
         <Route path='/dudu' element={<ResumeMaker/>} />
        {/* <Route path='/resume' element={<ResumeBuildera/>} /> */}
        
        {/* Add more rotes as needed */}
      </Routes> 
      <Footer />
    </Router>
  )
}

export default App
