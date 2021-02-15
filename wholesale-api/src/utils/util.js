// Funkcja sprawdza czy dany element znajduje się już w bazie danych
export async function checkIfDataAlreadyExists(selector, database) {
  let dbResponse = await database.find({ selector: selector });
  return dbResponse && dbResponse.docs.length > 0;
}
