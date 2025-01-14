export const errorhandler = (err, req, res, next) => {
    if (err instanceof Error) {
        res.status(err.status || 500).json({
            success: false,
            errors: [
                {
                    type: err.name,
                    msg: err.message,
                },
            ],
        });
    }
};
