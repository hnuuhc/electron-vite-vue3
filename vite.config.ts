import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import vue from '@vitejs/plugin-vue'

import Pages from 'vite-plugin-pages'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers"
import {obfuscator} from 'rollup-obfuscator'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: process.env.NODE_ENV === 'test'
        // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
        ? undefined
        : {},
    }),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'icon',
        }),
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],

      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    Icons({
      autoInstall: true,
      compiler: "vue3"
    }),
    Pages({
      dirs: [{dir: 'src/pages', baseRoute: '/'}],  // 需要生成路由的文件的目录
      importMode: 'async',
      extensions: ['vue'],
      exclude: [], // 排除在外的目录，将所有 components 目录下的 .vue 文件排除
    }),
    obfuscator(
        {
          compact: true, // 在一行上紧凑的代码输出1
          controlFlowFlattening: true, // 启用代码控制流扁平化。控制流扁平化是源代码的结构转换，阻碍了程序的理解
          controlFlowFlatteningThreshold: 1,  //  转换将应用于任何给定节点的概率,此设置对于较大的代码大小特别有用，因为大量控制流转换可能会减慢代码速度并增加代码大小
          deadCodeInjectionThreshold: 1, // 允许设置受deadCodeInjection影响的节点的百分比
          // deadCodeInjection: true, // 随机死代码块将被添加到混淆代码中

          debugProtection: true, // 此选项使得几乎不可能使用开发人员工具的功能
          debugProtectionInterval: 1000, // 以毫秒为单位的间隔在“控制台”选项卡上强制使用调试模式，从而更难使用开发人员工具的其他功能
          // disableConsoleOutput: true, // 禁用console的使用，并将它们替换为空函数。这使得调试器的使用更加困难

          domainLock: ["www.muxicat.com"], // 只允许在特定域和/或子域上运行经过模糊处理的源代码。这使得某人很难复制和粘贴您的源代码并在其他地方运行它
          domainLockRedirectUrl: 'about:blank', // 如果源代码未在 domainLock 指定的域上运行，则允许将浏览器重定向到传递的 URL
          forceTransformStrings: [], // 启用字符串文本的强制转换，这些文本与传递的 RegExp 模式匹配

          identifierNamesCache: null, // 此选项的主要目标是能够在对多个源/文件进行模糊处理期间使用相同的标识符名称
          identifierNamesGenerator: 'hexadecimal', // 设置标识符名称生成器
          identifiersDictionary: [], // 设置 identifierNamesGenerator： 选项的标识符字典。字典中的每个标识符都将在几个变体中使用，每个字符的大小写不同。因此，字典中的标识符数量应取决于原始源代码中的标识符数量
          identifiersPrefix: '', // 设置所有全局标识符的前缀
          ignoreImports: false, // 防止混淆导入。在某些情况下，当运行时环境出于某种原因仅需要静态字符串的导入时，可能会有所帮助
          inputFileName: '', // 允许使用源代码设置输入文件的名称。此名称将在内部用于生成源映射
          log: false, // 允许将信息记录到控制台

          numbersToExpressions: true, // 支持将数字转换为表达式
          optionsPreset: 'default', // 允许设置选项预设
          renameGlobals: true, // 使用声明对全局变量和函数名称进行模糊处理
          renameProperties: false, // 启用属性名称的重命名。所有内置的 DOM 属性和核心 JavaScript 类中的属性都将被忽略
          renamePropertiesMode: 'safe', // 发布后的默认行为。尝试以更安全的方式重命名属性，以防止运行时错误。使用此模式时，某些属性将从重命名中排除
          reservedNames: [], // 禁用模糊处理和标识符的生成，这些标识符由传递的 RegExp 模式匹配。
          reservedStrings: [], // 用字符串文本的转换，这些文本与传递的 RegExp 模式匹配。

          selfDefending: true, // 此选项使输出代码能够灵活地防止格式化和变量重命名。如果尝试在混淆的代码上使用 JavaScript 美化器，则代码将不再起作用，从而更难理解和修改它
          simplify: true, // 通过简化启用其他代码模糊处理。

          // sourceMap: false, // 为模糊处理的代码启用源映射生成。
          // sourceMapBaseUrl: '', // 当 sourceMapMode： 'separate' 时，将基 url 设置为源映射导入 url。
          // sourceMapFileName: 'muxicat', // 在 时设置输出源映射的文件名。sourceMapMode: 'separate'
          // sourceMapMode: 'separate', // 指定源映射生成模式
          // sourceMapSourcesMode: 'sources-content', // 允许控制源映射的字段：sourcessourcesContent

          splitStrings: false, // 将文本字符串拆分为长度为 splitStringsChunkLength 选项值的块。
          splitStringsChunkLength: 10, // 设置 splitStrings 选项的块长度。

          // stringArray: true, // 删除字符串文本并将它们放在一个特殊的数组中。例如，in 中的字符串将被替换为类似"Hello World"var m = "Hello World";var m = _0x12c456[0x1];
          stringArrayCallsTransform: true, // 启用对 stringArray 的调用的转换。这些调用的所有参数都可以提取到不同的对象，具体取决于 stringArrayCallsTransformThreshold 值。 因此，它使得自动查找对字符串数组的调用变得更加困难。
          // stringArrayCallsTransformThreshold: 1, // 您可以使用此设置来调整转换对字符串数组的调用的概率（从 0 到 1）。
          stringArrayEncoding: [], // 使用 or 对 stringArray 的所有字符串文字进行编码，并插入用于在运行时对其进行解码的特殊代码
          stringArrayIndexesType: [ // 允许控制字符串数组调用索引的类型。
            'hexadecimal-number'
          ],
          stringArrayIndexShift: true, // 为所有字符串数组调用启用额外的索引偏移
          stringArrayRotate: true, // 将数组移位固定且随机（在代码混淆处生成）位置。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。
          stringArrayShuffle: true, // 随机随机排列数组项
          stringArrayWrappersCount: 1, // 设置每个根或函数作用域内部的包装器计数。 每个作用域内包装器的实际计数受此作用域内节点计数的限制。
          stringArrayWrappersChainedCalls: true, // 启用包装器之间的链式调用。
          stringArrayWrappersParametersMaxCount: 2, // 允许控制字符串数组包装器参数的最大数量。
          stringArrayWrappersType: 'function', // 允许选择附加选项的包装器类型
          stringArrayThreshold: 1, // 此设置对于较大的代码大小特别有用，因为它会重复调用 并可能减慢代码速度。

          target: 'browser', // 允许为混淆代码设置目标环境。
          transformObjectKeys: true, // 启用对象键的转换。
          unicodeEscapeSequence: true // 允许启用/禁用字符串到 Unicode 转义序列的转换。
          // ... [See more](https://github.com/javascript-obfuscator/javascript-obfuscator)
        }
    )
  ],
})
