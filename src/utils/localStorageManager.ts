/**
 * Clear and update localStorage if it has stale data
 * Call this on app initialization to ensure all sections are present
 */
export const ensureLocalStorageIsValid = (freshData: any) => {
  try {
    const saved = localStorage.getItem('website_content');
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // Check if saved data is missing new sections
      const hasAllSections = 
        parsed.global &&
        parsed.hero &&
        parsed.about &&
        parsed.services &&
        parsed.work &&
        parsed.contact &&
        parsed.navbar &&
        parsed.marquee &&
        parsed.textReveal &&
        parsed.testimonials;

      if (!hasAllSections) {
        console.log('⚠️ Stale localStorage detected. Clearing and refreshing...');
        localStorage.removeItem('website_content');
        // Save the fresh merged data
        localStorage.setItem('website_content', JSON.stringify(freshData));
      }
    }
  } catch (error) {
    console.warn('Failed to validate localStorage:', error);
    localStorage.removeItem('website_content');
  }
};
