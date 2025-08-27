'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './ScrollIndicator.module.css';

const ScrollIndicator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // 重置滚动百分比
    setScrollPercentage(0);

    const handleScroll = () => {
      let scrollTop = 0;
      let scrollHeight = 0;
      let clientHeight = 0;

      // 检查是否有内部滚动容器
      const scrollContainer = document.querySelector('.absolute.inset-0.overflow-y-auto');
      
      if (scrollContainer) {
        // 如果有内部滚动容器，使用它的滚动值
        scrollTop = scrollContainer.scrollTop;
        scrollHeight = scrollContainer.scrollHeight;
        clientHeight = scrollContainer.clientHeight;
      } else {
        // 否则使用文档的滚动值
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = document.documentElement.clientHeight;
      }

      const height = scrollHeight - clientHeight;
      const scrolled = height > 0 ? (scrollTop / height) * 100 : 0;
      setScrollPercentage(scrolled);
    };

    // 使用 setTimeout 确保 DOM 已更新
    const timeoutId = setTimeout(() => {
      // 监听窗口滚动
      window.addEventListener('scroll', handleScroll);
      
      // 监听内部容器滚动
      const scrollContainer = document.querySelector('.absolute.inset-0.overflow-y-auto');
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
      }

      // 初始化
      handleScroll();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      const scrollContainer = document.querySelector('.absolute.inset-0.overflow-y-auto');
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname]); // 依赖 pathname，路由变化时重新初始化

  return (
    <div
      className={styles.scrollIndicator}
      style={{ width: `${scrollPercentage}%` }}
    />
  );
};

export default ScrollIndicator;
