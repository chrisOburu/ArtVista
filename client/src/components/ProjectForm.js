import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory
import { createProject } from '../api';

const ProjectForm = ({ token }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link: '',
    tags: '',
  });
  const navigate = useNavigate();  // Use useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData, token);
      navigate('/projects');  // Use navigate instead of history.push
    } catch (error) {
      console.error('Project submission failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Project Title" onChange={handleChange} />
      <textarea name="description" placeholder="Project Description" onChange={handleChange} />
      <input name="image_url" type="text" placeholder="Image URL" onChange={handleChange} />
      <input name="link" type="text" placeholder="Live Link" onChange={handleChange} />
      <input name="tags" type="text" placeholder="Tags (comma-separated)" onChange={handleChange} />
      <button type="submit">Submit Project</button>
    </form>
  );
};

export default ProjectForm;
