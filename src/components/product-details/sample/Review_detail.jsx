import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Review_detail({ review }) {

    if (!review) return null;

    const {
        customerName = "Anonymous",
        rating = 0,
        comment = "",
        createdAt
    } = review;

    return (
        <div className="p-5 rounded-xl mb-5 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                
                {/* Avatar + name + date */}
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border border-gray-300 shadow-inner">
                        <FontAwesomeIcon
                            icon={faUserAstronaut}
                            className="text-gray-500 text-2xl"
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 text-lg">
                            {customerName}
                        </span>

                        <span className="text-gray-400 text-sm">
                            {new Date(createdAt).toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Rating */}
                <div className="text-yellow-500 text-lg font-bold">
                    {"★".repeat(rating)}
                    {"☆".repeat(5 - rating)}
                </div>
            </div>

            {/* Comment */}
            <p className="text-gray-700 text-base leading-relaxed mt-1">
                {comment}
            </p>

        </div>
    );
}
