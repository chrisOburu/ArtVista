import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/bannercard.css';

function BannerCard() {

    const project = {
        id: 1,
        title:"hero",
        ratings:"4.5",
        description:"",
        image_url:"https://cdn.dribbble.com/userupload/16000308/file/original-3c79e50457dfbd98286245b1d33fb5d2.jpg?resize=1024x764",
        reviews:{
            length:2,
        }

    }
  return (
    <div id="project-card" >
        <div key={project.id} className="project-item">
            <h3>{project.title}</h3>
            <img className='project-img' alt={project.title} src={project.image_url} />
          <div className="caption">
            <p>
              Rating: {project.ratings} <span>{project.reviews.length} {project.reviews.length > 1 ? 'comments' : 'comment'}</span>
            </p>
          </div>
          <p>{project.description}</p>
        </div>
    </div>
  );
}

export default BannerCard

