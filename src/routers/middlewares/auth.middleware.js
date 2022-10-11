const validateIsAdminMiddleware = (req, res, next) => {
    const isAdmin = true; // @todo: make this logic real
    if(!isAdmin) {
        return res.status(401).json({
            error: -1,
            description: `Route ${req.originalUrl} Method ${req.method} unauthorized`,
        })
    }
    next();
}

export { validateIsAdminMiddleware }