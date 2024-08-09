import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api';

const ProjectForm = ({ token }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    tags: '',
  });

  const [imageFiles, setImageFiles] = useState([]); // State to store multiple image files
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate image count and size
    if (files.length > 5) {
      setError('You can upload a maximum of 5 images.');
      return;
    }

    for (let file of files) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('Each image must be less than 10MB.');
        return;
      }
    }

    setImageFiles(files);
    setError(null); // Clear any previous error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description || imageFiles.length === 0 || !formData.link) {
      setError('Please fill out all required fields and upload at least one image.');
      return;
    }

    // Create FormData object to handle file upload
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('link', formData.link);
    data.append('tags', formData.tags);

    // Append each image file
    imageFiles.forEach((file, index) => {
      data.append(`image_${index + 1}`, file);
    });

    try {
      await createProject(data, token, true); // Pass FormData and indicate multipart/form-data
      setFormData({
        title: '',
        description: '',
        link: '',
        tags: '',
      });
      setImageFiles([]); // Reset image files
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
          onChange={handleFileChange}
          required
        />
        <button type="submit">Submit Project</button>
      </form>
    </>
  );
};

export default ProjectForm;
