const Logo = ({className}: { className?: string }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100">
            <g transform="translate(75,50) rotate(-51) translate(-40,-40)">
                <path d="M0,30 A46,80 0 0,1 80,30" fill="none" strokeWidth="4"
                      strokeLinecap="round"/>
                <path d="M0,30 L80,30 L40,80 Z" fill="none" strokeWidth="4"
                      strokeLinejoin="round"/>
            </g>
            <line x1="65" y1="46" x2="99" y2="46" strokeWidth="4"/>
        </svg>
    )
}


export default Logo
