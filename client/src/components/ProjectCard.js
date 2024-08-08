import React from 'react';
import { Link } from'react-router-dom';
import './Project.css'
import ProjectDetails from './ProjectDetails';

function ProjectCard({ projects }) {
    function handleclick(event){
        console.log(event.target)
        return (<>
                    <Link to='/projects/id'>
                        <ProjectDetails projects={projects}/>
                    </Link>
                </>  
        )
    }
  return (
    <div id="project-card" onClick={handleclick}>
      {projects.map((project) => (
        <div key={project.id} className="project-item">
          <h3>{project.title}</h3>
          <img alt={project.title} src={project.image_url} />
          <div className="caption">
            <p>
              Rating: {project.ratings} <span>{project.reviews.length} {project.reviews.length > 1 ? 'comments' : 'comment'}</span>
            </p>
          </div>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ProjectCard;