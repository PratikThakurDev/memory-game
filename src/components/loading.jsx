import '../styles/loading.css';

export default function LoadingScreen() {
    return (
        <div className="loadingOverlay">
            <iframe
                src="https://my.spline.design/loadinggif-mRk6agF3muq6r8NJ2Oqzh0zV/"
                frameBorder="0"
                width="100%"
                height="100%"
                frameBorder="0"
                width="100%"
                height="100%"
                allow="autoplay; fullscreen"
                title="loading-animation"
            />
        </div>
    );
}
