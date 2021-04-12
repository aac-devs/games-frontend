export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("upload_preset", "videogames");
  formData.append("file", imageFile);
  const url = "https://api.cloudinary.com/v1_1/aac-devs-data/image/upload";
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    return null;
  }
};
