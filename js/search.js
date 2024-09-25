<script>
  document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const query = searchInput.value.toLowerCase();

      // Fetch both the articles and projects JSON files
      Promise.all([
        fetch('../projects/projects.json').then(res => res.json()),
        fetch('../articles/articles.json').then(res => res.json())
      ]).then(([projects, articles]) => {
        let results = [];

        // Search Projects
        projects.forEach(project => {
          if (project.title.toLowerCase().includes(query) || project.excerpt.toLowerCase().includes(query)) {
            results.push({
              type: 'Project',
              title: project.title,
              link: project.link
            });
          }
        });

        // Search Articles
        articles.forEach(article => {
          if (article.title.toLowerCase().includes(query) || article.excerpt.toLowerCase().includes(query)) {
            results.push({
              type: 'Article',
              title: article.title,
              link: article.link
            });
          }
        });

        displayResults(results);
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    });

    function displayResults(results) {
      let resultsContainer = document.getElementById('search-results');
      resultsContainer.innerHTML = '';  // Clear previous results

      if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
        return;
      }

      // Generate HTML for each result
      results.forEach(result => {
        let resultHTML = `
          <div class="search-result-item">
            <p><strong>${result.type}:</strong> <a href="${result.link}">${result.title}</a></p>
          </div>
        `;
        resultsContainer.innerHTML += resultHTML;
      });
    }
  });
</script>
// JavaScript Document