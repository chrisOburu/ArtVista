import React, { useState } from 'react';
import { Modal, Button, TextField, Box, Typography } from '@mui/material';

const EditProjectModal = ({ open, onClose, project, onSave }) => {
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    link: project.link,
    tags: project.tags,
    image: null,
  });
  const jwtToken = localStorage.getItem('jwtToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };
  const handleSave = async () => {
    const { title, description, link, tags, image } = formData;
  
    let formDataToSend;
    if (image) {
      formDataToSend = new FormData();
      formDataToSend.append('title', title);
      formDataToSend.append('description', description);
      formDataToSend.append('link', link);
      formDataToSend.append('tags', tags);
      formDataToSend.append('image', image);
    } else {
      formDataToSend = JSON.stringify({ title, description, link, tags });
    }
  
    try {
      const response = await fetch(`https://artvista-dl5j.onrender.com/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          ...(image ? {} : { 'Content-Type': 'application/json' })
        },
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating project details:', errorData);
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Project updated successfully:', data);
      onSave(data);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Project Details
        </Typography>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <Typography variant="body1">Upload Image</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            name="images"
          />
        </Box>
        
        <Button 
          variant="contained" 
          onClick={handleSave} 
          sx={{ 
            mt: 2,
            bgcolor: '#E2725B',
            '&:hover': {bgcolor: '#a64e3b'}
          }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProjectModal;
