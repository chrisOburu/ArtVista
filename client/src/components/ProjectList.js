import React, { useEffect, useState } from 'react';
import '../App.css';
import ProjectCard from './ProjectCard';
import Header from './header.js'
import Footer from "./footer.js"
import AddIcon from '@mui/icons-material/Add';
import {Fab} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://artvista-dl5j.onrender.com/projects');
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data); // Initialize with all projects
      } catch (error) {
        console.error('Failed to load projects', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let sortedProjects = [...projects];

    // Debugging statements
    console.log('Initial Projects:', projects);
    console.log('Search Term:', searchTerm);
    console.log('Sort Option:', sortOption);

    // Filter by search term
    if (searchTerm) {
      sortedProjects = sortedProjects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Debugging statements
    console.log('Filtered Projects:', sortedProjects);

    // Sort by selected option
    if (sortOption === 'rating') {
      sortedProjects.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'title') {
      sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Debugging statements
    console.log('Sorted Projects:', sortedProjects);

    setFilteredProjects(sortedProjects);
  }, [projects, sortOption, searchTerm]);
  const handleAddClick = () => {
    navigate('/submit-project');
  };

  return (
    <>
      <Header />
      <div className="project-list-container">
        <h2>Projects</h2>
        <Fab className="addNew-icon" aria-label="addNew-icon">
          <AddIcon onClick={handleAddClick}/>
        </Fab>
        <div className="controls">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <label htmlFor="sort" className="sort-label">Sort by: </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="">Select</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
          </select>
        </div>
        <ProjectCard projects={filteredProjects} />
      </div>
      <Footer />
    </>
  );
};

export default ProjectList;
