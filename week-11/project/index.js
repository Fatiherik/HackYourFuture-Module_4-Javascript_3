'use strict';

const root = document.querySelector('#root');
const contributorContainer = document.querySelector('.contributors-container');
const repoContainer = document.querySelector('.repo-container');
const contributions = createAndAppend('h4', contributorContainer, {text: 'Contributions'});
const ulRepo = createAndAppend('ul', repoContainer);
const ulCont = createAndAppend('ul', contributorContainer);

// // Fetch the Api
function fetchJSON(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(err => console.error(err));
}

// Create elements and appends it
  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

function adjustTime(time) {
    const date = new Date(time);
    return date.toLocaleString('en-US', {hour12: true});
}

//Render the repoContainer
function renderRepoDetails(repo, ul) {
    const li = createAndAppend('li', ul);
    const table = createAndAppend('table', li);
    const headersAndKeys = {
        Repository: repo.name,
        Description: repo.description,
        Forks: repo.forks,
        Updated: repo.updated_at
    }

    for (let [key, value] of Object.entries(headersAndKeys)) {
        // console.log(`${key}: ${value}`);
        const tr = createAndAppend('tr', table);
        const th = createAndAppend('th', tr, {
            text: key + ':'
        });
        if (value === repo.name) {
            const td = createAndAppend('td', tr);
            createAndAppend('a', td, {
                href: repo.html_url,
                text: value
            })

        } else if (value === repo.updated_at) {
            createAndAppend('td', tr, {
                text: adjustTime(repo.updated_at)
            })
        } else {
            createAndAppend('td', tr, {text: value})
        }
    }
}

//render the data of contributors
function renderContributors(url, elem) {
    fetchJSON(url)
        .then(contributors => {
            contributors.forEach((data, index) => {
                const li = createAndAppend('li', elem);
                const img = createAndAppend('img', li, {src: data.avatar_url});
                const link = createAndAppend('a', li, {
                    text: data.login,
                    href: data.html_url
                });
                const span = createAndAppend('span', li, {text: data.contributions});
            });
        })
        .catch(err => {
            createAndAppend('div', root, {
                text: err.message,
                class: 'alert-error'
            });
        });
}

function main(url) {
    fetchJSON(url)
        .then(repos => {
            repos
                .sort((a, b) => a.name.localeCompare(b.name),)
                .forEach((repo, index) => {
                    const option = createAndAppend('option', select, {
                        text: repo.name,
                        value: index
                    });
                });

            select.addEventListener('change', () => {
                ulRepo.textContent = '';
                ulCont.textContent = '';
                renderRepoDetails(repos[select.value], ulRepo);
                renderContributors(repos[select.value].contributors_url, ulCont);
            });
            renderRepoDetails(repos[select.value], ulRepo);
            renderContributors(repos[select.value].contributors_url, ulCont);
        },)
        .catch(err => {
            createAndAppend('div', root, {
                text: err.message,
                class: 'alert-error'
            });
        });
}

const HYF_REPOS_URL =
  'https://api.github.com/orgs/HackYourFuture/repos?per_page100';
window.onload = () => main(HYF_REPOS_URL);