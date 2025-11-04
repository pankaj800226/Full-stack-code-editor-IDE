import { Link } from 'react-router-dom'
import img from '../assets/—Pngtree—purple stereo 404 page loss_4774965.png'
const PageNotFound = () => {
  return (
    <div className='page_not_found'>
      <img src={img} alt="" />
      <p>Page Not Found</p>
      <Link to={'/'}>
        <button>HOME</button>
      </Link>
    </div>
  )
}

export default PageNotFound