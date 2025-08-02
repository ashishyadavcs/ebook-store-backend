export const ebookreviews = [
    {
        $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "ebook",
            as: "reviews",
        },
    },
    {
        $addFields: {
            averageRating: { $round: [{ $avg: "$reviews.rating" }, 1] },
            totalReviews: { $size: "$reviews" },
        },
    },
    {
        $project: {
            _id: 1,
            title: 1,
            price: 1,
            author: 1,
            description: 1,
            coverImageUrl: 1,
            averageRating: 1,
            totalReviews: 1,
        },
    },
];
export const ebookReviewsWithUser = [
    {
        $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "ebook",
            as: "reviews",
        },
    },
    {
        $addFields: {
            averageRating: { $round: [{ $avg: "$reviews.rating" }, 1] },
            totalReviews: { $size: "$reviews" },
        },
    },
    {
        $project: {
            _id: 1,
            title: 1,
            author: 1,
            price: 1,
            description: 1,
            coverImageUrl: 1,
            averageRating: 1,
            totalReviews: 1,
            reviews: 1,
        },
    },
];
