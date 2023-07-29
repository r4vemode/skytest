import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const sortAscending = () => {
    const sortedUsers = [...userData].sort((a, b) => a.public_repos - b.public_repos);
    setUserData(sortedUsers);
  };

  const sortDescending = () => {
    const sortedUsers = [...userData].sort((a, b) => b.public_repos - a.public_repos);
    setUserData(sortedUsers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.get(`https://api.github.com/search/users?q=${user}`, {
      headers: {
        'Authorization': `token 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`
      }
    });

    const usersWithRepos = await Promise.all(response.data.items.map(async (user) => {
      const userResponse = await axios.get(`https://api.github.com/users/${user.login}`, {
        headers: {
          'Authorization': `token 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`
        }
      });
      return {...user, public_repos: userResponse.data.public_repos}
    }));
    setUserData(usersWithRepos);
  };

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = userData.slice(firstIndex, lastIndex);

  const renderItems = currentItems.map(user => (
    <div key={user.id} style={{ color: 'white', cursor: 'pointer' }} onClick={() => handleClick(user.html_url)}>
      {user.login}
    </div>
  ));

  return (
    <div className={'main__container'}>
      <form className={'form__container'} onSubmit={handleSubmit}>
        <input type="text" value={user} onChange={e => setUser(e.target.value)} placeholder={'username:'}/>
        <button className={'form__btn'} type="submit">Search</button>
      </form>
      <div className={'sort__container'}>
        <button className={'sort__btn'} onClick={sortAscending}>По возрастанию</button>
        <button className={'sort__btn'} onClick={sortDescending}>По убыванию</button>
      </div>
      <div className="users__container">
        {renderItems}
      </div>
      <div className={'pagination'}>
        {[...Array(Math.ceil(userData.length / itemsPerPage)).keys()].map(number =>
          <button className={'pagination__btn'} key={number} onClick={() => setCurrentPage(number+1)}>{number+1}</button>)}
      </div>
    </div>
  );
}

export default Search;
