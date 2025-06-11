/** Type declarations for image file imports in TypeScript */
declare module '*.png' {
    /** String path to the PNG image file */
    const content: string;
    export default content;
}

/** Type declarations for image file imports in TypeScript */
declare module '*.jpg' {
    /** String path to the JPG image file */
    const content: string;
    export default content;
}

/** Type declarations for image file imports in TypeScript */
declare module '*.jpeg' {
    /** String path to the JPEG image file */
    const content: string;
    export default content;
}

/** Type declarations for image file imports in TypeScript */
declare module '*.gif' {
    /** String path to the GIF image file */
    const content: string;
    export default content;
}

/** Type declarations for SVG imports as React components */
declare module '*.svg' {
    /** React component for the SVG with SVG element props */
    const content: React.FC<React.SVGProps<SVGSVGElement>>;
    export default content;
}
