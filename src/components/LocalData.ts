export const getLocalData = (item:any) => {
    const qString = localStorage.getItem(item);
    let qArray = [];
    if (qString) {
      qArray = JSON.parse(qString);
      return qArray
    }
}
