// Funkcja sprawdza czy dany element znajduje się już w bazie danych
async function checkIfDataAlreadyExists(selector) {
    let dbResponse = await database.find({ selector: selector });
    if (dbResponse && dbResponse.docs.length > 0) {
        return true;
    } else {
        return false;
    }
}
