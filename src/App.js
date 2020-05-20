import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    api.post('repositories', {
      title: `New project - ${new Date().toLocaleString()}`,
      url: "https://github.com/Rocketseat/umbriel",
      techs: ["NodeJS", "ReactJS", "React Native"]
    }).then(response => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    const newRepositoriesArray = repositories.filter(repository => repository.id !== id);

    api.delete(`repositories/${id}`).then(response => {
      setRepositories(newRepositoriesArray);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
