import { useEffect, useMemo, useRef, useState } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import { Button, Input } from 'antd';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.js'

function Audio() {
  const [audioUrl, setAudioUrl] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(5);
  const [regionStartTime, setRegionStartTime] = useState<undefined | number>(undefined);
  const [regionEndTime, setRegionEndTime] = useState<undefined | number>(undefined);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const regionsPlugin = useMemo(() => RegionsPlugin.create(), []);
  const timePlugin = useMemo(() => Timeline.create(), []);
  const plugins = useMemo(() => [regionsPlugin, timePlugin], [regionsPlugin, timePlugin]);

  useEffect(() => {
    setTimeout(() => {
      setAudioUrl('https://vjs.zencdn.net/v/oceans.mp4');
    }, 1000);
  }, [])

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: audioUrl,
    waveColor: 'purple',
    height: 100,
    normalize: true,
    plugins
  });

  // 初始加载时添加默认区域
  useEffect(() => {
    if (wavesurfer) {
      addRegion(0, 5);
      if (regionsPlugin) {
        regionsPlugin.on('region-updated', (region) => {
          console.log('Region updated:', region.start, region.end);
          setRegionStartTime(region.start);
          setRegionEndTime(region.end);
        });
      }
    }
  }, [wavesurfer]);

  // 提取添加区域逻辑到一个函数
  const addRegion = (start: number, end: number) => {
    if (wavesurfer) {
      if (regionsPlugin) {
        regionsPlugin.addRegion({
          start,
          end,
          color: 'rgba(0, 255, 0, 0.1)',
          drag: true,
          resize: true
        });
      }
    }
  };

  // 处理用户手动添加区域
  const handleAddRegion = () => {
    if (startTime < endTime) {
      addRegion(startTime, endTime);
    } else {
      console.error('Start time must be less than end time.');
    }
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause()
  };

  return (
    <div className='p-30px'>
      <div className='flex items-center flex-wrap'>
        <Input
          type="number"
          className='!w-100px !mr-5px'
          value={startTime}
          onChange={(e) => setStartTime(Number(e.target.value))}
          placeholder="开始时间"
        />
        <Input
          type="number"
          className='!w-100px !mr-5px'
          value={endTime}
          onChange={(e) => setEndTime(Number(e.target.value))}
          placeholder="结束"
        />
        <Button onClick={handleAddRegion}>
          添加区间
        </Button>
      </div>

      <div ref={containerRef} />

      <div>
        当前时间: {currentTime}
      </div>
      <div>
        区间开始时间: {regionStartTime}
      </div>
      <div>
        区间结束时间: {regionEndTime}
      </div>

      <div>
        状态: {isReady ? '已准备好' : '未准备好'}
      </div>

      {
        isReady &&
        <Button
          type='primary'
          className='mt-10px'
          onClick={onPlayPause}
        >
          {isPlaying ? '停止播放' : '播放'}
        </Button>
      }
    </div>
  )
}

export default Audio

