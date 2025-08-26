'use client';

import styles from './Nav.module.css'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import ArrowLeft from './icons/ArrowLeft'

const Nav = () => {

    // 实现一个返回跳转
    const router = useRouter()
    const handleClick = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        router.push('/')
    }


    return (
        <nav>
            <div className={` fixed ${styles.navContainer} xs:px-4 w-full` }>
                
                <div className={`${styles.backButtonContainer} `}>
                <Link href={"/"} className='flex flex-row gap-3 items-center w-fit xl:ml-24  xs:px-3' >
                <ArrowLeft/>
                Projects 
                </Link>
                </div>
                
             
            </div>

        </nav>

    )
}

export default Nav;