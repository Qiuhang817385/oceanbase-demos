# React-i18next 全文案国际化提取总结

## 已完成的提取工作

### 1. 基础配置

- ✅ 安装了 react-i18next 相关依赖
- ✅ 创建了客户端和服务端 i18n 配置
- ✅ 设置了路由中间件支持多语言 URL
- ✅ 创建了语言切换组件

### 2. 翻译资源文件

- ✅ 创建了统一的中英文翻译文件
- ✅ 按功能模块组织了翻译键值对
- ✅ 包含了所有主要页面的文案

### 3. 页面组件国际化

- ✅ 首页 (`app/[locale]/page.tsx`)
- ✅ 共享存储页面 (`app/[locale]/shared-storage/page.tsx`)
- ✅ 物化视图页面 (`app/[locale]/materialized-view/page.tsx`)
- ✅ 布局组件 (`app/[locale]/layout.tsx`)

### 4. 物化视图组件提取示例

已完成以下文案的国际化提取：

#### 数据量选项

```tsx
// 替换前
const DATA_LIST = [
  { label: '十万', value: 'hundredThousand' },
  { label: '百万', value: 'million' },
  // ...
]

// 替换后
const DATA_LIST = [
  {
    label: t('materializedView.dataVolume.hundredThousand'),
    value: 'hundredThousand',
  },
  { label: t('materializedView.dataVolume.million'), value: 'million' },
  // ...
]
```

#### 标题文案

```tsx
// 替换前
title="MV 数据量"
title="分析结果"
title="SQL 内容"

// 替换后
title={t('materializedView.dataVolume.title')}
title={t('materializedView.analysis.title')}
title={t('materializedView.sql.title')}
```

#### 条件判断

```tsx
// 替换前
if (type === '查物化视图') {
  return '#057cf2'
}

// 替换后
if (type === t('materializedView.analysis.queryMV')) {
  return '#057cf2'
}
```

#### 标签页文案

```tsx
// 替换前
tab: '两表连接（MKV）'
tab: '单表聚合 (MAV)'
tab: '连接加聚合'

// 替换后
tab: t('materializedView.tabs.join')
tab: t('materializedView.tabs.aggregation')
tab: t('materializedView.tabs.joinAggregation')
```

## 剩余需要提取的组件

### 1. 共享存储组件

- `app/shared-storage/component/Main/index.tsx`
- `app/shared-storage/component/Overview/index.tsx`
- `app/shared-storage/component/DescribeContainer/index.tsx`
- `app/shared-storage/component/Charts/ResultChart.tsx`

### 2. 其他组件

- `app/shared-storage/component/Cloud/index.tsx`
- `app/shared-storage/component/Storage/index.tsx`
- `app/shared-storage/component/UpBlock/index.tsx`
- `app/shared-storage/component/DownBlock/index.tsx`

## 提取方法和步骤

### 1. 识别硬编码文案

```bash
# 查找所有中文文案
grep -r "[\u4e00-\u9fff]" app/ --include="*.tsx" --include="*.ts"

# 查找特定模式的文案
grep -r 'title=|label=|placeholder=' app/ --include="*.tsx"
```

### 2. 组件改造步骤

1. 导入 `useTranslation` 和客户端初始化
2. 在组件内使用 `const { t } = useTranslation('translation')`
3. 替换硬编码文案为 `t('key')` 调用
4. 在翻译文件中添加对应的键值对

### 3. 翻译键命名规范

- 使用点分隔的层级结构
- 按功能模块分组
- 使用描述性的键名
- 保持一致的命名风格

### 4. 常见提取模式

```tsx
// 简单文案
"硬编码文案" → t('module.key')

// 条件渲染
{condition ? '文案1' : '文案2'} → {t(condition ? 'module.key1' : 'module.key2')}

// 数组对象
const options = [{ label: '文案', value: 'value' }] →
const options = [{ label: t('module.key'), value: 'value' }]

// 带参数的文案
`欢迎 ${name}` → t('module.welcome', { name })
```

## 测试和验证

### 1. 功能测试

- 测试语言切换功能
- 验证所有页面文案正确显示
- 检查布局和样式是否正常

### 2. 构建测试

```bash
npm run build
npm run dev
```

### 3. 缺失翻译检查

在开发模式下，未找到的翻译键会显示键名本身，便于发现遗漏的翻译。

## 最佳实践

1. **渐进式提取**：一次处理一个组件，避免大规模修改
2. **保持功能完整**：确保提取过程中不破坏现有功能
3. **测试驱动**：每次提取后立即测试功能
4. **文档同步**：及时更新翻译文件和文档
5. **团队协作**：确保所有开发者了解国际化规范

## 下一步计划

1. 继续提取共享存储相关组件的文案
2. 完善翻译资源文件
3. 添加更多语言的翻译支持
4. 优化性能和用户体验
5. 建立国际化测试流程
