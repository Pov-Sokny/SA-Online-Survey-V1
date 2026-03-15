
import { LoadingSpinner } from '@/components/loading/loading-spinner';

export default function LoadingComponent() {
    return (

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-[#00a368]/10">
             <div className="h-32 flex items-center justify-center w-full">
                    <LoadingSpinner variant="wave" size="lg" />
                </div>
        </div>
    )
}