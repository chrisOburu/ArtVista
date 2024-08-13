import React, { useState } from 'react';
import { Modal, Button, TextField, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const EditProjectModal = ({ open, onClose, project, onSave }) => {
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    image_url: project.image_url,
    link: project.link,
    tags: project.tags,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

//   const updateProjectDetails = async (updatedProject) => {
//     try {
//       const response = await fetch(`https://artvista-dl5j.onrender.com/projects/${projectId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${jwtToken}`, 
//         },
//         body: JSON.stringify(updatedProject),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error updating project details:', errorData);
//         throw new Error(`Server error: ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log('Project updated successfully:', data);
  
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  
//     updateProjectDetails(updatedProject);
//   };

  const handleSave = () => {
    onSave(formData);
    onClose();
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
          label="Image URL"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          fullWidth
          margin="normal"
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