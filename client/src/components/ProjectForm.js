import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    tags: '',
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description || !image || !formData.link) {
      setError('Please fill out all required fields and upload an image.');
      return;
    }

    // Create FormData object to handle file upload
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('link', formData.link);
    data.append('tags', formData.tags);
    data.append('image', image);

    try {
      await createProject(data,); // Pass FormData and indicate multipart/form-data
      setFormData({
        title: '',
        description: '',
        link: '',
        tags: '',
      });
      setImage(null); // Reset image file
      navigate('/projects');
    } catch (error) {
      console.error('Project submission failed', error);
      setError('Project submission failed. Please try again.');
    }
  };

  return (
    <>
      <h2>Project submission form</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label>Title</label>
        <br></br>
        <input
          name="title"
          type="text"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <br></br>
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br></br>
        <label>Live Link</label>
        <input
          name="link"
          type="text"
          placeholder="Live Link"
          value={formData.link}
          onChange={handleChange}
          required
        />
        <br></br>
        <label>Tags</label>
        <br></br>
        <input
          name="tags"
          type="text"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
        />

        <label>Images</label>
        <br></br>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
        />
        <button type="submit">Submit Project</button>
      </form>
    </>
  );
};

export default ProjectForm;
