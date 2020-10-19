module.exports = config => { //Wat eleventy moet meenemen, maar niet bewerken
	config.addPassthroughCopy('./src/img/');
	config.addPassthroughCopy('./src/css/');
	config.addPassthroughCopy('./src/js/');
	config.setDataDeepMerge(true); //Gaat kijken naar bestanden zoals post.json

	// Returns work items, sorted by display order
	// Elk md bestand in de map work, mag toegevoegd worden aan de collectie work
	//Deze bestanden worden alfatbetisch gerangschikt
	config.addCollection('work', collection => {
  return collection
    .getFilteredByGlob('./src/work/*.md')
    .sort((a, b) => (Number(a.data.displayOrder) > Number(b.data.displayOrder) ? 1 : -1));
	});

	// Returns "featured" work items, sorted by display order
	//Alleen werken die featured: true hebben, worden toegevoegd. Als je werken niet wil tonen moet je dit op false zetten. Aha!
	//Cool allemaal
	config.addCollection('featuredWork', collection => {
  return collection
    .getFilteredByGlob('./src/work/*.md')
    .sort((a, b) => (Number(a.data.displayOrder) > Number(b.data.displayOrder) ? 1 : -1))
    .filter(x => x.data.featured);
	});

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
