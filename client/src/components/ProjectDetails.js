import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './Project.css';
import Header from './header';
import Footer from './footer';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


import {
Rating,
Box,
Avatar,
TextField,
List,
ListItemText,
ListItemAvatar,
ListItemButton,
Fab, 
Snackbar, 
Alert,
Dialog, 
DialogActions, 
DialogContent, 
DialogContentText, 
DialogTitle, 
Button 
} from '@mui/material';
import EditProjectModal from './EditProjectModal';

function ProjectDetails() {
const { id } = useParams();
const location = useLocation();
const navigate = useNavigate();
const projectFromState = location.state?.project;
const jwtToken = localStorage.getItem('jwtToken');

const [currentProject, setCurrentProject] = useState(projectFromState || {});
const [designRating, setDesignRating] = useState(currentProject.design_rating !== undefined ? currentProject.design_rating : null);
const [usabilityRating, setUsabilityRating] = useState(currentProject.usability_rating !== undefined ? currentProject.usability_rating : null);
const [functionalityRating, setFunctionalityRating] = useState(currentProject.functionality_rating !== undefined ? currentProject.functionality_rating : null);
const [designHover, setDesignHover] = useState(-1);
const [usabilityHover, setUsabilityHover] = useState(-1);
const [functionalityHover, setFunctionalityHover] = useState(-1);
const [comment, setComment] = useState('');
const [reviews, setReviews] = useState(currentProject.reviews || []);
const [loading, setLoading] = useState(!projectFromState);
const [error, setError] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [alertOpen, setAlertOpen] = useState(false);
const [alertMessage, setAlertMessage] = useState('');
const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

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
5.0: 'Outstanding',
};

const getLabelText = (value) => {
return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
};

const user_ratings = [designRating, usabilityRating, functionalityRating].filter(rating => rating !== null && rating !== undefined);

const averageRating = user_ratings.length > 0
  ? (user_ratings.reduce((acc, rating) => acc + rating, 0) / user_ratings.length).toFixed(1)
  : 'Not Rated';
  
const handleDialogOpen = () => {
  setConfirmDialogOpen(true);
};

const handleDialogClose = () => {
  setConfirmDialogOpen(false);
}; 
const handleAddClick = () => {
  navigate('/submit-project');
};

