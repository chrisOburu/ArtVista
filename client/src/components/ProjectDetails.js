import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './Project.css';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Rating, Box, Avatar, TextField, List, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material';

function ProjectDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const projectFromState = location.state?.project;

  const [currentProject, setCurrentProject] = useState(projectFromState || {});
  const [value, setValue] = useState(currentProject.ratings || 3);
  const [hover, setHover] = useState(-1);
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
          setValue(data.ratings || 3);
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
    0: 'No rating',
    0.5: 'Half rating',
    1: '1 Star',
    1.5: '1.5 Stars',
    2: '2 Stars',
    2.5: '2.5 Stars',
    3: '3 Stars',
    3.5: '3.5 Stars',
    4: '4 Stars',
    4.5: '4.5 Stars',
    5: '5 Stars',
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
        user: { username: 'Anonymous' }, // Example username
      };
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      setComment('');

      fetch(`http://localhost:5555/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ratings: value,
          reviews: updatedReviews,
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

  return (
    <div id="project-details">
      <h2>{currentProject.title}</h2>
      <img 
        alt={currentProject.title} 
        src={currentProject.image_url} 
        onError={(e) => e.target.src = 'default-image.jpg'} 
      />
      <h3>Project Description</h3>
      <p>{currentProject.description}</p>
      
      <div className="card-author">By: {currentProject.owner.name}</div>

      <div className="icon-actions">
        <EditIcon className='editor-icon' onClick={handleEdit} />
        <DeleteIcon className='delete-icon' onClick={handleDelete} />
      </div>
      <div className="rating-title">
        <h4>Rate this project</h4>
      </div>
      <div className="rating-container">
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
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
              <Avatar alt="Profile Picture" src={review.avatar_url} />
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