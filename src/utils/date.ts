//Converting date format
export const launchDate = (launchDate: Date): string => {
  const date = new Date(launchDate);
  const year = date.getFullYear();
  let month: number | string = date.getMonth()+1;
  let dt: number | string= date.getDate();

  if (dt < 10) {
  dt = '0' + dt;
  }
  if (month < 10) {
  month = '0' + month;
  }  
  return(year +'-' + month + '-' + dt)
}