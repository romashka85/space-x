//Converting date format
export const launchDate = (launchDate) => {
  const date = new Date(launchDate);
  const year = date.getFullYear();
  let month = date.getMonth()+1;
  let dt = date.getDate();

  if (dt < 10) {
  dt = '0' + dt;
  }
  if (month < 10) {
  month = '0' + month;
  }  
  return(year+'-' + month + '-'+dt)
}