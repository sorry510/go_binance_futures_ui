<template>
  <div class="app-container">
    <div style="margin-bottom: 10px; display: flex;justify-content: space-between;align-items: center;">
      <div
        style="display: flex;flex-flow: row wrap;gap: 10px; width:75%"
      >
        <el-button
          type="success"
          size="mini"
          :loading="serviceLoading"
          @click="start()"
        >
          {{ $t('table.restartService') }}
        </el-button>
        <el-button
          type="danger"
          size="mini"
          :loading="serviceLoading"
          @click="stop()"
        >
          {{ $t('table.stopService') }}
        </el-button>
      </div>
      <el-button
        type="primary"
        @click="save"
      >{{ $t('table.save') }}
      </el-button>
    </div>
    <codemirror
      ref="cmEditor"
      style="width: 100%"
      :value="code"
      :options="cmOptions"
      @ready="onCmReady"
      @focus="onCmFocus"
      @input="onCmCodeChange"
    />
  </div>
</template>

<script>
import { getConfig, setConfig, startService, stopService } from '@/api/trade'

import CodeMirror from 'codemirror'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js' // 支持JavaScript语言
import 'codemirror/mode/ttcn-cfg/ttcn-cfg.js' // 支持cfg语言
import 'codemirror/mode/go/go.js' // 支持go语言

import 'codemirror/addon/selection/active-line' // 光标行背景高亮，配置里面也需要styleActiveLine设置为true
import 'codemirror/keymap/sublime' // sublime编辑器效果
import 'codemirror/mode/css/css'
import 'codemirror/theme/monokai.css' // 编辑器主题样式，配置里面theme需要设置monokai
import 'codemirror/theme/base16-dark.css'

// 搜索
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/match-highlighter.js'
import 'codemirror/addon/search/jump-to-line.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'

// 折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'

// 括号匹配
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'

// 自动补全
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'

export default {
  components: {
    codemirror
  },
  data() {
    return {
      serviceLoading: true,
      code: null,
      cmOptions: {
        tabSize: 2,
        mode: 'text/x-ttcn-cfg',
        theme: 'monokai',
        lineNumbers: true,
        line: true,
        foldGutter: true,
        lineWrapping: true,
        autoFormatJson: true,
        jsonIndentation: true,
        gutters: [
          'CodeMirror-linenumbers',
          'CodeMirror-foldgutter',
          'CodeMirror-lint-markers'
        ],
        extraKeys: { 'Tab': 'autocomplete' },
        hintOptions: {
          completeSingle: false, // 当只有一个补全项时，不自动补全
          hint: this.customHint
        }
      }
    }
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    customHint(cm) {
      const cur = cm.getCursor()
      const token = cm.getTokenAt(cur)
      const start = token.start
      const end = token.end
      const word = token.string

      const hints = this.getHints(word)

      const hintObj = {
        list: hints.map(hint => ({ text: hint })),
        from: CodeMirror.Pos(cur.line, start),
        to: CodeMirror.Pos(cur.line, end)
      }
      return hintObj
    },
    getHints(word) {
      const keywords = [
        'let', 'trim', 'upper', 'lower', 'split', 'replace', 'repeat', 'indexOf', 'hasPrefix', 'now()',
        'max', 'min', 'abs', 'ceil', 'floor', 'round', // number
        'all', 'any', 'one', 'none', 'map', 'filter', 'find', 'findIndex', 'findLast', 'groupBy', 'count', 'concat', 'join', 'reduce', 'sum', 'mean', 'median', 'first', 'last', 'take', 'reverse', 'sort', 'sortBy', // array
        'keys', 'values', 'len',
        'nowPrice'
      ]
      const suggestions = []

      for (const keyword of keywords) {
        if (keyword.startsWith(word)) {
          suggestions.push(keyword)
        }
      }

      return suggestions
    },
    async fetchData() {
      this.serviceLoading = true
      const { data } = await getConfig()
      this.code = data.content
      this.serviceLoading = false
    },
    onCmReady(cm) {
      // console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      // console.log('the editor is focused!', cm)
    },
    onCmCodeChange(newCode) {
      // console.log('this is new code', newCode)
      this.code = newCode
    },
    async save() {
      this.$confirm(this.$t('table.confirmSave'))
        .then(async() => {
          try {
            await setConfig({ code: this.code })
            this.$message({ message: this.$t('table.editSuccess'), type: 'success' })
          } catch (e) {
            this.$message({ message: this.$t('table.editFail'), type: 'error' })
          }
        })
        .catch(() => {})
    },
    start() {
      this.$confirm(this.$t('table.confirmRestartService'))
        .then(async() => {
          this.serviceLoading = true
          await startService()
          this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
          this.serviceLoading = false
        })
        .catch(() => {})
    },
    stop() {
      this.$confirm(this.$t('table.confirmStopService'))
        .then(async() => {
          this.serviceLoading = true
          await stopService()
          this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
          this.serviceLoading = false
        })
        .catch(() => {})
    }
  }
}
</script>

<style>
.app-container .CodeMirror {
  border: 1px solid #1890ff !important;
  height: calc(100vh - 140px) !important;
}
</style>

