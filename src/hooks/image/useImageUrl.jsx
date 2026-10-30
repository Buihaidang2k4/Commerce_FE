import imageService from "../../services/imageSerice";
import { useState, useEffect } from "react";
import imgDefault from "../../assets/image/mylogo.png"

export default function useImageUrl(images) {
  const [imageUrl, setImageUrl] = useState(imgDefault);

  useEffect(() => {
    const fetchImage = async () => {
      if (!Array.isArray(images) || images.length === 0) {
        setImageUrl(imgDefault);
        return;
      }

      const validImages = images.filter(img => !!img?.downloadUrl);
      if (validImages.length === 0) {
        setImageUrl(imgDefault);
        return;
      }

      const randomIndex = Math.floor(Math.random() * validImages.length);
      const imageId = validImages[randomIndex].id;

      if (imageId !== null && imageId !== undefined) {
        try {
          const res = await imageService.getImageById(imageId);
          const url = URL.createObjectURL(res.data);
          setImageUrl(url);
        } catch (err) {
          console.error("Error fetching image blob", err);
          setImageUrl(imgDefault);
        }
      } else {
        setImageUrl(`${imgDefault}`);
      }
    };

    fetchImage();
  }, [images]);

  return imageUrl;


}