useEffect(() => {
if (!projectFromState) {
  const fetchProject = async () => {
    try {
      const response = await fetch(`https://artvista-dl5j.onrender.com/projects/${id}`);
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

useEffect(() => {
  const fetchRating = async () => {
    try {
      const response = await fetch(`https://artvista-dl5j.onrender.com/ratings/project/${id}`,{
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      );
      const data = await response.json();
      console.log('Fetched ratings:', data);
      setDesignRating(data.design_rating);
      setUsabilityRating(data.usability_rating);
      setFunctionalityRating(data.functionality_rating);
    } catch (error) {
      console.error('Failed to fetch rating:', error);
    }
  };

  fetchRating();
}, [id, jwtToken]);

const handleOpen = () => setIsModalOpen(true);
const handleClose = () => setIsModalOpen(false);
////////////////////////////////////////////////////////////////
const handleSave = (updatedProject) => {
    setCurrentProject(updatedProject);
};

const handleCommentSubmit = () => {
if (comment.trim()) {
  const newReview = {
    comment: comment
  };

  console.log('Submitting new review:', newReview);

  fetch(`https://artvista-dl5j.onrender.com/reviews/project/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(newReview),
  })
    .then(async (response) => {
      console.log('Server response:', response);
      if (!response.ok) {
        const data_1 = await response.json();
        console.error('Response data:', data_1);
        throw new Error('Failed to add review');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Successfully added review:', data);
      setReviews([...reviews, data]);
      setComment('');
    })
    .catch((error) => {
      console.error('Error adding review:', error);
      alert('Error adding review: ' + error.message);
    });
} else {
  alert('Comment cannot be empty');
}
};

const handleDelete = async () => {
  handleDialogOpen();

  const deleteProject = async () => {
    try {
      const response = await fetch(`https://artvista-dl5j.onrender.com/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAlertMessage(errorData.message || 'Failed to delete project');
        setAlertOpen(true);
        throw new Error(errorData.message || 'Failed to delete project');
      }

      alert('Project deleted successfully');
      navigate('/projects');
    } catch (err) {
      console.error('Error deleting project:', err);
      setAlertMessage('Error deleting project: ' + err.message);
      setAlertOpen(true);
    } finally {
      handleDialogClose(); 
    }
  };

  return deleteProject();
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

const sendRatingToServer = async (designRating, usabilityRating, functionalityRating) => {
  try {
    const response = await fetch(`https://artvista-dl5j.onrender.com/ratings/project/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        design_rating: designRating,
        usability_rating: usabilityRating,
        functionality_rating: functionalityRating
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server responded with an error:', errorData);
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Rating response:', data);
  } catch (error) {
    console.error('Error sending rating to server:', error.message);
  }
};


return (<>
        <Header />
        <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={() => setAlertOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={() => setAlertOpen(false)}
              severity="error"
              sx={{ width: '100%' }}
            >
              {alertMessage}
            </Alert>
        </Snackbar>
        <Dialog className='dialog-confirm-container'
          open={confirmDialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} sx={{ 
              backgroundColor: '#FFF7F5',
              color: '#555',
              padding: '12px 24px',
              margin: '8px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#E19685'
                }
              }}>
              Cancel
            </Button>
            <Button onClick={handleDelete} sx={{ 
              backgroundColor: '#FFDAD1', 
              color: '#555',
              padding: '12px 24px',
              margin: '6px',
              borderRadius: '8px', 
              '&:hover': {
                backgroundColor: '#E19685', 
                },
              }}
              autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <div className='Stack-icons'>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab className="addNew-icon" aria-label="addNew-icon">
              <AddIcon onClick={handleAddClick}/>
            </Fab>
            <Fab className="editor-icon" aria-label="editor-icon">
              <EditIcon  onClick={handleOpen} />
                <EditProjectModal
                  open={isModalOpen}
                  onClose={handleClose}
                  project={currentProject}
                  onSave={handleSave}
                />
            </Fab>
            <Fab className="delete-icon" aria-label="delete">
              <DeleteIcon onClick={handleDialogOpen} />
            </Fab>
          </Box>
        </div>
<div id="cardinfo-details">
  <h2>{currentProject.title}</h2>
  <iframe id="card-livelink" title="card-livelink" src={currentProject.link} height="700" width="1300" allowFullScreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>
  <h3>Project Description</h3>
  <p>{currentProject.description}</p>

  <div className="card-author">
      By: {currentProject.user?.name || 'Unknown Author'}
  </div>
  
    <div className="rating-section">
      <h4>Rate this project</h4>

      <div className="rating-container">
        <div className="cardinfo-rating-item">
          <h5>Design</h5>
          <Rating
          name="design-rating"
          value={designRating}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setDesignRating(newValue);
            sendRatingToServer(newValue, usabilityRating, functionalityRating);
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

        <div className="cardinfo-rating-item">
          <h5>Usability</h5>  
          <Rating
            name="usability-rating"
            value={usabilityRating}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setUsabilityRating(newValue);
              sendRatingToServer(designRating, newValue, functionalityRating);
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

        <div className="cardinfo-rating-item">
          <h5>Functionality</h5>
          <Rating
            name="functionality-rating"
            value={functionalityRating}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setFunctionalityRating(newValue);
              sendRatingToServer(designRating, usabilityRating, newValue);
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

    <div className="defined-average-rating">
      <h4>Your Average Rating: 
        <span className="defined-rating-value">
          {averageRating > 0 ? `${averageRating} Stars` : 'Not Rated'}
        </span>
      </h4>
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
  <button className='comment-button' onClick={handleCommentSubmit}>Submit Comment</button>
  <List>
  {reviews.map((projreview, index) => (
    <ListItemButton key={index}>
      <ListItemAvatar>
        <Avatar alt={projreview.user?.username || 'Profile'} src={projreview.avatar_url || 'default-avatar.jpg'} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <div>{projreview.comment}</div>
            <div className="review-username">{projreview.user?.username || 'Anonymous'}</div>
          </>
        }
        secondary={`${projreview.date}`}
      />
    </ListItemButton>
  ))}
</List>

</div>
<Footer />
    </>
);
}

export default ProjectDetails;
