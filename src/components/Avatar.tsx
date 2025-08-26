'use client'

import { useState } from 'react';
import Image from 'next/image';
import styles from './Avatar.module.css';

interface AvatarProps {
  src: string;
  alt: string;
  size: number;
}

export default function Avatar({ src, alt, size }: AvatarProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.avatar} style={{ width: size, height: size }}>
      {isLoading && <div className={styles.skeleton} style={{ width: size, height: size }} />}
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
