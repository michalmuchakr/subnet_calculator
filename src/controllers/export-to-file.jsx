const exportToFileURL = (objectToSave) => {
  const blob = new Blob([JSON.stringify(objectToSave)], {
    type: "application/json",
  });

  let tempLink = document.createElement("a");
  tempLink.href = URL.createObjectURL(blob);
  tempLink.setAttribute("download", "dane-podsieci.json");
  tempLink.click();
};

export default exportToFileURL;
