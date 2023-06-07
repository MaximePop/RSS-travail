// Fetch the RSS feed and render it
fetch('rss.xml')
  .then(response => response.text())
  .then(xml => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');

    const rssItems = xmlDoc.querySelectorAll('item');
    const rssFeedElement = document.getElementById('rss-feed');

    rssItems.forEach(item => {
      const title = item.querySelector('title').textContent;
      const link = item.querySelector('link').textContent;
      const description = item.querySelector('description').textContent;

      const itemElement = document.createElement('div');
      itemElement.classList.add('item');

      const titleElement = document.createElement('div');
      titleElement.classList.add('title');
      titleElement.innerHTML = title;

      const linkElement = document.createElement('a');
      linkElement.classList.add('link');
      linkElement.href = link;
      linkElement.innerHTML = 'Read more';

      const descriptionElement = document.createElement('div');
      descriptionElement.classList.add('description');
      descriptionElement.innerHTML = description;

      itemElement.appendChild(titleElement);
      itemElement.appendChild(linkElement);
      itemElement.appendChild(descriptionElement);

      rssFeedElement.appendChild(itemElement);
    });
  })
  .catch(error => {
    console.error('Error fetching RSS feed:', error);
  });
