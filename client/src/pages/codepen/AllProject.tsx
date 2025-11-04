import { LucideDelete } from "lucide-react"
import { Link } from "react-router-dom"


const AllProject = ({ allProject }) => {


  return (
    <div className="displayFolder_container">
      {
        allProject.length === 0 ? (
          <h2>NewChat Not Found</h2>
        ) : (
          allProject?.findProject?.map((n) => (
            <div key={n._id} className="folder_data">

              <div className="folder_content">
                <Link to={`/codepen/${n._id}`}>
                  <p>{n.projectFolder}</p>
                </Link>
                <LucideDelete />
              </div>

            </div>
          ))
        )
      }
    </div>
  )
}

export default AllProject