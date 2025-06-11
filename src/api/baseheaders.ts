/**
 * Default HTTP headers configuration for API requests.
 * These headers are used across all API calls to ensure consistent
 * content type negotiation and response handling.
 *
 * @constant
 * @type {{
 *   'Content-Type': string,
 *   'Accept': string
 * }}
 */
const baseHeaders = {
    'Content-Type': 'application/json', // Specifies that the request body is JSON
    Accept: 'application/json', // Indicates that the client expects JSON response
};

export default baseHeaders;
