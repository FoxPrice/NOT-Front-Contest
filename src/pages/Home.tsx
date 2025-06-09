import { FC, useState } from 'react';

import ReactLogo from '~/react.svg?react';

const Home: FC = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div>
            <div>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <ReactLogo />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((prevCount: number) => prevCount + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </div>
    );
};

export default Home;
