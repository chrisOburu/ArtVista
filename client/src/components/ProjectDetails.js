import React, {useState, useEffect, useRef} from 'react';
import './Project.css';
import StarIcon from '@mui/icons-material/Star';
import { Rating, Box, Avatar,TextField, List, ListItemText, ListItemAvatar, ListItemButton, CssBaseline } from '@mui/material';


function ProjectDetails({projects}) {
  const [value, setValue] = useState(null);
  const [hover, setHover] = useState(-1);
  const [name, setName] = useState('');
  const ref = useRef(null);
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

  useEffect(() => {
    setValue(3);
  }, []);

  return (
    <>
        <div id='project-details'>ProjectDetails</div>
        <h2>Project title</h2>
        <img alt='title' src='#'/>
        <h3>Project description</h3>
        <i class = "editor-icon" />
        <i class = "Delete-icon" />
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
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          {/* <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List>
        {projects.map(({ primary, secondary, person }, index) => (
          <ListItemButton key={index + person}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItemButton>
        ))}
      </List>
      </Box> */}
      {/* {projects.reviews.map((review) => (
        <div key={review.id} className="review-item">
          <h3>{review.comment}</h3>
        </div>
      ))} */}
        <ul>comments go here
          
          <li><span>Date: 2022-01-01</span>Comment</li>
        </ul>

    </>
  )
}

export default ProjectDetails