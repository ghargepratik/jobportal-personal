export const convertDateFormate = (time) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      
    }
    let date = new Date(time).toLocaleDateString('en-IN', options)
    date = date.replaceAll('/', '-')
    
    return date
  }