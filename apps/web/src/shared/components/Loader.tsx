export function Loader() {
    return (
        <div className="flex justify-center items-center h-svh w-svw">
            <svg
                className="h-12 w-12 fill-yellow-500 animate-loader drop-shadow-xl"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="12" cy="20" r="2" />
                <circle cx="12" cy="4" r="2" />
                <circle cx="6.343" cy="17.657" r="2" />
                <circle cx="17.657" cy="6.343" r="2" />
                <circle cx="4" cy="12" r="2.001" />
                <circle cx="20" cy="12" r="2" />
                <circle cx="6.343" cy="6.344" r="2" />
                <circle cx="17.657" cy="17.658" r="2" />
            </svg>
        </div>
    );
}
