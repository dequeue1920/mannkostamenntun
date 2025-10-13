// CSRF Protection Middleware
const crypto = require('crypto');
const { promisify } = require('util');
const randomBytes = promisify(crypto.randomBytes);

class CSRFProtection {
    constructor(options = {}) {
        this.cookieName = options.cookieName || 'XSRF-TOKEN';
        this.headerName = options.headerName || 'X-XSRF-TOKEN';
        this.secure = options.secure !== false;
        this.tokenLength = options.tokenLength || 32;
    }

    // Generate CSRF token
    async generateToken() {
        const buffer = await randomBytes(this.tokenLength);
        return buffer.toString('hex');
    }

    // Validate token
    validateToken(token, storedToken) {
        if (!token || !storedToken) {
            return false;
        }
        return crypto.timingSafeEqual(
            Buffer.from(token),
            Buffer.from(storedToken)
        );
    }

    // Middleware function
    middleware() {
        return async (req, res, next) => {
            // Skip for non-mutating methods
            if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
                return next();
            }

            try {
                // Get tokens from cookie and header
                const cookieToken = req.cookies[this.cookieName];
                const headerToken = req.get(this.headerName);

                // Validate tokens
                if (!this.validateToken(headerToken, cookieToken)) {
                    return res.status(403).json({
                        error: 'CSRF token validation failed'
                    });
                }

                next();
            } catch (error) {
                next(error);
            }
        };
    }

    // Token provider middleware
    tokenProvider() {
        return async (req, res, next) => {
            try {
                if (!req.cookies[this.cookieName]) {
                    const token = await this.generateToken();
                    res.cookie(this.cookieName, token, {
                        httpOnly: true,
                        secure: this.secure,
                        sameSite: 'strict'
                    });
                }
                next();
            } catch (error) {
                next(error);
            }
        };
    }
}

module.exports = CSRFProtection;