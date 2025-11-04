import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import { Toaster } from 'react-hot-toast'
import PageNotFound from './components/PageNotFound';
import Loading from './components/Loading';
import RouteSave from './protected/RouteSave'

// style configure
import "./styles/app.scss";
import "./styles/home.scss";
import "./styles/header.scss";
import "./styles/register.scss";
import "./styles/compiler/codeEditor.scss";
import "./styles/banner.scss";
import "./styles/feature.scss";
import "./styles/profile.scss";
import "./styles/sidebaar.scss";
import "./styles/compiler/praticeGraph.scss";


//ai
import './styles/ai/ai.scss';
import './styles/ai/newchat.scss';

//resume
import './styles/resume/resume.scss'
import './styles/resume/templet1.scss'
import './styles/resume/tamplate2.scss'

//codepen editor
import './styles/codepen/codepen.scss'




// pages
const Home = React.lazy(() => import('./pages/Home'))
const Profile = React.lazy(() => import('./pages/Profile'))
const Register = React.lazy(() => import('./components/auth/Register'))
const Login = React.lazy(() => import('./components/auth/Login'))
const AiChatBtn = React.lazy(() => import('./components/AiChatBtn'))
const CodeEditor = React.lazy(() => import('./pages/Compiler/Editor'))

//ai
const NewChat = React.lazy(() => import('./pages/ai/NewChat'))
const AiMessage = React.lazy(() => import('./pages/ai/Ai'))

//resume
const Resume = React.lazy(() => import('./pages/resume/Resume'))
const Templte1 = React.lazy(() => import('./pages/resume/Templte1'))
const Template2 = React.lazy(() => import('./pages/resume/Template2'))

//codepen editor
const CodePen = React.lazy(() => import('./pages/codepen/CodePen'))
const NewProject = React.lazy(() => import('./pages/codepen/NewProject'))





const App = () => {
  return (
    <div>
      <Router>
        <Header />
        {/* <AiChatBtn /> */}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aichatbtn" element={<AiChatBtn />} />


            <Route element={<RouteSave />}>
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<PageNotFound />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/codeEditor" element={<CodeEditor />} />

              {/* ai  */}
              <Route path="/aiMessage/:id" element={<AiMessage />} />
              <Route path="/newchat" element={<NewChat />} />

              {/* resume builder  */}
              <Route path="/resume" element={<Resume />} />
              <Route path="/templete1" element={<Templte1 />} />
              <Route path="/template2" element={<Template2 />} />

              {/* codepen editor  */}
              <Route path="/codepen/:id" element={<CodePen />} />
              <Route path="/newProject" element={<NewProject />} />

            </Route>



          </Routes>

        </Suspense>
      </Router>
      <Toaster />
    </div>
  );
};

export default App;
