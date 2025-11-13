import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { MetricsData, LogEvent, ScalingState } from '../App';

interface MetricsPanelProps {
  metrics: MetricsData[];
  logs?: LogEvent[];
  theme: 'light' | 'dark';
}

interface PhaseArea {
  start: number;
  end: number;
  phase: string;
  color: string;
  scalingState?: ScalingState;
  isCurrentPhase?: boolean; // 标记是否是当前正在进行的阶段
}

interface PrimarySwitchMarker {
  time: number;
  label: string;
}

interface ScalingEventMarker {
  time: number;
  label: string;
  type: 'scale-out' | 'scale-in' | 'switch-primary';
  color: string;
}

export function MetricsPanel({ metrics, logs = [], theme }: MetricsPanelProps) {
  if (metrics.length === 0) {
    return (
      <div className={`rounded-lg p-6 border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <h2 className={`mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-slate-200' : 'text-gray-900'}`}>
          <TrendingUp className={`w-5 h-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
          实时性能监控
        </h2>
        <div className={`text-center py-12 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>等待数据...</div>
      </div>
    );
  }

  // 先用全部数据来检测阶段
  const allData = metrics.map((m) => ({
    time: m.timestamp,
    QPS: Math.round(m.qps),
    TPS: Math.round(m.tps),
    scalingPhase: m.scalingPhase,
    scenario: m.scenario,
    config: m.config,
    scalingState: m.scalingState,
  }));

  // 获取当前最新的场景（从最后一个数据点）
  const currentScenario = allData[allData.length - 1]?.scenario || 'normal';

  console.log('MetricsPanel Debug:', {
    dataPoints: allData.length,
    currentScenario,
    lastDataPoint: allData[allData.length - 1],
    scenarioAreasCount: 0, // 将在后面计算
  });

  // 找到主可用区切换事件的时间戳
  const primarySwitchMarkers: PrimarySwitchMarker[] = logs
    .filter(log => log.isPrimarySwitchEvent)
    .map(log => ({
      time: log.timestamp,
      label: '主可用区切换',
    }));

  // 找到扩缩容阶段的区域（使用全部数据，基于详细的 scalingState）
  const phaseAreas: PhaseArea[] = [];
  let currentState: ScalingState | undefined = allData[0]?.scalingState || 'idle';
  let stateStart = allData[0]?.time || 0;

  allData.forEach((point, idx) => {
    // 检测状态变化或到达最后一个点
    if (point.scalingState !== currentState || idx === allData.length - 1) {
      // 计算结束时间
      const endTime = idx === allData.length - 1 && point.scalingState === currentState 
        ? point.time 
        : point.time;
      
      // 根据详细的 scalingState 生成阶段标记
      if (currentState && currentState !== 'idle') {
        let label = '';
        let color = '';
        
        switch (currentState) {
          case 'scaling-out':
            label = '扩容：添加新Zone+同步';
            color = '#eab308'; // 黄色
            break;
          case 'switching-primary':
            label = '切换主可用区';
            color = '#a855f7'; // 紫色
            break;
          case 'scaling-out-migrating':
            label = '扩容：删除旧Zone';
            color = '#f97316'; // 橙色
            break;
          case 'scaling-in':
            label = '缩容：添加新Zone+同步';
            color = '#eab308'; // 黄色
            break;
          case 'scaling-in-migrating':
            label = '缩容：删除旧Zone';
            color = '#f97316'; // 橙色
            break;
        }
        
        if (label && endTime >= stateStart) {
          phaseAreas.push({
            start: stateStart,
            end: endTime,
            phase: label,
            color,
            scalingState: currentState,
          });
        }
      }

      currentState = point.scalingState;
      stateStart = point.time;
    }
  });

  // 找到场景阶段的区域（使用全部数据）
  const scenarioAreas: PhaseArea[] = [];
  
  if (allData.length > 0) {
    let currentScen = allData[0]?.scenario || 'normal';
    let scenStart = allData[0]?.time || 0;

    allData.forEach((point, idx) => {
      // 检测场景变化
      if (point.scenario !== currentScen) {
        // 记录前一个阶段
        let label = '';
        let color = '';
        switch (currentScen) {
          case 'normal':
            label = '正常流量';
            color = '#64748b';
            break;
          case 'warming-up':
            label = '大促预热';
            color = '#f59e0b';
            break;
          case 'peak':
            label = '大促高峰';
            color = '#ef4444';
            break;
          case 'cooling-down':
            label = '大促降温';
            color = '#10b981';
            break;
        }
        
        if (label) {
          scenarioAreas.push({
            start: scenStart,
            end: point.time,
            phase: label,
            color,
          });
        }

        // 开始新的阶段
        currentScen = point.scenario || 'normal';
        scenStart = point.time;
      }
      
      // 如果是最后一个点，记录当前正在进行的阶段
      if (idx === allData.length - 1) {
        let label = '';
        let color = '';
        switch (currentScen) {
          case 'normal':
            label = '正常流量';
            color = '#64748b';
            break;
          case 'warming-up':
            label = '大促预热';
            color = '#f59e0b';
            break;
          case 'peak':
            label = '大促高峰';
            color = '#ef4444';
            break;
          case 'cooling-down':
            label = '大促降温';
            color = '#10b981';
            break;
        }
        
        if (label) {
          scenarioAreas.push({
            start: scenStart,
            end: point.time + 1000, // 延伸到最后一个点之后，确保当前阶段可见
            phase: label,
            color,
            isCurrentPhase: true, // 标记为当前正在进行的阶段
          });
        }
      }
    });
  }

  console.log('Scenario Areas:', scenarioAreas);
  console.log('Current Scenario from last data:', currentScenario);

  // 使用最后90个数据点（1分30秒的数据），确保能看到更多历史事件
  const displayMetrics = metrics.slice(-90);
  
  const chartData = displayMetrics.map((m) => ({
    time: m.timestamp,
    QPS: Math.round(m.qps),
    TPS: Math.round(m.tps),
    scalingPhase: m.scalingPhase,
    scenario: m.scenario,
  }));

  // 获取图表显示的时间窗口
  const chartStartTime = chartData[0]?.time || 0;
  const chartEndTime = chartData[chartData.length - 1]?.time || 0;

  // 过滤并裁剪阶段区域，使其只显示在当前时间窗口内的部分
  const visiblePhaseAreas = phaseAreas
    .filter(area => area.end >= chartStartTime && area.start <= chartEndTime)
    .map(area => ({
      ...area,
      start: Math.max(area.start, chartStartTime),
      end: Math.min(area.end, chartEndTime),
    }));

  const visibleScenarioAreas = scenarioAreas
    .filter(area => area.end >= chartStartTime && area.start <= chartEndTime)
    .map(area => ({
      ...area,
      start: Math.max(area.start, chartStartTime),
      end: Math.min(area.end, chartEndTime),
    }));

  // 过滤在当前图表时间窗口内的主区切换标记
  const visiblePrimarySwitchMarkers = primarySwitchMarkers.filter(
    marker => marker.time >= chartStartTime && marker.time <= chartEndTime
  );

  // 检测扩缩容关键事件：开始扩容、扩容后切主、开始缩容、缩容后切主
  const scalingEventMarkers: ScalingEventMarker[] = [];
  let prevState: ScalingState | undefined = undefined;
  let lastScalingType: 'scale-out' | 'scale-in' | null = null; // 记录最近的扩缩容类型
  
  allData.forEach((point, idx) => {
    const currentState = point.scalingState;
    
    // 避免初始状态为 undefined
    if (idx === 0) {
      prevState = currentState;
      return;
    }
    
    // 检测从 idle 到 scaling-out（开始扩容）
    if (prevState === 'idle' && currentState === 'scaling-out') {
      scalingEventMarkers.push({
        time: point.time,
        label: '开始扩容',
        type: 'scale-out',
        color: '#22c55e', // 绿色
      });
      lastScalingType = 'scale-out'; // 记录为扩容
    }
    // 检测扩容后的切主（从 scaling-out 到 switching-primary）
    else if (prevState === 'scaling-out' && currentState === 'switching-primary') {
      // 根据最近的扩缩容类型判断：如果最近是扩容，则这是扩容后切主
      if (lastScalingType === 'scale-out') {
        scalingEventMarkers.push({
          time: point.time,
          label: '扩容后切主',
          type: 'switch-primary',
          color: '#a855f7', // 紫色
        });
      }
    }
    // 检测从 idle 到 scaling-in（开始缩容）
    else if (prevState === 'idle' && currentState === 'scaling-in') {
      scalingEventMarkers.push({
        time: point.time,
        label: '开始缩容',
        type: 'scale-in',
        color: '#f59e0b', // 橙色
      });
      lastScalingType = 'scale-in'; // 记录为缩容
    }
    // 检测缩容后的切主（从 scaling-in 到 switching-primary）
    else if (prevState === 'scaling-in' && currentState === 'switching-primary') {
      // 根据最近的扩缩容类型判断：如果最近是缩容，则这是缩容后切主
      if (lastScalingType === 'scale-in') {
        scalingEventMarkers.push({
          time: point.time,
          label: '缩容后切主',
          type: 'switch-primary',
          color: '#a855f7', // 紫色
        });
      }
    }
    
    prevState = currentState;
  });

  console.log('扩缩容事件标记:', scalingEventMarkers);

  // 过滤在当前图表时间窗口内的扩缩容事件标记
  const visibleScalingEventMarkers = scalingEventMarkers.filter(
    marker => marker.time >= chartStartTime && marker.time <= chartEndTime
  );

  // 格式化时间显示
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={`rounded-lg p-4 h-full flex flex-col border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
      <h2 className={`mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-slate-200' : 'text-gray-900'}`}>
        <TrendingUp className={`w-5 h-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
        实时性能监控
      </h2>

      {/* QPS & TPS Chart */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-blue-500" />
              <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>QPS (查询/秒)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-purple-500" />
              <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>TPS (事务/秒)</span>
            </div>
          </div>
        </div>

        <div className={`rounded-lg p-2 flex-1 ${theme === 'dark' ? 'bg-slate-800/30' : 'bg-gray-100'}`}>
          {/* Chart with exact width control */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData}
              margin={{ top: 25, right: 30, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b" 
                tick={{ fontSize: 11 }}
                tickFormatter={formatTime}
              />
              <YAxis 
                stroke="#64748b" 
                tick={{ fontSize: 11 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                width={30}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
                labelFormatter={formatTime}
              />

              {/* 主可用区切换的垂直线标记 */}
              {visiblePrimarySwitchMarkers.map((marker, idx) => (
                <ReferenceLine
                  key={`switch-${idx}`}
                  x={marker.time}
                  stroke="#a855f7"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  label={({viewBox}) => {
                    const x = viewBox?.x || 0;
                    const y = viewBox?.y || 0;
                    return (
                      <g>
                        <rect
                          x={x - 45}
                          y={y - 8}
                          width={90}
                          height={16}
                          fill="#1e293b"
                          stroke="#a855f7"
                          strokeWidth={1}
                          rx={3}
                        />
                        <text
                          x={x}
                          y={y + 4}
                          fill="#a855f7"
                          fontSize={11}
                          textAnchor="middle"
                        >
                          切换主可用区
                        </text>
                      </g>
                    );
                  }}
                />
              ))}

              {/* 扩缩容关键事件的垂直线标记 */}
              {visibleScalingEventMarkers.map((marker, idx) => (
                <ReferenceLine
                  key={`scale-${idx}`}
                  x={marker.time}
                  stroke={marker.color}
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  label={({viewBox}) => {
                    const x = viewBox?.x || 0;
                    const y = viewBox?.y || 0;
                    const width = marker.label.length * 7 + 10;
                    return (
                      <g>
                        <rect
                          x={x - width / 2}
                          y={y - 8}
                          width={width}
                          height={16}
                          fill="#1e293b"
                          stroke={marker.color}
                          strokeWidth={1}
                          rx={3}
                        />
                        <text
                          x={x}
                          y={y + 4}
                          fill={marker.color}
                          fontSize={11}
                          textAnchor="middle"
                        >
                          {marker.label}
                        </text>
                      </g>
                    );
                  }}
                />
              ))}

              <Line 
                type="monotone" 
                dataKey="QPS" 
                stroke="#3b82f6" 
                strokeWidth={2.5}
                dot={false}
                name="QPS"
                isAnimationActive={false}
              />
              <Line 
                type="monotone" 
                dataKey="TPS" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={false}
                name="TPS"
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Phase indicators - 确保和图表时间轴对齐 */}
        <div className={`rounded-lg p-2 mt-2 ${theme === 'dark' ? 'bg-slate-800/30' : 'bg-gray-100'}`}>
          {/* Scenario phases */}
          <div className="mb-2">
            <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>业务阶段</div>
            {/* 精确匹配图表的绘图区域 */}
            <div className="relative h-5" style={{ marginLeft: '41px', marginRight: '36px' }}>
              {visibleScenarioAreas.length > 0 ? (
                visibleScenarioAreas.map((area, idx) => {
                  const totalDuration = chartData[chartData.length - 1]?.time - chartData[0]?.time || 1;
                  const areaDuration = area.end - area.start;
                  const startPercent = ((area.start - chartData[0]?.time) / totalDuration) * 100;
                  let widthPercent = (areaDuration / totalDuration) * 100;
                  
                  // 如果是当前正在进行的阶段，确保它至少占据到图表的最右边
                  if (area.isCurrentPhase) {
                    const endPercent = 100;
                    widthPercent = endPercent - startPercent;
                  }
                  
                  // 计算实际像素宽度（假设容器宽度，用于判断是否显示文字）
                  const containerWidth = 800; // 估算值
                  const actualWidth = (widthPercent / 100) * containerWidth;
                  const showText = actualWidth >= 50; // 宽度小于 50px 时不显示文字
                  
                  return (
                    <div
                      key={idx}
                      className="absolute flex items-center justify-center text-white text-xs rounded"
                      style={{
                        left: `${startPercent}%`,
                        width: `${widthPercent}%`,
                        backgroundColor: area.color,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      }}
                    >
                      {showText && <span className="px-2">{area.phase}</span>}
                    </div>
                  );
                })
              ) : (
                <div className="h-full bg-slate-700/30 rounded" />
              )}
            </div>
          </div>

          {/* Scaling phases - 暂时注释掉 */}
          {/* 
          <div>
            <div className="text-xs text-slate-400 mb-1">扩缩容阶段</div>
            {/* 使用相同的 margin 确保和图表对齐 * /}
            <div className="relative h-5" style={{ marginLeft: '41px', marginRight: '36px' }}>
              {visiblePhaseAreas.length > 0 ? (
                visiblePhaseAreas.map((area, idx) => {
                  const totalDuration = chartData[chartData.length - 1]?.time - chartData[0]?.time || 1;
                  const areaDuration = area.end - area.start;
                  const startPercent = ((area.start - chartData[0]?.time) / totalDuration) * 100;
                  const widthPercent = (areaDuration / totalDuration) * 100;
                  
                  // 计算实际像素宽度
                  const containerWidth = 800;
                  const actualWidth = (widthPercent / 100) * containerWidth;
                  const showText = actualWidth >= 80;
                  
                  return (
                    <div
                      key={idx}
                      className="absolute flex items-center justify-center text-white text-xs rounded"
                      style={{
                        left: `${startPercent}%`,
                        width: `${widthPercent}%`,
                        backgroundColor: area.color,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      }}
                    >
                      {showText && <span className="px-2">{area.phase}</span>}
                    </div>
                  );
                })
              ) : (
                <div className="h-full bg-slate-700/30 rounded" />
              )}
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}