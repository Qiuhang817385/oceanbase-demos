# React-i18next 国际化提取完整指南

## 1. 国际化提取流程

### 第一步：识别硬编码文案

使用以下命令查找所有中文文案：

```bash
# 查找所有中文字符
grep -r "[\u4e00-\u9fff]" app/ --include="*.tsx" --include="*.ts"

# 查找所有英文文案
grep -r '"[A-Za-z][^"]*"' app/ --include="*.tsx" --include="*.ts"
```

### 第二步：分类整理文案

将文案按功能模块分类：

- **通用文案**：按钮、标签、提示信息
- **页面特定文案**：标题、描述、内容
- **业务逻辑文案**：状态、操作、结果

### 第三步：创建翻译键值对

在 `public/locales/{language}/translation.json` 中组织文案：

```json
{
  "module": {
    "submodule": {
      "key": "翻译内容"
    }
  }
}
```

## 2. 组件国际化改造步骤

### 步骤 1：导入 i18n

```tsx
import { useTranslation } from 'react-i18next'
import '@/lib/i18n/client-init'
```

### 步骤 2：使用翻译函数

```tsx
export default function MyComponent() {
  const { t } = useTranslation('translation')

  return (
    <div>
      <h1>{t('module.title')}</h1>
      <p>{t('module.description')}</p>
    </div>
  )
}
```

### 步骤 3：处理动态内容

```tsx
// 带参数的翻译
{
  t('module.welcome', { name: userName })
}

// 复数形式
{
  t('module.items', { count: itemCount })
}
```

## 3. 常见文案提取模式

### 按钮和操作

```tsx
// 替换前
<Button>点击进入</Button>

// 替换后
<Button>{t('actions.clickToEnter')}</Button>
```

### 标题和描述

```tsx
// 替换前
<h1>物化视图演示</h1>
<p>展示 OceanBase 物化视图的强大功能</p>

// 替换后
<h1>{t('materializedView.title')}</h1>
<p>{t('materializedView.description')}</p>
```

### 条件渲染

```tsx
// 替换前
{
  isUpScene ? '扩容' : '缩容'
}

// 替换后
{
  t(
    isUpScene
      ? 'sharedStorage.operations.expand'
      : 'sharedStorage.operations.shrink'
  )
}
```

### 数组和对象

```tsx
// 替换前
const options = [
  { label: '十万', value: 'hundredThousand' },
  { label: '百万', value: 'million' },
]

// 替换后
const options = [
  {
    label: t('materializedView.dataVolume.hundredThousand'),
    value: 'hundredThousand',
  },
  { label: t('materializedView.dataVolume.million'), value: 'million' },
]
```

## 4. 批量提取工具

### 使用 VS Code 扩展

1. 安装 "i18n Ally" 扩展
2. 配置 `i18n-ally.localesPaths`
3. 使用快捷键批量替换

### 使用脚本自动化

```bash
# 创建提取脚本
node scripts/extract-i18n.js
```

## 5. 最佳实践

### 命名规范

- 使用点分隔的层级结构
- 使用描述性的键名
- 保持一致的命名风格

### 组织方式

- 按功能模块分组
- 相关文案放在同一层级
- 避免过深的嵌套

### 性能优化

- 使用命名空间分离
- 懒加载翻译资源
- 避免在渲染中重复调用 t()

## 6. 测试和验证

### 语言切换测试

1. 测试所有页面的语言切换
2. 验证文案显示正确
3. 检查布局是否正常

### 缺失翻译检查

```tsx
// 开发模式下显示缺失的键
if (process.env.NODE_ENV === 'development') {
  console.warn('Missing translation:', key)
}
```

## 7. 维护和更新

### 新增文案

1. 在翻译文件中添加新键值对
2. 在组件中使用 t() 函数
3. 更新所有语言的翻译

### 修改文案

1. 直接修改翻译文件
2. 无需修改组件代码
3. 重新构建项目

### 删除文案

1. 从翻译文件中删除
2. 从组件中移除相关代码
3. 清理未使用的键值对
