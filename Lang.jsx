import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function LanguageSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('cn');
  const [step, setStep] = useState(1); // 初始化 step 状态

  // 获取浏览器语言并设置初始语言
  useEffect(() => {
    const preferredLanguage = navigator.language || navigator.userLanguage;
    const initialLanguage = getInitialLanguage(preferredLanguage);
    setCurrentLanguage(initialLanguage);
    localStorage.setItem('language', initialLanguage);

    // 设置初始 URL
    const initialPath = `${initialLanguage}/home/${step}`;
    navigate(initialPath);
  }, []);

  // 根据浏览器语言设置初始语言
  function getInitialLanguage(preferredLanguage) {
    if (preferredLanguage.startsWith('zh')) {
      return 'cn';
    }
    return 'en'; // 默认为英语
  }

  // 更新语言并导航
  const switchLanguage = (lang) => {
    // 更新当前语言状态
    setCurrentLanguage(lang);
    // 保存到本地存储
    localStorage.setItem('language', lang);

    // 构建目标路径
    const newPath = `${lang}/home/${step}`;
    navigate(newPath);
  };

  // 更新 step 并导航
  const updateStep = (newStep) => {
    setStep(newStep);

    // 构建目标路径
    const newPath = `${currentLanguage}/home/${newStep}`;
    navigate(newPath);
  };

  return (
    <div>
      <button onClick={() => switchLanguage('cn')}>Switch to Chinese</button>
      <button onClick={() => switchLanguage('en')}>Switch to English</button>
      <p>Current Step: {step}</p>
      <button onClick={() => updateStep(step + 1)}>Increase Step</button>
      <button onClick={() => updateStep(step - 1)}>Decrease Step</button>
    </div>
  );
}

export default LanguageSwitcher;