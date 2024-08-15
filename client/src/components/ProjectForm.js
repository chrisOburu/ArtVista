import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api';
import Modal from 'react-modal';
import Header from './header.js';
import Footer from './footer.js';


const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    tags: '',
  });

  const [image, setImage] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageType, setMessageType] = useState('');
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
      setPopupMessage('Please fill out all required fields and upload an image.');
      setMessageType('error');
      setIsMessageModalOpen(true);
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
      await createProject(data); // Pass FormData and indicate multipart/form-data
      setPopupMessage('Project submitted successfully!');
      setMessageType('success');
      setIsMessageModalOpen(true);

      // Reset form fields and navigate after a delay
      setFormData({
        title: '',
        description: '',
        link: '',
        tags: '',
      });
      setImage(null);

      setTimeout(() => {
        setIsMessageModalOpen(false);
        navigate('/projects');
      }, 3000);
    } catch (error) {
      setPopupMessage('Project submission failed. Please try again.');
      setMessageType('error');
      setIsMessageModalOpen(true);

      setTimeout(() => {
        setIsMessageModalOpen(false);
      }, 3000);
    }
  };


  return (
    <>
      <Header/>
      <h2 className='form-text'>Project submission form</h2>
      <form onSubmit={handleSubmit}>
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
      <Modal
        isOpen={isMessageModalOpen}
        onRequestClose={() => setIsMessageModalOpen(false)}
        contentLabel="Message"
        className={`message-modal ${messageType === 'success' ? 'success' : 'error'}`} // Conditionally apply class
        overlayClassName="message-modal-overlay"
      >
        <div className="message-content">
          <p>{popupMessage}</p>
        </div>
      </Modal>
      <Footer/>
    </>
  );
};

export default ProjectForm;
