/**
 * Formats a Unix timestamp into a human-readable date string.
 * Converts timestamp to format: "DD MMM 'YY" (e.g., "15 Jan '24")
 *
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Formatted date string
 *
 * @example
 * formatDate(1705334400) // Returns "15 Jan '24"
 */
export const formatDate = (timestamp: number): string => {
    // Convert Unix timestamp to milliseconds
    const date = new Date(timestamp * 1000);

    // Array of abbreviated month names
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    // Extract date components
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of year

    // Return formatted date string
    return `${day} ${month} '${year}`;
};
