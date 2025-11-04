import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from "react";
import { Toaster } from 'react-hot-toast'

// style configration
import "./styles/home.scss";
import "./styles/app.scss";
import "./styles/dashboad.scss";
import "./styles/sidebar.scss";
//javascript quiz
import './styles/Quiz/javascript/jsUploadQuiz.scss'
import './styles/Quiz/javascript/jsManage.scss'



// pages configartion
const Home = React.lazy(() => import('./pages/Home'))
const User = React.lazy(() => import('./pages/User'))

//javascript quiz
const JsUploadQuiz = React.lazy(() => import('./pages/quiz/javascript/JsUploadQuiz'))
const JsManage = React.lazy(() => import('./pages/quiz/javascript/JsManage'))
const JsEdit = React.lazy(() => import('./pages/quiz/javascript/JsEdit'))





const App = () => {
  return (
    <Router >
      <Routes>

        <Route path="/" element={<Home />} />
       
        <Route path="/user" element={<User />} />

        {/* javascript quiz */}
        <Route path="/jsQuizUpload" element={<JsUploadQuiz />} />
        <Route path="/jsManage" element={<JsManage />} />
        <Route path="/jsedit/:id" element={<JsEdit />} />


      </Routes>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </Router>
  );
};

export default App;
