<template>
    <div class="monaco-container">
        <div ref="container" class="monaco-editor"></div>
    </div>
</template>
<script>
import * as monaco from 'monaco-editor';
export default {
    props: {
        // 编辑器中呈现的内容
        codes: {
            type: String,
            default: function () {
                return '';
            }
        },
        readOnly: {
            type: Boolean,
            default: function () {
                return true;
            }
        },
        // 主要配置
        editorOptions: {
            type: Object,
            default: function () {
                return {
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false, // 只读
                    cursorStyle: 'line', // 光标样式
                    automaticLayout: false, // 自动布局
                    glyphMargin: true, // 字形边缘
                    useTabStops: false,
                    fontSize: 30, // 字体大小
                    autoIndent: false // 自动布局
                };
            }
        }
    },
    data() {
        return {
            value: ''
        };
    },

    mounted() {
        this.monacoEditor = monaco.editor.create(this.$refs.container, {
            value: this.codes, // 见props
            language: 'javascript',
            theme: 'vs-dark', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
            folding: true, // 是否折叠
            foldingHighlight: true, // 折叠等高线
            foldingStrategy: 'indentation', // 折叠方式  auto | indentation
            showFoldingControls: 'always', // 是否一直显示折叠 always | mouseover
            disableLayerHinting: true, // 等宽优化
            emptySelectionClipboard: false, // 空选择剪切板
            selectionClipboard: false, // 选择剪切板
            codeLens: false, // 代码镜头
            scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
            colorDecorators: true, // 颜色装饰器
            accessibilitySupport: 'off', // 辅助功能支持  "auto" | "off" | "on"
            lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
            lineNumbersMinChars: 5, // 行号最小字符   number
            enableSplitViewResizing: false,
            readOnly: this.readOnly,
            minimap: {
                enabled: false // 不要小地图
            }
        });
    }
};
</script>
<style lang="scss" scoped>
.monaco-editor {
    height: 300px;
    width: 100%;
    text-align: left;
}
.monaco-container {
    height: 400px;
}
</style>
