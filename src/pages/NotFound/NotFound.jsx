import './NotFound.css';

const NotFound = () => (
    <div className="notfound">
        <div className="notfound-container">
            <div className="nf-window">
                <div className="nf-window-header">
                    <div className="nf-dots">
                        <span className="dot dot-close"></span>
                        <span className="dot dot-minimize"></span>
                        <span className="dot dot-maximize"></span>
                    </div>
                    <span className="code-comment">{'// 404.js'}</span>
                </div>

                <div className="nf-content">
                    <div className="nf-line">
                        <span className="code-keyword">throw new</span>
                        {' '}
                        <span className="code-function">Error</span>
                        <span className="code-bracket">{'('}</span>
                    </div>

                    <div className="nf-line nf-indent">
                        <span className="code-string">"404: page.js not found"</span>
                        <span className="code-bracket">,</span>
                    </div>

                    <div className="nf-line nf-indent">
                        <span className="code-comment">{'// are you lost? this route does not exist'}</span>
                    </div>

                    <div className="nf-line">
                        <span className="code-bracket">{')'}</span>
                        <span className="code-bracket">;</span>
                    </div>

                    <div className="nf-number">404</div>

                    <button
                        className="nf-btn"
                        onClick={() => window.location.replace('/')}
                    >
                        <span className="code-function">goHome</span>
                        <span className="code-bracket">()</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default NotFound;
