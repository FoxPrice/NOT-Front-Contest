'use client';

import { Provider } from 'react-redux';
import { store } from './index';

/** Redux Provider component that provides access to the Redux store throughout the application.
 * Wraps the entire app to make the store available via React Context.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that need access to the store
 * 
 * @example
 * // Usage in root component
 * function App() {
 *   return (
 *     <ReduxProvider>
 *       <YourApp />
 *     </ReduxProvider>
 *   );
 * }
 */
export function ReduxProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
