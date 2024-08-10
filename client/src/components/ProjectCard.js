import React from 'react';
import { Link } from 'react-router-dom';
import './Project.css';

function ProjectCard({ projects }) {
  return (
    <div id="project-card">
      {projects.map((project) => (
        <div key={project.id} className="project-item">
          <Link to={`/projects/${project.id}`} state={{ project }}>
            <h3>{project.title}</h3>
            <img alt={project.title} src={project.image_url} />
          </Link>
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