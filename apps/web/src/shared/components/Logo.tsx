import { Cloud } from "lucide-react";

export function Logo() {
    return (
        <div className="flex flex-row items-center gap-x-4 text-2xl px-8 py-10 font-medium pointer-events-none">
            <span className="rounded-full bg-yellow-500 p-1">
                <Cloud className="fill-background text-background" size={25} />
            </span>
            Cloud Storage
        </div>
    );
}
