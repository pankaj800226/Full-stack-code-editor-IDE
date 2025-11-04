import { FormEvent, useEffect, useState } from 'react'
import SideHeader from '../../../components/SideHeader'
import toast from 'react-hot-toast'
import axios from 'axios'
import { api } from '../../../Api/api'
import { useNavigate, useParams } from 'react-router-dom'

const JsEdit = () => {
    const [question, setQuestion] = useState('')
    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')
    const [optionThree, setOptionThree] = useState('')
    const [optionFour, setOptionFour] = useState('')
    const [answer, setAnswer] = useState('')
    const [error, setError] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchQuizId = async () => {
            try {
                const res = await axios.get(`${api}/api/javascript/quizId/${id}`)
                setQuestion(res.data.question)
                setOptionOne(res.data.optionOne)
                setOptionTwo(res.data.optionTwo)
                setOptionThree(res.data.optionThree)
                setOptionFour(res.data.optionFour)
                setAnswer(res.data.answer)
            } catch (error) {
                console.log(error);

            }
        }

        fetchQuizId()
    }, [id])

    const handleJsQuiz = async (e: FormEvent) => {
        e.preventDefault()
        if (question && optionOne && optionTwo && optionThree && optionFour) {
            try {
                axios.put(`${api}/api/javascript/edit/${id}`, {
                    question, optionOne, optionTwo, optionThree, optionFour, answer
                })

                toast.success("Quiz Data edit Sucessfully ✅")
                navigate('/jsmanage')
            } catch (error) {
                toast.error('Error ❌')
                setError(`${error}`)
            }
        } else {
            toast.error("All Field are required")
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
            <SideHeader />
            <main className='dashboard_main'>
                <div className="quiz-form-container">
                <h2 className="quiz-form-container__title">Edit JavaScript Quiz</h2>
                    <form className='quiz-form' onSubmit={handleJsQuiz}>
                        <div className="form-group">
                            <label>Question</label>
                            <input type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Option 1</label>
                            <input type="text"
                                value={optionOne}
                                onChange={(e) => setOptionOne(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Option 2</label>
                            <input type="text"
                                value={optionTwo}
                                onChange={(e) => setOptionTwo(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Option 3</label>
                            <input type="text"
                                value={optionThree}
                                onChange={(e) => setOptionThree(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Option 4</label>
                            <input type="text"
                                value={optionFour}
                                onChange={(e) => setOptionFour(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Answer</label>
                            <input type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </div>

                        <div className="form-group form-group__btn">
                            <button type='submit'>ADD</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default JsEdit