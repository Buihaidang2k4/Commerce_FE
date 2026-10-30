import logo from "@/assets/image/mylogo.png"
import useFindImageByProductId from "../../hooks/image/useFindImageByProductId"

export default function ProductImage({ productId }) {
    const { data: images, isLoading } = useFindImageByProductId(productId)

    if (isLoading) {
        return (
            <div className="w-16 h-16 bg-gray-100 rounded border" />
        )
    }

    return (
        <img
            src={images?.[0] || logo}
            alt="Product"
            className="w-full h-full object-cover"
        />
    )
}
