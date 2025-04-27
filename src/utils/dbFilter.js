export const DBFilter = query => {
    try {
        const { page, limit, ...restquery } = query;
        const filter = { ...restquery, title: { $regex: restquery.title, $options: "i" } };
        return filter;
    } catch (err) {
        throw err;
    }
};
