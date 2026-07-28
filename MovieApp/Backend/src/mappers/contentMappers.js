export const mapContent = (content) => {
    return {
        id: content.id,
        title: content.title,
        description: content.description,
        image: content.thumbnail,
        year: content.release_year,
        ageRating: content.age_rating,
        rating: Number(content.rating),
        duration: content.duration,
        type: content.type,
        badge: content.badge,
        topTen: content.top_ten,
        newRelease: content.new_release,
        genres: content.genres ?? []
    };
};