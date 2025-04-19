<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-button
        type="success"
        size="mini"
        @click="openDialog()"
      >
        {{ $t('table.add') }}
      </el-button>
      <el-button
        type="primary"
        size="mini"
        :loading="listLoading"
        @click="fetchData()"
      >
        {{ $t('table.refresh') }}
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      size="mini"
      :row-key="rowKey"
      :expand-row-keys="expandKeys"
      highlight-current-row
    >
      <el-table-column
        :label="$t('trade.name')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.technology')"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="openTechnologyDialog(scope.row)"
          > {{ $t('trade.technology') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.strategy')"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="openStrategyDialog(scope.row)"
          > {{ $t('trade.strategy') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="80"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            type="danger"
            size="mini"
            @click="del(row)"
          >{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 coin -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="info"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('trade.name')" prop="name">
          <el-input v-model="info.name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" :loading="dialogLoading" @click="addData(info)">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 技术指标 -->
    <el-dialog :title="dialogTechnologyTitle" :visible.sync="dialogTechnologyVisible">
      <el-tabs value="ma">
        <el-tab-pane label="ma" name="ma">
          <div>
            <el-button type="primary" @click="addMa">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :data="technology.ma"
            border
            fit
            size="mini"
            highlight-current-row
            style="margin-top: 10px"
          >
            <el-table-column
              :label="$t('technology.name')"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="small">
                  <el-option v-for="item in klineInterval" :key="item" :label="item" :value="item" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.period')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.period"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.enable')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enable"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('table.actions')"
              align="center"
              width="100"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="delMa(scope)"
                >{{ $t('table.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="ema" name="ema">
          <div>
            <el-button type="primary" @click="addEma">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :data="technology.ema"
            border
            fit
            size="mini"
            highlight-current-row
            style="margin-top: 10px"
          >
            <el-table-column
              :label="$t('technology.name')"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="small">
                  <el-option v-for="item in klineInterval" :key="item" :label="item" :value="item" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.period')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.period"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.enable')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enable"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('table.actions')"
              align="center"
              width="100"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="delEma(scope)"
                >{{ $t('table.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="rsi" name="rsi">
          <div>
            <el-button type="primary" @click="addRsi">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :data="technology.rsi"
            border
            fit
            size="mini"
            highlight-current-row
            style="margin-top: 10px"
          >
            <el-table-column
              :label="$t('technology.name')"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="small">
                  <el-option v-for="item in klineInterval" :key="item" :label="item" :value="item" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.period')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.period"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.enable')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enable"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('table.actions')"
              align="center"
              width="100"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="delRsi(scope)"
                >{{ $t('table.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="kc" name="kc">
          <div>
            <el-button type="primary" @click="addKc">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :data="technology.kc"
            border
            fit
            size="mini"
            highlight-current-row
            style="margin-top: 10px"
          >
            <el-table-column
              :label="$t('technology.name')"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="small">
                  <el-option v-for="item in klineInterval" :key="item" :label="item" :value="item" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.period')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.period"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.multiplier')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.multiplier"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.enable')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enable"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('table.actions')"
              align="center"
              width="100"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="delKc(scope)"
                >{{ $t('table.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="boll" name="boll">
          <div>
            <el-button type="primary" @click="addBoll">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :data="technology.boll"
            border
            fit
            size="mini"
            highlight-current-row
            style="margin-top: 10px"
          >
            <el-table-column
              :label="$t('technology.name')"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="small">
                  <el-option v-for="item in klineInterval" :key="item" :label="item" :value="item" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.period')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.period"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.std_dev_multiplier')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.std_dev_multiplier"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.enable')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enable"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('table.actions')"
              align="center"
              width="100"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="delBoll(scope)"
                >{{ $t('table.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="atr" name="atr">
          <div>
            <el-button type="primary" @click="addAtr">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :data="technology.atr"
            border
            fit
            size="mini"
            highlight-current-row
            style="margin-top: 10px"
          >
            <el-table-column
              :label="$t('technology.name')"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="small">
                  <el-option v-for="item in klineInterval" :key="item" :label="item" :value="item" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.period')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.period"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.enable')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enable"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('table.actions')"
              align="center"
              width="100"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="delAtr(scope)"
                >{{ $t('table.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTechnologyVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" :loading="dialogLoading" @click="confirmTechnology()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 策略方法 -->
    <el-dialog :title="dialogStrategyTitle" :visible.sync="dialogStrategyVisible" width="75%">
      <div>
        <el-button type="primary" @click="addStrategy">{{ $t('table.add') }}</el-button>
      </div>
      <el-table
        :data="strategy"
        border
        fit
        size="mini"
        highlight-current-row
        style="margin-top: 10px"
      >
        <el-table-column
          :label="$t('strategy.name')"
          align="center"
          width="300"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.name"
              class="edit-input"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('strategy.code')"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.code"
              type="textarea"
              :rows="6"
              size="small"
              class="edit-input"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('strategy.fullScreen')"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.fullScreen"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              @change="fullCodeScreenChange(scope.row, scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('strategy.type')"
          align="center"
          width="140"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.type" size="small">
              <el-option :label="$t('trade.long')" value="long" />
              <el-option :label="$t('trade.short')" value="short" />
              <el-option :label="$t('trade.close_long')" value="close_long" />
              <el-option :label="$t('trade.close_short')" value="close_short" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('strategy.enable')"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.actions')"
          align="center"
          width="100"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              @click="delStrategy(scope)"
            >{{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogStrategyVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" :loading="dialogLoading" @click="confirmStrategy()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- coding -->
    <el-dialog :title="dialogCodeTitle" :visible.sync="dialogCodeVisible" fullscreen @closed="codeScreenClose">
      <div class="code-full" style="width: 100%;">
        <div style="margin-bottom: 10px; display: flex;justify-content: space-between;align-items: center;">
          <div
            style="display: flex;flex-flow: row wrap;gap: 10px; width:75%"
          >
            <el-link href="https://expr-lang.org/docs/language-definition" type="success" target="_blank">code rule</el-link>
          </div>
          <el-button
            type="primary"
            @click="testStrategyRule"
          >{{ $t('table.test') }}
          </el-button>
        </div>
        <codemirror
          ref="cmEditor"
          :value="code"
          :options="cmOptions"
          @ready="onCmReady"
          @focus="onCmFocus"
          @input="onCmCodeChange"
        />
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.code-full .CodeMirror.cm-s-monokai.CodeMirror-wrap {
  min-height: 600px;
}
// 补全弹层
.CodeMirror-hints {
  z-index: 9999;
}
</style>

<script>
import { getList, editData, addData, delData, testStrategyRule } from '@/api/strategy_template'
import { round } from 'mathjs'
import { parseTime } from '@/utils'

import CodeMirror from 'codemirror'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js' // 支持JavaScript语言
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
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/anyword-hint.js'

// // 全屏功能 由于项目复杂，自带的全屏功能一般不好使
// import 'codemirror/addon/display/fullscreen.css'
// import 'codemirror/addon/display/fullscreen'

const initTechnology = {
  ma: [],
  ema: [],
  rsi: [],
  kc: [],
  boll: [],
  atr: [],
}

export default {
  components: {
    codemirror,
  },
  data() {
    return {
      klineInterval: [
        '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M',
      ],

      list: [],
      listLoading: false,
      dialogFormVisible: false,
      dialogLoading: false,
      dialogTitle: 'add template',
      info: {},
      rowKey(row) {
        return row.id
      },
      expandKeys: [],

      dialogTechnologyTitle: '',
      dialogTechnologyVisible: false,
      technologySymbolId: 0,
      technology: JSON.parse(JSON.stringify(initTechnology)),

      dialogStrategyTitle: '',
      dialogStrategyVisible: false,
      strategySymbolId: 0,
      strategy: [],

      code: '',
      cmOptions: {
        tabSize: 2,
        mode: 'text/x-go',
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
          'CodeMirror-lint-markers',
        ],
        extraKeys: { 'Tab': 'autocomplete' },
        hintOptions: {
          completeSingle: false, // 当只有一个补全项时，不自动补全
          hint: this.customHint,
        },
      },
      dialogCodeTitle: '',
      dialogCodeVisible: false,
      strategyIndex: undefined,
    }
  },
  async created() {
    await this.fetchData()
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
        to: CodeMirror.Pos(cur.line, end),
      }

      return hintObj
    },
    getHints(word) {
      const keywords = [
        'type', 'float', 'int', 'string', // type
        'let', 'trim', 'upper', 'lower', 'split', 'replace', 'repeat', 'indexOf', 'hasPrefix', 'now()',
        'max', 'min', 'abs', 'ceil', 'floor', 'round', // number
        'all', 'any', 'one', 'none', 'map', 'filter', 'find', 'findIndex', 'findLast', 'groupBy', 'count', 'concat', 'join', 'reduce', 'sum', 'mean', 'median', 'first', 'last', 'take', 'reverse', 'sort', 'sortBy', // array
        'keys', 'values', 'len', // object
        'Kdj', 'IsDesc', 'IsAsc', // custom function
        'SystemStartTime', 'NowPrice', 'NowTime', 'NowSymbolPercentChange', 'NowSymbolClose', 'NowSymbolOpen', 'NowSymbolLow', 'NowSymbolHigh', 'BasicTrend',
        'ROI', 'Position', 'Position.EntryPrice', 'Position.MarkPrice', 'Position.Amount', 'Position.UnrealizedProfit', 'Position.Leverage', 'Position.Side', 'Position.Mock', 'Position.CreateTime', 'Position.SourceType', // position
      ]
      if (this.strategySymbolId !== undefined) {
        const find = this.list.find(item => item.id === this.strategySymbolId)
        if (find) {
          let technology = {}
          try {
            technology = JSON.parse(find.technology)
          } catch (e) {
            technology = {}
          }
          const klineIntervalMap = new Set()
          Object.keys(technology).forEach(key => {
            technology[key].forEach(item => {
              if (item.enable) {
                keywords.push(item.name)
                if (item.kline_interval) {
                  klineIntervalMap.add(item.kline_interval)
                }
                switch (key) {
                  case 'ma':
                  case 'ema':
                  case 'rsi':
                  case 'atr':
                    keywords.push(`${item.name}.KlineInterval`)
                    keywords.push(`${item.name}.Period`)
                    keywords.push(`${item.name}.Data`)
                    keywords.push(`${item.name}.Data[]`)
                    break
                  case 'kc':
                    keywords.push(`${item.name}.KlineInterval`)
                    keywords.push(`${item.name}.Period`)
                    keywords.push(`${item.name}.Multiplier`)
                    keywords.push(`${item.name}.High`)
                    keywords.push(`${item.name}.High[]`)
                    keywords.push(`${item.name}.Low`)
                    keywords.push(`${item.name}.Low[]`)
                    keywords.push(`${item.name}.Mid`)
                    keywords.push(`${item.name}.Mid[]`)
                    break
                  case 'boll':
                    keywords.push(`${item.name}.KlineInterval`)
                    keywords.push(`${item.name}.Period`)
                    keywords.push(`${item.name}.StdDevMultiplier`)
                    keywords.push(`${item.name}.High`)
                    keywords.push(`${item.name}.High[]`)
                    keywords.push(`${item.name}.Low`)
                    keywords.push(`${item.name}.Low[]`)
                    keywords.push(`${item.name}.Mid`)
                    keywords.push(`${item.name}.Mid[]`)
                    break
                }
              }
            })
          })
          klineIntervalMap.forEach(item => {
            keywords.push(`kline_${item}`)
            keywords.push(`kline_${item}.High`)
            keywords.push(`kline_${item}.High[]`)
            keywords.push(`kline_${item}.Low`)
            keywords.push(`kline_${item}.Low[]`)
            keywords.push(`kline_${item}.Close`)
            keywords.push(`kline_${item}.Close[]`)
            keywords.push(`kline_${item}.Open`)
            keywords.push(`kline_${item}.Open[]`)
            keywords.push(`kline_${item}.Amount`)
            keywords.push(`kline_${item}.Amount[]`)
            keywords.push(`kline_${item}.Qps`)
            keywords.push(`kline_${item}.Qps[]`)
          })
        }
      }

      for (const keyword of ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT']) {
        keywords.push(`${keyword}.PercentChange`)
        keywords.push(`${keyword}.Close`)
        keywords.push(`${keyword}.Open`)
        keywords.push(`${keyword}.Low`)
        keywords.push(`${keyword}.High`)
      }

      const suggestions = []

      for (const keyword of keywords) {
        if (keyword.startsWith(word)) {
          suggestions.push(keyword)
        }
      }

      return suggestions
    },
    fullCodeScreenChange(row, index) {
      if (row.fullScreen) {
        this.dialogCodeTitle = `${row.name} code`
        this.code = row.code
        this.strategyIndex = index
        this.dialogCodeVisible = true
      } else {
        this.code = ''
        this.strategyIndex = undefined
        this.dialogCodeVisible = false
      }
    },
    codeScreenClose() {
      if (this.strategyIndex !== undefined) {
        this.strategy[this.strategyIndex].fullScreen = false
        this.strategy = [...this.strategy]
        this.code = ''
        this.strategyIndex = undefined
        this.dialogCodeVisible = false
      }
    },
    async testStrategyRule() {
      try {
        if (this.strategySymbolId !== undefined) {
          const strategy = JSON.stringify([
            {
              name: 'test_strategy',
              type: 'long',
              code: this.code,
              fullScreen: false,
              enable: true,
            },
          ])
          const find = this.list.find(item => item.id === this.strategySymbolId)
          const technology = find.technology
          const res = await testStrategyRule('BTCUSDT', { strategy, technology })
          if (res.code === 200) {
            this.$message({ message: `result: ${res?.data?.pass}`, type: 'success' })
          }
        } else {
          this.$message({ message: this.$t('table.actionFail'), type: 'error' })
        }
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'error' })
      }
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
      if (this.strategyIndex !== undefined) {
        this.strategy[this.strategyIndex].code = newCode
        this.strategy = [...this.strategy]
      }
    },
    parseTime,
    async fetchData() {
      // this.listLoading = true
      const { data } = await getList()
      this.list = data
      // this.listLoading = false
    },
    del(row) {
      this.$confirm(this.$t('table.deleteConfirm') + ` ${row.name} ？`)
        .then(async() => {
          try {
            await delData(row.id)
            this.$message({ message: this.$t('table.deleteSuccess'), type: 'success' })
            await this.fetchData()
          } catch (e) {
            this.$message({ message: this.$t('table.deleteFail'), type: 'success' })
          }
        })
        .catch(() => {})
    },
    openDialog() {
      this.dialogTitle = this.$t('table.add')
      this.dialogFormVisible = true
    },
    async openTechnologyDialog(row) {
      this.technologySymbolId = row.id
      if (row.technology) {
        try {
          this.technology = {
            ...JSON.parse(JSON.stringify(initTechnology)),
            ...JSON.parse(row.technology),
          }
        } catch (e) {
          this.technology = JSON.parse(JSON.stringify(initTechnology))
        }
      } else {
        this.technology = JSON.parse(JSON.stringify(initTechnology))
      }
      this.dialogTechnologyTitle = `${row.name} ${this.$t('trade.technology')}`
      this.dialogTechnologyVisible = true
    },
    async openStrategyDialog(row) {
      this.strategySymbolId = row.id
      if (row.strategy) {
        try {
          this.strategy = JSON.parse(row.strategy)
        } catch (e) {
          this.strategy = []
        }
      } else {
        this.strategy = []
      }
      this.dialogStrategyTitle = `${row.name} ${this.$t('trade.strategy')}`
      this.dialogStrategyVisible = true
    },
    async addData(row) {
      const data = {
        ...row,
      }
      await addData(data)
      await this.fetchData()
      this.dialogFormVisible = false
    },
    roundOrderPrice(price, symbol = null) {
      const whiteSymbols = {
        'MKRUSDT': 1,
        'CRVUSDT': 3,
        'XTZUSDT': 3,
      }
      if (whiteSymbols[symbol]) {
        return round(price, whiteSymbols[symbol])
      }
      if (price > 500) {
        return round(price, 1)
      } else if (price > 10) {
        return round(price, 2)
      } else if (price > 1) {
        return round(price, 3)
      } else if (price > 0.1) {
        return round(price, 4)
      } else if (price > 0.01) {
        return round(price, 5)
      } else {
        return round(price, 6)
      }
    },
    async confirmTechnology() {
      try {
        Object.keys(this.technology).forEach(key => {
          this.technology[key].forEach(item => {
            if (item.period) {
              item.period = Number(item.period)
            }
            if (item.multiplier) {
              item.multiplier = Number(item.multiplier)
            }
            if (item.std_dev_multiplier) {
              item.std_dev_multiplier = Number(item.std_dev_multiplier)
            }
          })
        })
        await editData(this.technologySymbolId, { technology: JSON.stringify(this.technology) })
        this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
        await this.fetchData()
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'success' })
      }
      // this.dialogTechnologyVisible = false
    },
    async confirmStrategy() {
      try {
        await editData(this.strategySymbolId, { strategy: JSON.stringify(this.strategy) })
        this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
        await this.fetchData()
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'success' })
      }
      // this.dialogStrategyVisible = false
    },
    addMa() {
      this.technology.ma = [
        ...this.technology.ma,
        {
          name: '',
          kline_interval: '',
          period: 14,
          enable: false,
        },
      ]
    },
    delMa(scope) {
      this.technology.ma = this.technology.ma.filter((item, index) => index !== scope.$index)
    },
    addEma() {
      this.technology.ema = [
        ...this.technology.ema,
        {
          name: '',
          kline_interval: '',
          period: 14,
          enable: false,
        },
      ]
    },
    delEma(scope) {
      this.technology.ema = this.technology.ema.filter((item, index) => index !== scope.$index)
    },
    addRsi() {
      this.technology.rsi = [
        ...this.technology.rsi,
        {
          name: '',
          kline_interval: '',
          period: 14,
          enable: false,
        },
      ]
    },
    delRsi(scope) {
      this.technology.rsi = this.technology.rsi.filter((item, index) => index !== scope.$index)
    },
    addKc() {
      this.technology.kc = [
        ...this.technology.kc,
        {
          name: '',
          kline_interval: '',
          period: 50,
          multiplier: 2.75,
          enable: false,
        },
      ]
    },
    delKc(scope) {
      this.technology.kc = this.technology.kc.filter((item, index) => index !== scope.$index)
    },
    addBoll() {
      this.technology.boll = [
        ...this.technology.boll,
        {
          name: '',
          kline_interval: '',
          period: 21,
          std_dev_multiplier: 2,
          enable: false,
        },
      ]
    },
    delBoll(scope) {
      this.technology.boll = this.technology.boll.filter((item, index) => index !== scope.$index)
    },
    addAtr() {
      this.technology.atr = [
        ...this.technology.atr,
        {
          name: '',
          kline_interval: '',
          period: 14,
          enable: false,
        },
      ]
    },
    delAtr(scope) {
      this.technology.atr = this.technology.atr.filter((item, index) => index !== scope.$index)
    },

    addStrategy() {
      this.strategy = [
        ...this.strategy,
        {
          name: '',
          type: '',
          code: '',
          fullScreen: false,
          enable: false,
        },
      ]
    },
    delStrategy(scope) {
      this.strategy = this.strategy.filter((item, index) => index !== scope.$index)
    },
  },
}
</script>
