import { FormEvent, useState } from "react"
import SideMenu from "../../../components/SideHeader"
import toast from "react-hot-toast"
import axios from "axios"
import { api } from "../../../Api/api"

const JsUploadQuiz = () => {
    const [question, setQuestion] = useState('')
    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')
    const [optionThree, setOptionThree] = useState('')
    const [optionFour, setOptionFour] = useState('')
    const [answer, setAnswer] = useState('')
    const [error, setError] = useState('')
    const [loader, setLoader] = useState(false)


    const handleJsQuiz = async (e: FormEvent) => {
        e.preventDefault()
        if (question && optionOne && optionTwo && optionThree && optionFour && answer) {
            setLoader(true)
            try {
                await axios.post(`${api}/api/javascript/upload`, {
                    question, optionOne, optionTwo, optionThree, optionFour, answer
                })
                toast.success("Quiz Data Upload Successfully ✅")
            } catch (error) {
                toast.error('Error ❌')
                setError(`${error}`)
            } finally {
                setLoader(false)
            }
        } else {
            toast.error("All fields are required")
        }

        setQuestion('')
        setOptionOne('')
        setOptionTwo('')
        setOptionThree('')
        setOptionFour('')
        setAnswer('')
    }

    if (error) return <p>{error}</p>

    return (
        <div className="dashboard_container">
            <SideMenu />
            <div className="dashboard_main">
                <div className="quiz-form-container">
                    <h2 className="quiz-form-container__title">Upload JavaScript Quiz</h2>
                    <form onSubmit={handleJsQuiz} className="quiz-form">
                        <div className="form-group">
                            <label>Question</label>
                            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Option 1</label>
                            <input type="text" value={optionOne} onChange={(e) => setOptionOne(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Option 2</label>
                            <input type="text" value={optionTwo} onChange={(e) => setOptionTwo(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Option 3</label>
                            <input type="text" value={optionThree} onChange={(e) => setOptionThree(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Option 4</label>
                            <input type="text" value={optionFour} onChange={(e) => setOptionFour(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Answer</label>
                            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        </div>
                        <div className="form-group form-group__btn">
                            <button type='submit'>
                                {loader ? <p>Wait...</p> : "ADD"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JsUploadQuiz