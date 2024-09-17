import React from 'react';
import './Project.css';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

function ProjectCard({ projects }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <StarIcon key={`full-${i}`} />
          ))}
        {halfStar && <StarHalfIcon />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <StarBorderIcon key={`empty-${i}`} />
          ))}
      </>
    );
  };

  return (
    <div className="card-grid">
      {projects.map((project) => (
        <div key={project.id} className="card">
          <Link to={`/projects/${project.id}`} state={{ project }}>
            <div className="card-image">
                  <img
                    src={`https://artvista-dl5j.onrender.com/images/${project.image_url}`}
                    alt={project.title}
                    onError={(e) => (e.target.src = 'default-image.jpg')}
                  />
            </div>
            <div className="card-content">
              <h3 className="card-title">{project.title}</h3>
              <p className="card-description">{project.description}</p>
              <p className="card-author">By: {project.user.name}</p>
            </div>
          </Link>
          <div className="card-commentRating">
            <div className="card-stars">
              {renderStars(project.average_rating || 0)}
            </div>
            <p>
              <span>
                {project.reviews.length} {project.reviews.length === 1 ? 'comment' : 'comments'}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectCard;