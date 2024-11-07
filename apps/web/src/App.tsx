import { Button } from "./components/ui/button";

function App() {
    return (
        <>
            <div className="p-5 bg-sky-500 flex items-center justify-center">
                <span className="bg-red-500 text-white font-black text-5xl p-3 rounded-lg">
                    Hello World!
                </span>
            </div>
            <Button>shadcn test</Button>
        </>
    );
}

export default App;
