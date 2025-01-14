export const DBFilter = query => {
    try {
        const { page, limit, ...restquery } = query;
        const filter = { ...restquery };
        return filter;
    } catch (err) {
        throw err
    }
};
