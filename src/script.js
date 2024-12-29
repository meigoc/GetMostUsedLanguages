async function getMostUsedLanguage(username, rank = 0, displayOnSite = false) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();

        if (repos.message) {
            console.error('User not found or access error');
            if (displayOnSite) document.getElementById('output').textContent = 'Error: User not found or access error';
            return 'Error: User not found or access error';
        }

        const languageCounts = {};

        for (const repo of repos) {
            if (repo.language) {
                if (!languageCounts[repo.language]) {
                    languageCounts[repo.language] = 0;
                }
                languageCounts[repo.language] += 1;
            }
        }

        const sortedLanguages = Object.keys(languageCounts).sort((a, b) => languageCounts[b] - languageCounts[a]);

        const selectedLanguage = sortedLanguages[rank] || 'No data';

        if (displayOnSite) {
            const outputElement = document.getElementById('output');
            if (outputElement) outputElement.textContent = selectedLanguage;
        }

        return selectedLanguage;
    } catch (error) {
        console.error('Error fetching data:', error);
        if (displayOnSite) document.getElementById('output').textContent = 'Error fetching data';
        return 'Error fetching data';
    }
}

function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', async () => {
    const username = getUrlParameter('user');
    const rank = parseInt(getUrlParameter('rank'), 10) || 0;
    const outputElement = document.getElementById('output');

    if (username) {
        const language = await getMostUsedLanguage(username, rank);
        outputElement.textContent = language;
    } else {
        outputElement.textContent = 'Error: User parameter is missing';
    }
});
