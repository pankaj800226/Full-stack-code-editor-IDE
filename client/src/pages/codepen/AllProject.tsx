import { LucideDelete } from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "./NewProjectFolder";



interface AllProjectProps {
  filterSearch: Project[];
  handleDelete: (id: string) => void
}


const AllProject: React.FC<AllProjectProps> = ({ filterSearch, handleDelete }) => {
  return (
    <div className="displayFolder_container">
      {filterSearch.length === 0 ? (
        <h2>Project Not Found</h2>
      ) : (
        filterSearch.map((n) => (
          <div key={n._id} className="folder_data">
            <div className="folder_content">
              <Link to={`/codepen/${n._id}`}>
                <p>{n.projectFolder}</p>
              </Link>
              <LucideDelete onClick={() => handleDelete(n._id)} style={{ cursor: "pointer" }} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllProject;
