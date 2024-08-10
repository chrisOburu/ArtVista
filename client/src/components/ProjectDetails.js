import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './Project.css';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Rating, Box, Avatar, TextField, List, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material';

function ProjectDetails() {
  const { id } = useParams();
  const location = useLocation();
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
      // Fetch project data if not provided via state
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
      };
      setReviews([...reviews, newReview]);
      setComment('');
    } else {
      alert('Comment cannot be empty');
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

      <EditIcon></EditIcon>
      <DeleteIcon></DeleteIcon>
      
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

      {/* List of Comments */}
      <List>
        {reviews.map((review, index) => (
          <ListItemButton key={index}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={review.avatar_url} />
            </ListItemAvatar>
            <ListItemText primary={review.comment} secondary={`Date: ${review.date}`} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}

export default ProjectDetails;