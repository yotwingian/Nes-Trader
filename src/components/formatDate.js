function formatDateString(s) {

  const year = s.substring(0, 4);
  const month = s.substring(5, 7);
  const day = s.substring(8, 10);
  const hour = s.substring(11, 13);
  const minute = s.substring(14, 16);
  const second = s.substring(17, 19);

  const formatedData = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  
  
  console.log(formatedData)
  
  return formatedData

}


export {formatDateString}