import React, { useState } from 'react';
import './Project.css';
import StarIcon from '@mui/icons-material/Star';
import { Rating, Box, Avatar, TextField, List, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material';

function ProjectDetails({ project }) {
  // Default the project to an empty object to prevent conditional hooks
  const [currentProject, setCurrentProject] = useState(project || {});
  const [value, setValue] = useState(currentProject.ratings || 3);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState(currentProject.reviews || []);

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
    }
  };

  // If no project data
  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div id="project-details">
      <h2>{project.title}</h2>
      <img alt={project.title} src={project.image_url} />
      <h3>Project Description</h3>
      <p>{project.description}</p>

      {/* Edit and Delete Icons */}
      <i className="editor-icon" onClick={() => alert('Edit clicked')} />
      <i className="delete-icon" onClick={() => alert('Delete clicked')} />

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
