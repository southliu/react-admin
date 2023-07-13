import { useEffect } from 'react';
import { App } from 'antd';
import { HashRouter as Router } from 'react-router-dom';
import nprogress from 'nprogress';
import AppPage from './App';
import StaticAntd from '@/utils/staticAntd';

// antd
import { theme, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

// antd主题
const { defaultAlgorithm, darkAlgorithm } = theme;

// keepalive
import { AliveScope } from 'react-activation';

import { useCommonStore } from '@/hooks/useCommonStore';

function Page() {
  const { theme } = useCommonStore();

  // 顶部进度条
  useEffect(() => {
    nprogress.done();

    // 关闭loading
    const firstElement = document.getElementById('first');
    if (firstElement && firstElement.style?.display !== 'none') {
      firstElement.style.display = 'none';
    }

    return () => {
      nprogress.start();
    };
  }, []);

  return (
    <Router>
      <ConfigProvider
        locale={zhCN}
        theme={{
          algorithm: [theme === 'dark' ? darkAlgorithm : defaultAlgorithm]
        }}
      >
        <App>
          <StaticAntd />
          <AliveScope>
            <AppPage />
          </AliveScope>
        </App>
      </ConfigProvider>
    </Router>
  );
}

export default Page;