
export function sortItems(sortedItems, sortType) {
  switch (sortType) {
    case 'title':
      sortedItems.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'releaseYear':
      sortedItems.sort((a, b) => a.releaseYear - b.releaseYear)
      break
    case 'endingSoon':
      sortedItems.sort((a, b) => new Date(a.endDateTime) - new Date(b.endDateTime))
      break
    case 'latest':
      sortedItems.sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime))
      break
    default:
      break
  }
  return sortedItems;
}
