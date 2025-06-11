/**
 * Type declaration for SVG imports with React support.
 * Enables importing SVG files as React components with proper typing.
 * Used with the ?react query parameter in import statements.
 */
declare module '*.svg?react' {
    import React from 'react';
    /** React component type for SVG with SVG element props */
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}
