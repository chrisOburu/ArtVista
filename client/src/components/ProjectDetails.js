import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './Project.css';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Rating,
  Box,
  Avatar,
  TextField,
  List,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';

function ProjectDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const projectFromState = location.state?.project;

  const [currentProject, setCurrentProject] = useState(projectFromState || {});
  const [designRating, setDesignRating] = useState(currentProject.design_rating || 0);
  const [usabilityRating, setUsabilityRating] = useState(currentProject.usability_rating || 0);
  const [functionalityRating, setFunctionalityRating] = useState(currentProject.functionality_rating || 0);
  const [designHover, setDesignHover] = useState(-1);
  const [usabilityHover, setUsabilityHover] = useState(-1);
  const [functionalityHover, setFunctionalityHover] = useState(-1);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState(currentProject.reviews || []);
  const [loading, setLoading] = useState(!projectFromState);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectFromState) {
      const fetchProject = async () => {
        try {
          const response = await fetch(`http://localhost:5555/projects/${id}`);
          if (!response.ok) {
            throw new Error('Project not found');
          }
          const data = await response.json();
          setCurrentProject(data);
          setReviews(data.reviews || []);
          setDesignRating(data.design_rating || 3);
          setUsabilityRating(data.usability_rating || 3);
          setFunctionalityRating(data.functionality_rating || 3);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    } else {
      setLoading(false);
    }
  }, [id, projectFromState]);

  const labels = {
    0: 'Not Rated',
    0.5: 'Terrible',
    1: 'Poor',
    1.5: 'Below Average',
    2: 'Mediocre',
    2.5: 'Average',
    3: 'Fair',
    3.5: 'Good',
    4: 'Very Good',
    4.5: 'Excellent',
    5: 'Outstanding',
  };

  const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newReview = {
        comment,
        date: new Date().toLocaleDateString(),
        avatar_url: '',
        user: { username: 'Anonymous' },
      };
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      setComment('');

      fetch(`http://localhost:5555/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ''
        },
        body: JSON.stringify({
          comment: newReview
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update reviews');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Successfully updated reviews:', data);
        })
        .catch((error) => {
          console.error('Error updating reviews:', error);
          setReviews(reviews);
        });
    } else {
      alert('Comment cannot be empty');
    }
  };

  const handleEdit = () => {
    alert('Edit');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`http://localhost:5555/projects/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete project');
        }
        alert('Project deleted successfully');
        navigate('/projects');
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentProject) {
    return <div>Project not found</div>;
  }

  // Calculate the average rating
  const averageRating = ((designRating + usabilityRating + functionalityRating) / 3).toFixed(1);

  return (
    <div id="project-details">
      <h2>{currentProject.title}</h2>
      <img
        alt={currentProject.title}
        src={currentProject.image_url}
        onError={(e) => (e.target.src = 'default-image.jpg')}
      />
      <h3>Project Description</h3>
      <p>{currentProject.description}</p>

      <div className="card-author">By: {currentProject.user.name}</div>

      <div className="icon-actions">
        <EditIcon className="editor-icon" onClick={handleEdit} />
        <DeleteIcon className="delete-icon" onClick={handleDelete} />
      </div>

      <div className="rating-section">
        <h4>Rate this project</h4>

        <div className="rating-container">
          <div className="rating-item">
            <h5>Design</h5>
            <Rating
              name="design-rating"
              value={designRating}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setDesignRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setDesignHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {designRating !== null && (
              <Box sx={{ ml: 2 }}>{labels[designHover !== -1 ? designHover : designRating]}</Box>
            )}
          </div>

          <div className="rating-item">
            <h5>Usability</h5>
            <Rating
              name="usability-rating"
              value={usabilityRating}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setUsabilityRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setUsabilityHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {usabilityRating !== null && (
              <Box sx={{ ml: 2 }}>{labels[usabilityHover !== -1 ? usabilityHover : usabilityRating]}</Box>
            )}
          </div>

          <div className="rating-item">
            <h5>Functionality</h5>
            <Rating
              name="functionality-rating"
              value={functionalityRating}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setFunctionalityRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setFunctionalityHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {functionalityRating !== null && (
              <Box sx={{ ml: 2 }}>{labels[functionalityHover !== -1 ? functionalityHover : functionalityRating]}</Box>
            )}
          </div>
        </div>
      </div>

      <div className="average-rating">
        <h4>Your Average Rating: {averageRating} Stars </h4>
      </div>

      <TextField
        id="outlined-controlled"
        label="Add a Comment"
        value={comment}
        onChange={(event) => {
          setComment(event.target.value);
        }}
        fullWidth
        multiline
        rows={4}
        variant="outlined"
      />
      <button onClick={handleCommentSubmit}>Submit Comment</button>

      <List>
        {reviews.map((review, index) => (
          <ListItemButton key={index}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={review.avatar_url || 'default-avatar.jpg'} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <div>{review.comment}</div>
                  <div className="review-username">{review.user.username}</div>
                </>
              }
              secondary={`Date: ${review.date}`}
            />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}

export default ProjectDetails;
