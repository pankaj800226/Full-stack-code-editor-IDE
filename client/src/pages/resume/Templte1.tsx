import { ChangeEvent, useRef, useState } from "react"
import { motion } from 'framer-motion'
import { AiFillPlusCircle } from "react-icons/ai";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface BookingInfo {
    name: string;
    summary: string
    email: string;
    phoneNo: string;
    address: string;
    secondarySchool: string
    matrixDetails: string;
    graducationDetails: string;
    skills: string[];
    projects: string[];
}

const Templte1 = () => {
    const [formData, setFormData] = useState<BookingInfo>({
        name: "",
        summary: "",
        email: "",
        phoneNo: "",
        address: "",
        secondarySchool: "",
        matrixDetails: "",
        graducationDetails: "",
        skills: [""],
        projects: [""],
    });
    const resumeRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleArrayChange = (e: ChangeEvent<HTMLInputElement>, index: number, field: "skills" | "projects") => {
        const newArray = [...formData[field]]
        newArray[index] = e.target.value
        setFormData({ ...formData, [field]: newArray })
    }

    const addField = (field: "skills" | "projects") => {
        setFormData({ ...formData, [field]: [...formData[field], ""] })
    }

    const removeField = (field: "skills" | "projects", index: number) => {
        const newArray = [...formData[field]]
        newArray.splice(index, 1)
        setFormData({ ...formData, [field]: newArray })
    }

    const downloadResume = async () => {
        if (resumeRef.current) {
            const element = resumeRef.current;
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("resume.pdf");
        }
    };

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                className="resume_builder_container"
            >
                {/* Form Section */}
                <div className="resume_right_side">
                    <h2 className="form-title">Build Your Resume</h2>

                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                            placeholder="Add name"
                        />
                    </div>

                    <div className="input-group">
                        <label>Summary</label>
                        <input type="text" name="summary" value={formData.summary} onChange={handleChange}
                            placeholder="Add Summary"
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                            placeholder="Add Email"

                        />
                    </div>
                    <div className="input-group">
                        <label>Phone Number</label>
                        <input type="number" name="phoneNo" value={formData.phoneNo} onChange={handleChange}
                            placeholder="Add Number"

                        />
                    </div>
                    <div className="input-group">
                        <label>Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange}
                            placeholder="Add Address"

                        />
                    </div>

                    <div className="input-group">
                        <label>10th / Secondary School</label>
                        <input type="text" name="secondarySchool" value={formData.secondarySchool} onChange={handleChange} placeholder="Add 10th/ Secondary School" />
                    </div>
                    <div className="input-group">
                        <label>12th / Intermediate</label>
                        <input type="text" name="matrixDetails" value={formData.matrixDetails} onChange={handleChange} placeholder="Add 12/ matrixDetails" />
                    </div>
                    <div className="input-group">
                        <label>Graduation Details</label>
                        <input type="text" name="graducationDetails" value={formData.graducationDetails} onChange={handleChange} placeholder="Add graducationDetails" />
                    </div>

                    {/* Skills */}
                    <h3>Skills</h3>
                    {formData.skills.map((s, index) => (
                        <div className="array-input" key={index}>
                            <input
                                type="text"
                                placeholder="Add Skill"
                                value={s}
                                onChange={(e) => handleArrayChange(e, index, "skills")}
                            />
                            {formData.skills.length > 1 && (
                                <button type="button" className="remove-btn" onClick={() => removeField("skills", index)}>❌</button>
                            )}
                            <button type="button" className="add-btn" onClick={() => addField("skills")}>
                                <AiFillPlusCircle />
                            </button>
                        </div>
                    ))}

                    {/* Projects */}
                    <h3>Projects</h3>
                    {formData.projects.map((p, index) => (
                        <div className="array-input" key={index}>
                            <input
                                type="text"
                                placeholder="Add Project"
                                value={p}
                                onChange={(e) => handleArrayChange(e, index, "projects")}
                            />
                            {formData.projects.length > 1 && (
                                <button type="button" className="remove-btn" onClick={() => removeField("projects", index)}>❌</button>
                            )}
                            <button type="button" className="add-btn" onClick={() => addField("projects")}>
                                <AiFillPlusCircle />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Resume Preview */}
                <div className="resume_left_side">
                    <div className="resume_card" ref={resumeRef}>
                        <h1 className="resume_name">{formData.name || "Your Name"}</h1>
                        <p>{formData.email}</p>
                        <p>{formData.phoneNo}</p>
                        <p>{formData.address}</p>

                        <hr />

                        <h2>SUMMARY</h2>
                        <p>{formData.summary}</p>

                        <h2>EDUCATION</h2>
                        <p>{formData.secondarySchool}</p>
                        <p>{formData.matrixDetails}</p>
                        <p>{formData.graducationDetails}</p>

                        <h2>SKILLS</h2>
                        <ul>{formData.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>

                        <h2>PROJECT</h2>
                        <ul>{formData.projects.map((p, i) => <li key={i}>{p}</li>)}</ul>
                    </div>

                    <div className="button-group">
                        {/* <button className="save-btn">💾 Save</button> */}
                        <button className="download-btn" onClick={downloadResume}>📄 Download Resume</button>
                    </div>
                </div>
            </motion.div>

        </div>
    )
}

export default Templte1