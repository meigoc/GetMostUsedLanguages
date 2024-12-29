# GetMostUsedLanguages
The function fetches a GitHub user's repositories, counts the languages used, and returns the language most frequently used based on the specified rank.
# Example:
```
https://get-most-used-languages.vercel.app/?user=meigoc&rank=6
```
# Use in own code:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Language Example</title>
</head>
<body>
    <h1>Most Used Language</h1>
    <p id="output">Loading...</p>
    
    <script src="https://get-most-used-languages.vercel.app/src/script.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const username = 'meigoc';
            const rank = 0;
            const language = await getMostUsedLanguage(username, rank, true);

            console.log(`Most used language for ${username}: ${language}`);
        });
    </script>
</body>
</html>
```
