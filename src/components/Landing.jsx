import { useState ,useEffect} from 'react'

export default function Landing() {
    useEffect(() => {
        console.log('Navigated to Landing Page');
    }, []); // Empty dependency array means this runs only on mount

    return <div>
        Landing Page
    </div>
}