import { useQuery } from "@tanstack/react-query";
import imageService from "../../services/imageSerice";
import imgDefault from "../../assets/image/mylogo.png";

export default function useFindImageByProductId(productId) {
    return useQuery({
        queryKey: ["product-images", productId],
        enabled: !!productId,

        queryFn: async () => {
            try {
                const { data } = await imageService.getImagesByProductId(productId);
                const imageList = data?.data || [];

                if (imageList.length === 0) return [imgDefault];
                // Chuyển ảnh blob thành URL
                const imageUrls = await Promise.all(
                    imageList.map(async (img) => {
                        if (!img?.id) return imgDefault;
                        if (!img?.downloadUrl) return imgDefault;

                        try {
                            const res = await imageService.getImageById(img.id);
                            return URL.createObjectURL(res.data);
                        } catch (e) {
                            console.error("Error fetching image blob", e);
                            return imgDefault;
                        }
                    })
                );
                return imageUrls;
            } catch (error) {
                console.log(" Fetching error" + error);
                return [imgDefault];
            }
        },

        staleTime: 1000 * 60 * 5,
        retry: 0, 
    });
}
