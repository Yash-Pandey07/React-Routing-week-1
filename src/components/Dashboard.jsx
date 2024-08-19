import { useState ,useEffect} from 'react'

export default function Dashboard() {
    useEffect(() => {
        console.log('Navigated to Dashboard Page');
    }, []); // Empty dependency array means this runs only on mount

    return <div>
        Dashboard        
    </div>
}