import React, { useEffect, useState } from 'react';
import '../App.css';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
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

    // Filter by search term
    if (searchTerm) {
      sortedProjects = sortedProjects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by selected option
    if (sortOption === 'rating') {
      sortedProjects.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'title') {
      sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProjects(sortedProjects);
  }, [projects, sortOption, searchTerm]);

  return (
    <div className="project-list-container">
      <h2>Projects</h2>
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
      <ProjectCard projects={projects} />
      {/* <ul className="project-list">
        {filteredProjects.map((project) => (
          <li key={project.id} className="project-item">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <p className="project-rating">Rating: {project.rating}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default ProjectList;