import { useEffect, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import WavesurferPlayer from '@wavesurfer/react';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import WaveSurfer from 'wavesurfer.js';

function Audio() {
  const [audioUrl, setAudioUrl] = useState('');
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(5);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setAudioUrl('https://vjs.zencdn.net/v/oceans.mp4');
    }, 1000);
  }, [])

  const onReady = (ws: WaveSurfer | null) => {
    console.log('ws:', ws)
    setWavesurfer(ws);
    setIsPlaying(false);
  }

  // 提取添加区域逻辑到一个函数
  const addRegion = (start: number, end: number) => {
    if (wavesurfer) {
      const regionsPlugin = wavesurfer.getActivePlugins().find(
        (plugin) => plugin instanceof RegionsPlugin
      );
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
  }

  return (
    <div className='p-30px'>
      <Input
        type="number"
        value={startTime}
        onChange={(e) => setStartTime(Number(e.target.value))}
        placeholder="Start time"
      />
      <Input
        type="number"
        value={endTime}
        onChange={(e) => setEndTime(Number(e.target.value))}
        placeholder="End time"
      />
      <Button onClick={handleAddRegion}>Add Region</Button>

      <div ref={containerRef} />
{/*
      <div>
        当前时间: {currentTime}
      </div>

      <div>
        状态: {isReady ? '已准备好' : '未准备好'}
      </div> */}

      <WavesurferPlayer
        height={100}
        waveColor="violet"
        url={audioUrl}
        onReady={onReady}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />


      <Button onClick={onPlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
    </div>
  )
}

export default Audio

