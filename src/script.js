async function getMostUsedLanguage(username, rank = 0) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();

        if (repos.message) {
            console.error('User not found or access error');
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
        
        console.log(`Language #${rank + 1} for ${username}: ${selectedLanguage}`);
        return selectedLanguage;
    } catch (error) {
        console.error('Error fetching data:', error);
        return 'Error fetching data';
    }
}

function getUrlParameter(name) {
    name = name.replace(/[

\[]/, '\

\[').replace(/[\]

]/, '\\]

');
    const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', async () => {
    const username = getUrlParameter('user');
    const rank = parseInt(getUrlParameter('rank'), 10) || 0;

    if (username) {
        const language = await getMostUsedLanguage(username, rank);
        console.log(`Language #${rank + 1} for ${username}: ${language}`);
    } else {
        console.error('User parameter is missing');
    }
});
