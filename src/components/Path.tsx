import { Link,useLocation } from 'react-router-dom';

export default function Path(){
        const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    return(
        <div className='w-full mt-25 bg-white'>
            <nav className="flex space-x-2 text-gray-700 p-4">
            {/* link หน้าแรก */}
            <Link to="/" className="hover:underline">Home</Link>

            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                return (
                <span key={routeTo} className="flex items-center">
                    <span className="mx-2">/</span>
                    {isLast ? (
                    <span className="font-bold">{name}</span>
                    ) : (
                    <Link to={routeTo} className="hover:underline">{name}</Link>
                    )}
                </span>
                );
            })}
            </nav>
                
        </div>
    )

}
